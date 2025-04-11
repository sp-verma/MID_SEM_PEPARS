"use client";
import { useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { useUploadThing } from "@/utils/uploadthings";
import { useCallback, useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "./ui/button";
import toast from "react-hot-toast";

const UploadPyqForm = () => {
  const [loading, setLoading] = useState(false);
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

  const { startUpload, permittedFileInfo, isUploading } = useUploadThing("uploadpepar", {
    onClientUploadComplete: async (res) => {
      const url = res[0].url;

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
        toast.success(data.message)
        setForm({
          subject: "",
          branch: "",
          year: "",
          sem: "",
          url: "",
        });
        setFile([]);
      }
      setLoading(false);
    },
    onUploadError: () => {
      setLoading(false);
      toast.error("error occurred while uploading, try again");
    },
    onUploadBegin: () => {
      setLoading(true);
      toast("Uploading started");
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
    setLoading(true);
    const { subject, branch, year, sem } = form;
    try {
      if (!subject || !branch || !year || !sem) {
        return toast.error("please fill all informations about pyq");
      }
      if (!file.length)
        return toast.error("Please select pdf file of pyq");
      startUpload(file);
      // const[data,setData]=useState('')
    } catch (error) {
      toast.error(error);
    }
    finally {
      setLoading(false);
    }
  };

  const updateFormState = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <div
        {...getRootProps()}
        className={`w-full h-60 flex items-center justify-center m-4 border-2 border-dashed border-spacing-6 border-slate-500 ${loading ? 'opacity-50' : 'cursor-pointer'} rounded-xl mx-[42%] bg-gray-600`}
      >
        <input {...getInputProps()} id="uploader" disabled={loading} />
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
      <form onSubmit={uplodData} className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        <div className="flex flex-col">
          <label
            htmlFor="branch"
            className="font-bold"
          >
            Branch
          </label>

          <select
            name="branch"
            id="branch"
            className="text-gray-900 border-2 border-black border-solid rounded-xl px-4 py-3"
            value={form.branch}
            disabled={loading}
            onChange={updateFormState}
          >
            <option value="">select Branch</option>
            <option value="ai"> AI</option>
            <option value="cse">CSE</option>
            <option value="civil">CIVIL</option>
            <option value="ca">CA</option>
            <option value="eee">EEE</option>
            <option value="mechanical">Mechanical</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="semester"
            className="font-bold "
          >
            Semester
          </label>
          <select
            name="sem"
            id="semester"
            className="text-gray-900 border-2 border-black border-solid rounded-xl px-4 py-3"
            placeholdertext-gray-900="enter your semester name"
            value={form.sem}
            onChange={updateFormState}
            disabled={loading}
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

        <div className="flex flex-col">
          <label
            htmlFor="subject"
            className="ont-bold "
          >
            Subject
          </label>
          <input
            type="text"
            name="subject"
            id="subject"
            placeholder="enter the subject name"
            className="text-gray-900 border-2 border-black border-solid rounded-xl px-4 py-3"
            value={form.subject}
            disabled={loading}
            onChange={updateFormState}
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="year"
            className="font-bold "
          >
            Enter the year
          </label>

          <input
            type="number"
            name="year"
            id="year"
            placeholder="Enter 
             the Year"
            className="text-gray-900 border-2 border-black border-solid rounded-xl px-4 py-3"
            value={form.year}
            disabled={loading}
            onChange={updateFormState}
          />
        </div>

        <Button
          className="sm:col-span-2 bg-gray-700"
          variant="outline"
          type="submit"
          disabled={loading}
          size="lg"
        >
          {
            loading ? 'Please wait' : 'Add Pyq'
          }
        </Button>

        {/* </div> */}
      </form>
    </>
  );
};

export default UploadPyqForm;
