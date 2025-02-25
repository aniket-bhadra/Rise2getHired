import mongoose from "mongoose";

const connectDB = async (url) => {
  try {
    await mongoose.connect(url);
    console.log("mongoDB connected Successfully");
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

export default connectDB;
