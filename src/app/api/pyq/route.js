import { NextResponse } from "next/server";
import { conectDB } from "@/lib/conection";
import { revalidatePath } from "next/cache";
import Pyq from "@/models/Pyq";
import Subject from "@/models/Subject";

import { UTApi } from "uploadthing/server";

conectDB();

let globalUrl = null;

export const POST = async (req) => {
  const reqbody = await req.json();
  const { subject, branch, sem, url, year } = reqbody;
  globalUrl = url;
  try {
    const sub = await Subject.findOne({
      $and: [{ name: subject }, { sem }, { branch }],
    });

    let subjectId = sub?._id;

    if (!subjectId) {
      const newsub = await Subject.create({ name: subject, branch, sem });

      subjectId = newsub._id;
    }

    const pyq = await Pyq.findOne({ $and: [{ subject: subjectId }, { year }] });
    if (!pyq) await Pyq.create({ subject: subjectId, url, year });

    revalidatePath("/admin", "/subject", "/pyq");

    return NextResponse.json({ message: "PYQ Uploaded", type: "success" });
  } catch (error) {
    console.log(error);
    if (url) {
      const utapi = new UTApi();
      await utapi.deleteFiles(url.split("https://utfs.io/f/")[1]);
    }
    return NextResponse.json({
      message: error.message,
      type: "error",
    });
  }
};

export const GET = async (req) => {
  const branch = req.nextUrl.searchParams.get("branch");
  const sem = req.nextUrl.searchParams.get("sem");
  const subject = req.nextUrl.searchParams.get("subject");

  try {
    let pyqs = [];
    if (branch && sem && subject) {
      const sub = await Subject.findOne({
        $and: [{ name: subject }, { sem }, { branch }],
      });
      if (!sub) pyqs = [];
      else
        pyqs = await Pyq.find({ subject: sub._id }).populate([
          { path: "subject", model: Subject },
          // { path: "subject.branch", model: Branch },
        ]);
    } else {
      pyqs = await Pyq.find().populate([
        { path: "subject", model: Subject },
        // { path: "subject.branch", model: Branch },
      ]);
    }
    console.log('sp',pyqs)
    return NextResponse.json({
      pyqs,
      message: "pyqdata fetched Successfully",
      type: "success",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: error.message,
      type: "error",
    });
  }
};
