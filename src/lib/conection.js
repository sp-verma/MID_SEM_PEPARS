import mongoose from "mongoose";

export const conectDB=()=>{
  try {
     mongoose
    .connect(process.env.Mongo_Db)
    .then(()=>{
      console.log("connect sucesfully");
    }
    )
    
  } catch (error) {
    console.log(error)
    
  };
};