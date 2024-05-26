import Link from "next/link";
// import React from "react";
// import Subject from "@/components/subject";
import { redirect } from "next/navigation";

export const fetchSubjects = async ({ branch, sem }) => {
  const response = await fetch(
    `http://localhost:3000/api/subject?branch=${branch}&sem=${sem}`
  );
  const data = await response.json();
  return data;
};

const page = async ({ searchParams }) => {
  const { branch, sem } = searchParams;

  if (!branch || !sem) return redirect("/");

  const data = await fetchSubjects({ branch, sem });

  const subjects = data?.subjects;

  if (!branch || !sem) {
    redirect("/");
  }

  return (
    <div className=" bg-gray-900 min-h-[42rem] flex flex-col ">
      <p className="mt-3 text-2xl text-center md:text-5xl uppercase font-extrabold bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent pt-7">
        {" "}
        CHOOSE SUBJECT
      </p>

      <div className=" flex gap-6 flex-wrap justify-center items-center pt-[20%] ">
        {subjects?.length ? (
          subjects.map((sub, _id) => {
            return (
              <div key={_id} className="">
                <Link
                  href={`/pyqpepar?branch=${branch}&sem=${sem}&subject=${sub.name}`}
                >
                  <div className="relative h-[120px] w-[200px] border-2 border-white rounded-[25px]  hover:w-[220px]">
                    <div className="   text-lg font-semibold text-white flex justify-center items-center pt-[20%] hover:text-3xl  ">
                      {sub.name}
                    </div>
                  </div>
                </Link>
              </div>
            );
          })
        ) : (
          <h2 className="text-white">
            No Subjects found for {branch} {sem} semester
          </h2>
        )}
      </div>
    </div>
  );
};

export default page;
