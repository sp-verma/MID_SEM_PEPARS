"use client";
import { useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { useUploadThing } from "@/utils/uploadthings";
import { useCallback, useState } from "react";
import { Upload } from "lucide-react";

const UploadPyqForm = () => {
  const [file, setFile] = useState([]);
  const [form, setForm] = useState({
    subject: "",
    branch: "",
    year: "",
    sem: "",
    url: "",
  });

  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles);
  }, []);

  const { startUpload, permittedFileInfo } = useUploadThing("uploadpepar", {
    onClientUploadComplete: async (res) => {
      const url = res[0].url;
      console.log(url);

      // const formSubmit=(data)=>{

      //   // data.pdfurl=pdfurl;
      //   console.log(data);
      //   setData(data);
      // }

      const { subject, branch, year, sem } = form;

      const resp = await fetch("/api/pyq", {
        method: "POST",
        body: JSON.stringify({
          subject: subject,
          branch: branch,
          year: year,
          sem: sem,
          url: url,
        }),
      });

      const data = await resp.json();

      if (data.type === "success") {
        setForm({
          subject: "",
          branch: "",
          year: "",
          sem: "",
          url: "",
        });
      }
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
    const { subject, branch, year, sem } = form;
    try {
      if (!subject || !branch || !year || !sem) {
        return console.log("please fill form");
      }
      startUpload(file);
      // const[data,setData]=useState('')
    } catch (error) {
      console.log(error);
    }
  };

  const updateFormState = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

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
            <label
              htmlFor="branch"
              className="gap-2 text-center text-white  font-bold"
            >
              Branch
            </label>

            <select
              name="branch"
              id="branch"
              className="border-2 border-black border-solid w-[20rem] rounded-[1rem] h-[3rem]"
              value={form.branch}
              onChange={updateFormState}
            >
              <option value="">select Branch</option>
              <option value="ai"> AI</option>
              <option value="cse">CSE</option>
              <option value="civil">CIVIL</option>
              <option value="ca">CA</option>
              <option value="eee">EEE</option>
              <option value="mechenical">Mechanical</option>
            </select>
          </div>

          <div className="flex flex-col items-center">
            <label
              htmlFor="semester"
              className="gap-2 text-center  font-bold text-white"
            >
              Semester
            </label>
            <select
              name="sem"
              id="semester"
              className="border-2 border-black border-solid w-[20rem] rounded-[1rem] h-[3rem]"
              placeholder="enter your semester name"
              value={form.sem}
              onChange={updateFormState}
            >
              <option value="">choose semester</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
            </select>
          </div>

          <div className="flex flex-col items-center">
            <label
              htmlFor="subject"
              className="mb-2 text-center  font-bold text-white"
            >
              Subject
            </label>
            <input
              type="text"
              name="subject"
              id="subject"
              placeholder="enter the subject name"
              className="border-2 border-black border-solid w-[20rem] rounded-[1rem] h-[3rem]"
              value={form.subject}
              onChange={updateFormState}
            />
          </div>

          <div className="flex flex-col items-center">
            <label
              htmlFor="year"
              className="gap-2 text-center  font-bold text-white"
            >
              Enter the year
            </label>

            <input
              type="number"
              name="year"
              id="year"
              placeholder="Enter 
             the Year"
              className="border-2 border-black border-solid w-[20rem] rounded-[1rem] h-[3rem]"
              value={form.year}
              onChange={updateFormState}
            />
          </div>

          <div className="flex items-center"></div>
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
