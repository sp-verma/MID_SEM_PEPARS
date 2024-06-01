import { conectDB } from "@/lib/conection";
import Subject from "@/models/Subject";
import { NextResponse } from "next/server";

conectDB();

const POST = async (req) => {
  const reqbody = await req.json();
  const { name, sem, branch } = reqbody;

  try {
    const sub = await Subject.findOne({
      $and: [{ name }, { sem }, { branch }],
    });
    if (sub) {
      return NextResponse.json({
        message: "This Subject is already added",
        type: "info",
      });
    }
    const subject = await Subject.create({ name, sem, branch });
    revalidatePath("/admin");
    revalidatePath("/subject");
    revalidatePath("/pyq");
    return NextResponse.json({ message: "subject added", type: "success" });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ message: error.message, type: "error" });
  }
};

const GET = async (req) => {
  const branch = req.nextUrl.searchParams.get("branch");
  const sem = req.nextUrl.searchParams.get("sem");

  let subjects = [];

  if (branch && sem)
    subjects = await Subject.find({ $and: [{ branch }, { sem }] });
  else subjects = await Subject.find({});
  try {
    return NextResponse.json({
      subjects,
      message: "subject fetched Successfully",
      type: "successs"
    });
  } catch (error) {
    console.log(err);
    return NextResponse.json({
      message: error.message,
      type: "error",
    });
  }
};
export { POST, GET };
