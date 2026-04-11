import mongoose from "mongoose";

export const connect_db = async function () {
  await mongoose
    .connect(
  "mongodb+srv://tanishapandya429_db_user:test1234@buildresume.8jrjeca.mongodb.net/BuildResume"
)
    .then(() => {
      console.log("Database connected successfully!");
    });
};
