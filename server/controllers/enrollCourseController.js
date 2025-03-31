import courseModel from "../models/courseModel.js";
import EnrollCourseModel from "../models/enrollCourseModel.js";
import userModel from "../models/userModel.js";
import nodemailer from 'nodemailer'

 

const sendEnrollSuccessMail = async (email, userName, courseTitle, instructorName, courseLink) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.MAIL_SENDER_MAIL_NEW,
      pass: process.env.MAIL_SENDER_EMAIL_NEW_PASSWORD,
    },
  });

  const emailTemplate = `
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Course Enrollment Confirmation</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
          }
          .container {
              max-width: 600px;
              margin: 20px auto;
              background-color: #ffffff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          }
          .header {
              text-align: center;
              padding: 10px 0;
          }
          .header h1 {
              color: #333;
          }
          .content {
              margin: 20px 0;
          }
          .btn {
              display: inline-block;
              background-color: #007bff;
              color: #ffffff;
              padding: 10px 20px;
              text-decoration: none;
              border-radius: 5px;
              font-weight: bold;
          }
          .footer {
              margin-top: 20px;
              text-align: center;
              font-size: 12px;
              color: #666;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <h1>Congratulations, <span style="color: #007bff;">${userName}</span>!</h1>
          </div>
          <div class="content">
              <p>You've successfully enrolled in the course <strong>${courseTitle}</strong>.</p>
              <p>Course Instructor: <strong>${instructorName}</strong></p>
              <p>Start learning now by clicking the button below:</p>
              <p style="text-align: center;">
                  <a href="${courseLink}" class="btn">Go to Course</a>
              </p>
              <p>If you have any questions, feel free to reach out.</p>
          </div>
          <div class="footer">
              <p>&copy; 2025 Your Ongolearn Platform. All rights reserved.</p>
          </div>
      </div>
  </body>
  </html>
`;

  const mailOptions = {
    from: process.env.MAIL_SENDER_EMAIL,
    to: email,
    subject: "Enroll Status",
    html: emailTemplate,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Enrollment email sent successfully!");
  } catch (error) {
    console.error("Error sending mail:", error);
    return { success: false, message: "Error sending enrollment email" };
  }
};




const enrollCourse = async (req, res) => {
  try {
    const { courseId, userId } = req.body;
    const course = await courseModel.findById(courseId).populate("lecturerData");

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const user = await userModel.findById(userId);
    if(!user){
      return res.status(404).json({message:"No user found"})
    }


    const isAlreadyEnrolled = await EnrollCourseModel.findOne({ courseId, userId });
    if (isAlreadyEnrolled) {
      return res.status(400).json({ success: false, message: "Already enrolled in this course" });
    }

    
    const newEnrollment = new EnrollCourseModel({
      courseId,
      userId,
      enrolledAt: Date.now(),
      status: "completed",
    });
    await newEnrollment.save();



    await courseModel.findByIdAndUpdate(
      courseId,
      { $addToSet: { enrolledStudents: userId } },
      { new: true }
    );

    await userModel.findByIdAndUpdate(userId,
    { $addToSet: { enrolledCourses: courseId } },
    { new: true }
    );
    
    const courseLink = process.env.FRONTEND_URL + `/course-progress/${courseId}`
    await sendEnrollSuccessMail(user.email,user.name,course.courseTitle,course.lecturerData.name,courseLink)
    return res.status(200).json({
      success: true,
      message: "Course enrolled successfully",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to enroll in the course" });
  }
};

const getCourseDetailsWithEnrollStatus = async (req,res) =>{
  try {
    const {courseId,userId} = req.body;
    const course = await courseModel.findById(courseId).populate({path:"lectures"});
    const enrolled = await EnrollCourseModel.findOne({userId,courseId})
    console.log(enrolled)
    if (!course) {
      return res.status(404).json({ message: "course not found!" });
    }

    return res.status(200).json({
      success:true,
      course,
      enrolled: !!enrolled, // true if enrolled, false otherwise
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch the  enrolled courses" });
 
  }
}


const getAllEnrolledCourses = async (req,res) =>{
    try {
        const {userId} = req.body
        const enrolledCourses = await EnrollCourseModel.find({userId}).populate('courseId')
        if (!enrolledCourses) {
          return res.status(404).json({
            enrolledCourse: [],
          });
        }
        return res.status(200).json({success:true,enrolledCourses})
        
    } catch (error) {
        console.error(error);
        return res
          .status(500)
          .json({ success: false, message: "Failed to get enroll in the course" });
      
    }
}

export { enrollCourse,getCourseDetailsWithEnrollStatus,getAllEnrolledCourses}