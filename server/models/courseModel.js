import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    courseTitle: { type: String, required: true },
    subTitle: { type: String },
    description: { type: String },
    branch: { type: String, required: true },
    semester: { type: String, required: true },
    courseThumbnail: { type: String },
    enrolledStudents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    lectures: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "lecture",
      },
    ],
    lecturerData: { type: Object, required: true },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const courseModel =
  mongoose.models.course || mongoose.model("course", courseSchema);

export default courseModel;
