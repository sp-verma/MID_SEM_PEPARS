"use client";
import Image from "next/image";
import sp from "/public/sp.jpg";
import { UploadDropzone } from "@/utils/uploadthings";
import React, { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";

// import React, { useState } from 'react'
import Link from "next/link";
import { Heading1 } from "lucide-react";

const Admin = () => {
  const [pdfurl, setPdfurl] = useState("");
  const [showForm, setShowForm] = useState(true);

  const uplodData = async (e) => {
    e.preventDefault();
    try {
      const url = pdfurl;

      const { name, branch, year, sem } = e.currentTarget;
      // const[data,setData]=useState('')
      if (!name || !branch || !year || !sem) {
        console.log("please fill form");
      }
      console.log(url);

      // const formSubmit=(data)=>{

      //   // data.pdfurl=pdfurl;
      //   console.log(data);
      //   setData(data);
      // }

      const res = await fetch("/api/datapyq", {
        method: "POST",
        body: JSON.stringify({
          name: name.value,
          branch: branch.value,
          year: year.value,
          sem: sem.value,
          url: url,
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className={"flex h-[40px] gap-2 justify-between  mt-4"}>
        {/* creating nav */}
        <div className={"  mx-[100px] flex gap-[20px]  text-black "}>
          <Link href="/dashboard" className="mx-4">
            NOTES
          </Link>
          <Link href="/dashboard">SOLUTION</Link>
          <Link href="/dashboard" className="">
            HOME PAGE
          </Link>
        </div>
        <div className="px-[40px] flex gap-2">
          <Link
            href="/contact"
            className="px-2  border-black border-2   rounded text-black font-bold"
          >
            contact
          </Link>
          <Link
            href="/login"
            className="border-black border-2 rounded mx-2 font-bold px-[5px] "
          >
            Log In
          </Link>
        </div>
      </div>

      <div className="flex  ">
        {/* uplods documents */}

        <div
          className="flex items-center justify-center min-h-[100vh]
     m-[10px] bg-[(115deg, #56d8e4 10%, #9f01ea 90%]
        "
        >
          <div className="mx-5 ">
            <UploadDropzone
              endpoint="uploadpepar"
              onClientUploadComplete={(res) => {
                // Do something with the response
                console.log("Files: ", res[0].url);
                setPdfurl(res[0].url);
                // alert("Upload Completed");
                setShowForm(true);
              }}
              onUploadError={(error) => {
                // Do something with the error.
                console.log(`ERROR! ${error.message}`);
              }}
            />

            {/* <div className=' flex flex-col gap-2'> */}

            {showForm ? (
              <form onSubmit={uplodData}>
                <div>
                  <div className="flex flex-col">
                    <input
                      type="text"
                      name="name"
                      id="subject"
                      placeholder="enter the subject name"
                      className="border-2 border-black border-solid"
                    />

                    <label
                      htmlFor="subject"
                      className="mb-2 text-center  font-bold"
                    >
                      Subject
                    </label>
                  </div>

                  <div className="flex flex-col">
                    <input
                      type="text"
                      name="branch"
                      id="branch"
                      placeholder="enter the Department name"
                      className="border-2 border-black border-solid"
                    />
                    <label
                      htmlFor="branch"
                      className="gap-2 text-center   font-bold"
                    >
                      Branch
                    </label>
                  </div>

                  <div className="flex flex-col">
                    <input
                      type="number"
                      name="year"
                      id="year"
                      placeholder=""
                      className="border-2 border-black border-solid"
                    />
                    <label
                      htmlFor="year"
                      className="gap-2 text-center  font-bold"
                    >
                      Enter the year
                    </label>
                  </div>

                  <div className="flex flex-col">
                    <input
                      type="text"
                      name="sem"
                      id="semester"
                      className="border-2 border-black border-solid"
                      placeholder="enter your semester name"
                    />
                    <label
                      htmlFor="semester"
                      className="gap-2 text-center  font-bold"
                    >
                      Semester
                    </label>
                  </div>

                  <button
                    className="border-2 w-[160px] h-[40px] text-[20px] mx-[100px]
          bg-[#04AA6D] font-bold "
                    type="submit"
                  >
                    submit
                  </button>
                </div>

                {/* </div> */}
              </form>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
