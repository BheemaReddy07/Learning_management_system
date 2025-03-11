import courseModel from "../models/courseModel.js";
import lectureModel from "../models/lectureModel.js";
import {
  deleteMediaFromCloudinary,
  deleteVideoFromCloudinary,
  uploadMedia,
} from "../utils/cloudinary.js";
const createCourse = async (req, res) => {
  try {
    const { courseTitle, branch, semester, lecturer } = req.body;
    if (!courseTitle || !semester || !branch || !lecturer) {
      return res.json({ success: false, message: "all fields required" });
    }

    const lecturerData =
      typeof lecturer === "string" ? JSON.parse(lecturer) : lecturer;

    const course = await courseModel.create({
      courseTitle,
      branch,
      semester,
      lecturerData,
      creator: req.id,
    });
    return res.json({ success: true, message: "course Created", course });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Failed to create Courese" });
  }
};

const getCreatorCourses = async (req, res) => {
  try {
    const courses = await courseModel.find({ creator: req.id });
    if (!courses.length) {
      return res.json({
        success: true,
        courses: [],
        message: "No courses found",
      });
    }
    return res.json({ success: true, courses });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch courses" });
  }
};

const editCourse = async (req, res) => {
  try {
    const { courseId, courseTitle, subTitle, branch, semester } = req.body;
    const thumbnail = req.file;

    let course = await courseModel.findById(courseId);
    if (!course) {
      return res.json({ success: false, message: "Course Not found" });
    }

    let courseThumbnail = course.courseThumbnail;
    if (thumbnail) {
      if (course.courseThumbnail) {
        const publicId = course.courseThumbnail.split("/").pop().split(".")[0];
        await deleteMediaFromCloudinary(publicId);
      }
      const uploadedImage = await uploadMedia(thumbnail.path);
      courseThumbnail = uploadedImage.secure_url;
    }
    const updateData = {
      courseTitle,
      subTitle,
      branch,
      semester,
      courseThumbnail,
    };
    course = await courseModel.findByIdAndUpdate(courseId, updateData, {
      new: true,
    });
    return res.json({ success: true, course, message: "Course edited" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to edit courses" });
  }
};

const getCourseDetailsById = async (req, res) => {
  try {
    const { courseId } = req.body;
    const courseDetails = await courseModel.findById(courseId);
    if (!courseDetails) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }
    res.status(200).json({ success: true, courseDetails });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch courses by id" });
  }
};

const createLecture = async (req, res) => {
  try {
    const { lectureTitle, courseId } = req.body;

    if (!courseId || !lectureTitle) {
      return res
        .status(404)
        .json({ success: false, message: "Missing details" });
    }

    const lecture = new lectureModel({
      lectureTitle,
    });
    await lecture.save();

    const course = await courseModel.findById(courseId);
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course Not Found" });
    } else {
      course.lectures.push(lecture._id);
      await course.save();
    }
    return res
      .status(201)
      .json({ success: true, lecture, message: "lecture created" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to create lecture" });
  }
};

const getCourseLectures = async (req, res) => {
  try {
    const { courseId } = req.body;
    const course = await courseModel.findById(courseId).populate("lectures");
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course Not Found" });
    }
    return res.status(200).json({ success: true, lectures: course.lectures });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch lecture" });
  }
};

const editLecture = async (req, res) => {
  try {
    const { uploadVideoInfo, lectureTitle, courseId, lectureId } = req.body;
    const lecture = await lectureModel.findById(lectureId);

    if (!lecture) {
      return res
        .status(404)
        .json({ success: false, message: "Lecture not found" });
    }

    if (lectureTitle) lecture.lectureTitle = lectureTitle;
    if (uploadVideoInfo?.videoUrl) lecture.videoUrl = uploadVideoInfo.videoUrl;
    if (uploadVideoInfo?.publicId) lecture.publicId = uploadVideoInfo.publicId;

    await lecture.save();

    const course = await courseModel.findById(courseId);
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }

    if (course && !course.lectures.includes(lecture._id)) {
      course.lectures.push(lecture._id);
      await course.save();
    }

    return res
      .status(200)
      .json({
        success: true,
        lecture,
        message: "lecture Updated successfully",
      });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to edit lecture" });
  }
};

const removeLecture = async (req, res) => {
  try {
    const { lectureId } = req.body;
    const lecture = await lectureModel.findByIdAndDelete(lectureId);
    if (!lecture) {
      return res
        .status(404)
        .json({ success: false, message: "Lecture not found" });
    }
    if (lecture.publicId) {
      await deleteVideoFromCloudinary(lecture.publicId);
    }
    await courseModel.updateOne(
      { lectures: lectureId },
      { $pull: { lectures: lectureId } }
    );
    return res
      .status(200)
      .json({ success: true, message: "Lecture deleted successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to remove lecture" });
  }
};

const getLectureById = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const lecture = await lectureModel.findById(lectureId);
    if (!lecture) {
      return res
        .status(404)
        .json({ success: false, message: "Lecture not found" });
    }

    return res.status(200).json({ success: true, lecture });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Failed to fetch lecture byId" });
  }
};


const togglePublishStatus = async (req,res) =>{
  try {
    const {courseId} = req.body;
    if (!courseId) {
      return res.status(400).json({ success: false, message: "Course ID is required" });
    }
    const course  = await courseModel.findById(courseId)
    if(!course){
      return res.status(404).json({success:false,message:"Course not found"})
    }

    course.isPublished = !course.isPublished;
    await course.save();

    res.status(200).json({success:true, message: `Course ${course.isPublished ? "published" : "unpublished"} successfully`,
      isPublished: course.isPublished})

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Failed to toggle the publish status" });
  }
}

export {
  createCourse,
  getCreatorCourses,
  editCourse,
  getCourseDetailsById,
  createLecture,
  getCourseLectures,
  editLecture,
  removeLecture,
  getLectureById,
  togglePublishStatus
};
