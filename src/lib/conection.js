import mongoose from "mongoose";

export const conectDB = () => {
  try {
    if (mongoose.connection.readyState >= 1) return;
    mongoose
      .connect(process.env.Mongo_Db)
      .then(() => {
        console.log("connect sucesfully");
      })
      .catch((e) => {
        console.log("db Connection error", e);
      });
  } catch (error) {
    console.log(error);
  }
};
