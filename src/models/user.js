import mongoose,{ Schema } from "mongoose";

const UserSchema=Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    sparse: true,
  },
  password: {
    type: String,
    required: [true, "Please enter your name."],
    select: false,
  },
});

const User = mongoose.models?.user || mongoose.model("user", UserSchema);

export default User;