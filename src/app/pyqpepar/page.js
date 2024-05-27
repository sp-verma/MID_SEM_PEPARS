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

      <div className=" justify-between bg-gray-900 min-h-[42rem] px-4 mt-[5rem]   m-2 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] auto-rows-[300px] gap-4 ">
        {pyqs.map((pyq, index) => {
          return (
            <div className="relative rounded-md w-full" key={index}>
              <div className="flex w-full ">
              
                  <div className="absolute bottom-4 left-4 text-left border-2 border-white ">
                  <h1 className="text-lg font-semibold text-white">
                    {pyq.subject.name}
                  </h1>
                  <p className="mt-2 text-sm text-[white] hover:text-[20px]">{pyq.year}</p>
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
