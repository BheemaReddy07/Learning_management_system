import validator from "validator";
import bcrypt, { genSalt } from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import userModel from "../models/userModel.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";

// function to create otp

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

//function to send otp

const sendOTPEmail = async (email, otp, name) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.MAIL_SENDER_MAIL_NEW,
      pass: process.env.MAIL_SENDER_EMAIL_NEW_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.MAIL_SENDER_EMAIL,
    to: email,
    subject: "Your OTP Code",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 10px; max-width: 400px;">
        <h2 style="color: #2d89ef;">Hello ${name ? name : ""},</h2>
        <p>Thank you for using our service! Here is your OTP code:</p>
        <div style="font-size: 22px; font-weight: bold; background: #f4f4f4; padding: 10px; border-radius: 5px; display: inline-block;">
          ${otp}
        </div>
        <p style="color: red;">This OTP is valid for only 3 minutes.</p>
        <p>If you did not request this, please ignore this email.</p>
        <br/>
        <p>Best regards,</p>
        <p><strong>Ongolearn Team</strong></p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("OTP email sent successfully!");
  } catch (error) {
    console.log("Error sending email:", error.message);
    throw new Error("Error sending OTP email");
  }
};
//API to register the user
const requestOTP = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing Details" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Not a valid email" });
    }
    if (!email.endsWith("@rguktong.ac.in")) {
      return res.status(400).json({ message: "Only RGUKT Ongole student emails are allowed!" });
  }

    if (password.length < 8) {
      return res.json({ success: false, message: "Enter a Strong Password" });
    }

    const user = await userModel.findOne({ email });
    if (user && user.verified) {
      return res.json({ success: false, message: "User already exists" });
    }

    const otp = generateOTP(); // Ensure function is called
    console.log(otp);
    const otpExpiration = Date.now() + 3 * 60 * 1000;

    if (user && !user.verified) {
      user.otp = otp;
      user.otpExpiration = otpExpiration;
      await user.save();
    } else {
      const userData = new userModel({
        name,
        email,
        password,
        otp,
        otpExpiration,
        verified: false,
      });

      console.log("Saving user:", userData); // Debug log
      await userData.save();
    }

  
    await sendOTPEmail(email, otp, name);
    res.json({ success: true, message: "OTP sent to email" });
  } catch (error) {
    console.log("Error in requestOTP:", error.message);
    res.json({ success: false, message: "Error sending OTP" });
  }
};

//API for the verify and register

const verifyOTPandRegister = async (req, res) => {
  const { email, otp, password, name, repassword } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "No User found" });
    }
    if (password != repassword) {
      return res.json({ success: false, message: "check the repassword" });
    }
    if (user.otp != otp || Date.now() > user.otpExpiration) {
      return res.json({ success: false, message: "Invalid or Expired OTP" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await userModel.findByIdAndUpdate(user._id, {
      name,
      password: hashedPassword,
      otp: null,
      otpExpiration: null,
      verified: true,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET,{expiresIn:"2d"});
    res.json({ success: true, token, message: `welcome ${user.name}` });
  } catch (error) {
    console.error("Error verifying OTP!!:", error);
    res.json({ success: false, message: "Error verifying OTP!!!" });
  }
};

//API for userLogin

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "No user Found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      {
        /*generateToken(res, user, `Welcome back ${user.name}`); */
      }
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET,{expiresIn:"2d"});
      res.json({ success: true, token, message: `welcome Back ${user.name}` });
    } else {
      res.json({ success: false, message: "Incorrect Password" });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
    console.log(error.message);
  }
};

const requestForgetPasswordOTP = async (req, res) => {
  const { name, email } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User Not Found" });
    }

    const otp = generateOTP();
    user.otp = otp;
    user.otpExpiration = Date.now() + 3 * 60 * 1000;
    await user.save();

    await sendOTPEmail(email, otp, name); //send the otp to the email

    res.json({ success: true, message: "otp sent successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
    console.log(error.message);
  }
};

const resetPassword = async (req, res) => {
  const { email, password, repassword, otp } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "no user found" });
    }

    if (password !== repassword) {
      return res.json({
        success: false,
        message: "password not matching with repassword",
      });
    }
    if (user.otp !== otp || Date.now() > user.otpExpiration) {
      //checks if user entered otp and  otp in the database matches or not
      console.log("Invalid or expired OTP");
      return res.json({ success: false, message: "invalid or expired OTP" });
    }

    const salt = await bcrypt.genSalt(10); //encrypting the password
    const hashedPassword = await bcrypt.hash(password, salt);
    user.password = hashedPassword;
    user.otp = null;
    user.otpExpiration = null;

    await user.save(); //saving the user

    res.json({ success: true, message: "password reset successfully!!" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }
};

const cleanupExpiredUsers = async (req, res) => {
  try {
    const now = Date.now(); // Get the current time

    // Find users who are not verified yet and whose OTP expiration time has passed
    const expiredUsers = await userModel.find({
      verified: false, // User has not been verified
      otpExpiration: { $lt: now }, // OTP expiration time has passed
    });

    if (expiredUsers.length > 0) {
      // If there are any expired users, delete them
      await userModel.deleteMany({
        verified: false, // User has not been verified
        otpExpiration: { $lt: now }, // OTP expiration time has passed
      });
      console.log(`${expiredUsers.length} expired users cleaned up.`);
    }
  } catch (error) {
    console.error("Error cleaning up expired users:", error);
  }
};

const HOUR = 1 * 60 * 1000; // 1 hour in milliseconds
setInterval(cleanupExpiredUsers, HOUR);

const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.body;

    const userData = await userModel
      .findById(userId)
      .select(["-password", "-otp", "-otpExpiration", "-verified"]).populate("enrolledCourses") ;
    res.json({ success: true, userData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const { userId, name ,phone,branch } = req.body;
    
    if (!userId) {
      return res.json({ success: false, message: "User ID is required" });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "No user found" });
    }

    let photoUrl = user.photoUrl; // Keep the old photo if no new one is uploaded
    if (req.file) {
      if (user.photoUrl) {
        const publicId = user.photoUrl.split("/").pop().split(".")[0];
        deleteMediaFromCloudinary(publicId);
      }
      const cloudResponse = await uploadMedia(req.file.path);
      photoUrl = cloudResponse.secure_url; // Fix: Directly use cloudResponse
    }

    const updatedData = { name, photoUrl ,phone,branch};

    const updatedUser = await userModel.findByIdAndUpdate(userId, updatedData, { new: true })
      .select(["-password", "-otp", "-otpExpiration", "-verified"]);

    return res.json({ success: true, user: updatedUser, message: "Profile Updated Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  requestOTP,
  verifyOTPandRegister,
  requestForgetPasswordOTP,
  resetPassword,
  loginUser,
  getUserProfile,
  updateUserProfile,
};
