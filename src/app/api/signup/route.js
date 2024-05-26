import { NextResponse } from "next/server";
import User from "@/models/user";
import bcrypt from "bcrypt";
import { conectDB } from "@/lib/conection";

conectDB();

const POST = async (req) => {
  const reqbody = await req.json();
  const { email, password } = reqbody;

  try {
    const sinedup = await User.findOne({ email });

    if (sinedup) {
      return NextResponse.json({
        message: "you are already resister",
        type: "info",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      email,
      password: hashedPassword,
    });
    return NextResponse.json({
      message: "Signedup Successfuly",
      type: "success",
    });
  } catch (error) {
    console.log(error);
    NextResponse.json({
      message: error.message,
      type: "error",
    });
  }
};
export { POST };
