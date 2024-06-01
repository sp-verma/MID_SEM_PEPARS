import { redirect } from "next/navigation";
import { fetchPyq } from "@/actions/pyq";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";



const page = async ({ searchParams }) => {
  const { branch, sem, subject } = searchParams;

  const pyqs = await fetchPyq({ branch, sem, subject });


  if (!branch || !sem) {
    redirect("/");
  }

  return (
    <div className=" bg-gray-900 min-h-[42rem] flex flex-col ">
      <p className="mt-3 text-2xl text-center md:text-5xl uppercase font-extrabold bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent pt-7">
        {" "}
        DOWNLOAD PYQ
      </p>


      <div className=" flex gap-6 flex-wrap justify-center items-center pt-[20%] ">
        {pyqs.map((pyq, index) => {

          return (
            <div key={index} className="">
              <div className="relative  h-[150px] w-[200px] border-2 border-white rounded-[25px]  hover:w-[220px] hover:h-[150px]">
                <div className="   text-lg font-semibold text-white flex justify-center items-center pt-[15%] hover:text-3xl flex-col  ">
                  {pyq.subject.name}
                  <h1> {pyq.year}</h1>
                  <a
                  className="    cursor-pointer items-center text-sm font-semibold  rounded-xl"
                  href={pyq.url}
                  download
                >
                  <Button>
                    download <Download className="ml-2 w-4 h-4" />
                  </Button>
                </a>


                </div>
              </div>

            </div>
          );
        })
        }
      </div>




      {/* <div className=" justify-between bg-gray-900 min-h-[42rem] px-4 mt-[5rem]   m-2 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] auto-rows-[300px] gap-4 ">
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
      </div> */}
    </div>
  );
};

export default page;
