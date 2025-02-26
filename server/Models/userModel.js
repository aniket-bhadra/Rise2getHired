import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    pic: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    savedJobs: [
      {
        job_id: { type: String },
        employer_logo: { type: String },
        job_title: { type: String },
        job_employment_type: { type: String },
        employer_name: { type: String },
      },
    ],
    lastBrowsedJob: {
      job_id: { type: String, default: null },
      job_title: { type: String, default: null },
      employer_name: { type: String, default: null },
    },
    noOfJobsBrowsed: { type: Number, default: 0 },
    savedAffirmations: [
      {
        id: { type: Number },
        text: { type: String },
        image: {
          type: String,
          default:
            "https://cdn.pixabay.com/photo/2024/05/09/08/07/ai-generated-8750166_1280.jpg",
        },
      },
    ],
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
