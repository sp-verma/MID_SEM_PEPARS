"use client";
import { useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { useUploadThing } from "@/utils/uploadthings";
import { useCallback, useState } from "react";
import { Upload } from "lucide-react";

const UploadPyqForm = () => {
  const [file, setFile] = useState([]);
  const [pdfurl, setPdfurl] = useState("");

  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles);
  }, []);

  const { startUpload, permittedFileInfo } = useUploadThing("uploadpepar", {
    onClientUploadComplete: (res) => {
      setPdfurl(res[0].url);
      console.log(res[0].url)
    },
    onUploadError: () => {
      console.log("error occurred while uploading");
    },
    onUploadBegin: () => {
      console.log("upload has begun");
    },
  });

  const fileTypes = permittedFileInfo?.config
    ? Object.keys(permittedFileInfo?.config)
    : [];

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  });

  const uplodData = async (e) => {
    e.preventDefault();
    const { subject, branch, year, sem } = e.currentTarget;
    try {
      await startUpload(file);
      const url = pdfurl;
      console.log(url)

     
      // const[data,setData]=useState('')
      if (!subject || !branch || !year || !sem) {
        console.log("please fill form");
      }
      console.log(url);
      console.log(subject)

      // const formSubmit=(data)=>{

      //   // data.pdfurl=pdfurl;
      //   console.log(data);
      //   setData(data);
      // }

      const res = await fetch("/api/pyq", {
        method: "POST",
        body: JSON.stringify({
          subject: subject.value,
          branch: branch.value,
          year: year.value,
          sem: sem.value,
          url:url,
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  console.log(file);

  return (
    <>
      <div
        {...getRootProps()}
        className="w-[8rem] h-[8rem]  flex items-center justify-center m-4 border-2 border-dashed border-spacing-6 border-slate-500 cursor-pointer rounded-xl mx-[42%] bg-green-300"
      >
        <input {...getInputProps()} id="uploader" />
        <label
          htmlFor="uploader"
          className="text-center pointer-events-none flex flex-col gap-4 items-center justify-center"
        >
          {file.length ? (
            file[0].name
          ) : (
            <>
              Upload Pyq in PDF format maxSize:4MB
              <Upload />
            </>
          )}
        </label>
      </div>
      <form onSubmit={uplodData} className="">
        <div className="">
          <div className="flex flex-col items-center">
          <label htmlFor="subject" className="mb-2 text-center  font-bold">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              id="subject"
              placeholder="enter the subject name"
              className="border-2 border-black border-solid w-[20rem] rounded-[1rem] h-[3rem]"
            />

           
          </div>

          <div className="flex flex-col items-center">
          <label htmlFor="branch" className="gap-2 text-center   font-bold">
              Branch
            </label>
            
            <input
              type="text"
              name="branch"
              id="branch"
              placeholder="enter the Department name"
              className="border-2 border-black border-solid w-[20rem] rounded-[1rem] h-[3rem]"
            />
           
          </div>

          <div className="flex flex-col items-center">
          <label htmlFor="year" className="gap-2 text-center  font-bold">
              Enter the year
            </label>

            <input
              type="number"
              name="year"
              id="year"
              placeholder="Enter 
             the Year"
              className="border-2 border-black border-solid w-[20rem] rounded-[1rem] h-[3rem]"
            />
            
          </div>

          <div className="flex flex-col items-center">
          <label htmlFor="semester" className="gap-2 text-center  font-bold">
              Semester
            </label>
            <input
              type="text"
              name="sem"
              id="semester"
              className="border-2 border-black border-solid w-[20rem] rounded-[1rem] h-[3rem]"
              placeholder="enter your semester name"
            />
           
          </div>
          <div className="flex items-center">
            
          </div>
          <div className="flex items-center w-[9rem] h-[3rem] mx-[45%] mt-[1rem] border-8 bg-sky-500 hover:bg-sky-700 rounded-[25px]">
          <button
            className=" text-[2rem] 
          font-bold p-5 "
            type="submit"
          >
            submit
          </button>
          </div>
        </div>

        {/* </div> */}
      </form>
    </>
  );
};

export default UploadPyqForm;
