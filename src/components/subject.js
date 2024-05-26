import Link from "next/link";
import React from "react";
import Subject from "@/components/subject";
import { redirect } from "next/navigation";

export const fetchPyq = async () => {
  const response = await fetch("http://localhost:3000/api/pyq", {
    next: { revalidate: 60   },
  });
  const data = await response.json();
  return data;
};

const page = async ({ searchParams }) => {
  const { branch, sem } = searchParams;
  console.log(branch);
  console.log(sem);
  const sp= sem;
  const verma=branch;

  const data = await fetchPyq();
  console.log(data);

  const pyqdata = data?.pyq || ["sp"];
  console.log(pyqdata);

  if (!branch || !sem) {
    redirect("/");
  }

  return (
    <div>
      <div>
        <Subject sem={sem} branch={branch} />
        <div className="w-[2000px] h-[2000px] flex gap-2 flex-wrap justify-stretch bg-gray-500  ">
        <h1></h1>
        {pyqdata
          .filter((sub) => sub.subject.sem == sp && sub.subject.branch.toLowerCase() == verma.toLowerCase()  )
          .map((pyq,_id) => {
          return (
            <div key={_id} className="">
            <Link   href={`/pyqpepar?branch=${branch}&sem=${sem}&subject=${pyq.subject.name}`}>
              
              <div className="relative h-[200px] w-[200px] rounded-md">
                <div className="absolute inset-0 bg-black"></div>
                <div className="absolute bottom-4 left-4 text-left">
                  <h1 className="text-lg font-semibold text-white">
                    {pyq.subject.name}
                  </h1>
                  <p className="mt-2 text-sm text-gray-300">download your docoment
                  {pyq.subject.year}</p>
                  <a
                    className="mt-2 inline-flex cursor-pointer items-center text-sm font-semibold text-white"
                    href={pyq.subject.url}
                    
                  >
                    download &rarr;
                  </a>
                </div>
              </div>
              </Link>
            </div>
            )
        })}
        </div>
      </div>
    </div>
  );
};

export default page;
