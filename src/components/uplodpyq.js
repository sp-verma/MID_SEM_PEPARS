"use client";
import { UploadDropzone } from "@/utils/uploadthings";

import { useState } from "react";

import React from "react";

const uplodpyq = () => {
  const [pdfurl, setPdfurl] = useState("");

  return (
    <div>
      <UploadDropzone
        endpoint="uploadpepar"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res[0].url);
          setPdfurl(res[0].url);
          alert("Upload Completed");
        }}
        onUploadError={(error) => {
          // Do something with the error.
          console.log(`ERROR! ${error.message}`);
        }}
      />
    </div>
  );
};

export default uplodpyq;
