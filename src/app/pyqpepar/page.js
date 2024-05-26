import Link from "next/link";
import React from "react";
import Subject from "@/components/subject";
import { redirect } from "next/navigation";

export const fetchPyq = async ({ branch, sem, subject }) => {
  const response = await fetch(
    `http://localhost:3000/api/pyq?branch=${branch}&sem=${sem}&subject=${subject}`,
    {
      next: { revalidate: 60 },
    }
  );
  const data = await response.json();
  return data;
};

const page = async ({ searchParams }) => {
  const { branch, sem, subject } = searchParams;

  const data = await fetchPyq({ branch, sem, subject });
  const pyqs = data?.pyqs;

  if (!branch || !sem) {
    redirect("/");
  }

  return (
    <div className=" bg-gray-900 min-h-[42rem] flex flex-col ">
      <p className="mt-3 text-2xl text-center md:text-5xl uppercase font-extrabold bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent pt-7">
        {" "}
        DOWNLOAD YOUR FILE
      </p>

      <div className="  grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] auto-rows-[200px] gap-4  ">
        {pyqs.map((pyq, index) => {
          return (
            <div key={index} className=" ">
              <div className=" flex justify-center relative h-[150px] w-[140px] rounded-md  border-2 border-white opacity-[100%]  hover:w-[200px]">
                <div className="absolute bottom-4 left-4 text-left hover:text-[30px] ">
                  <h1 className="text-lg font-semibold text-white text-center ">
                    {pyq.subject.name}
                  </h1>
                  <p className="mt-2 text-sm text-gray-300">{pyq.year}</p>
                  <div>
                    <a
                      className="mt-2 inline-flex cursor-pointer items-center text-sm font-semibold text-white"
                      href={pyq.url}
                      download={`${pyq.subject.name}_sem-${pyq.subject.sem}_${pyq.year}.pdf`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      download &rarr;
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default page;
