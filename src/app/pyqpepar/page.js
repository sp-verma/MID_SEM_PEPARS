import { redirect } from "next/navigation";
import { fetchPyq } from "@/actions/pyq";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";



const page = async ({ searchParams }) => {
  const { branch, sem, subject } = searchParams;

  const pyqdata = await fetchPyq({ branch, sem, subject });


  if (!branch || !sem) {
    redirect("/");
  }

  return (
    <div className=" bg-gray-900 min-h-[42rem] flex flex-col gap-10">
      <h1 className="mt-3 text-2xl text-center md:text-5xl uppercase font-extrabold bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent pt-7">
        DOWNLOAD PYQ
      </h1>
      <p className="text-2xl text-center md:text-5xl uppercase font-extrabold bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent">
        {`${branch} - ${sem} Sem - ${subject}`}
      </p>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] w-full gap-4 ">
        {pyqdata.length ? pyqdata?.map((pyq, index) => {
          return (
            <div key={index} className="relative bg-gray-800 rounded-xl p-4 flex flex-col">
              <h2 className="text-lg font-semibold ">{pyq?.subject?.name}</h2>
              <p className="mt-2 text-sm text-gray-300">
                Year : <span className="font-semibold">{pyq.year}</span>
              </p>
              <p className="text-gray-300">
                Sem : <span className="font-semibold">{pyq?.subject?.sem}</span>
              </p>
              <p className="text-gray-300">
                Branch : <span className="font-semibold uppercase">{pyq?.subject?.branch}</span>
              </p>
              <a
                className="mt-2 inline-flex cursor-pointer items-center text-sm font-semibold bg-gray-700 rounded-xl"
                href={pyq.url}
                download
              >
                <Button className="w-full">
                  Download <Download className="ml-2 w-4 h-4" />
                </Button>
              </a>
            </div>
          );
        }) :
          <h2 className="text-center col-span-full text-xl text-red-500 font-semibold capitalize">
            No PYQ found for <span className="uppercase text-white">{branch} {sem} Sem {subject}</span>
          </h2>
        }
      </div>
    </div>


    /* <div className=" justify-between bg-gray-900 min-h-[42rem] px-4 mt-[5rem]   m-2 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] auto-rows-[300px] gap-4 ">
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
    </div> */
  );
};

export default page;
