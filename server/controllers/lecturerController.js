import {v2 as cloudinary} from 'cloudinary'
import lecturerModel from '../models/lecturerModel.js'


const addLecturer = async (req, res) => {
    try {
        const { name, email, degree } = req.body;
        const imageFile = req.file;

        if (!name || !email || !degree || !imageFile) {
            return res.json({ success: false, message: "Missing details" });
        }

        // Upload to Cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });

        if (!imageUpload || !imageUpload.secure_url) {
            return res.json({ success: false, message: "Image upload failed" });
        }

        const lecturerData = {
            name,
            email,
            degree,
            photoUrl: imageUpload.secure_url, // Ensure photoUrl is set
        };

        const newLecturer = new lecturerModel(lecturerData);
        await newLecturer.save();

        res.json({ success: true, message: "Lecturer added" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


const getLecturers = async (req,res) =>{
    try {
        const lecturerData = await lecturerModel.find();
        res.json({success:true,lecturerData})
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export {addLecturer,getLecturers}