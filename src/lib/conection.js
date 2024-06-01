
import mongoose from "mongoose";

const { Mongo_Db } = process.env;

if (!Mongo_Db) throw new Error("Mongo_Db is not defined in .env.");

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null };
}

export const conectDB = async () => {
  if (cached.conn) return cached.conn;
  cached.conn = await mongoose.connect(Mongo_Db);
  console.log("connect sucesfully");

  return cached.conn;
};