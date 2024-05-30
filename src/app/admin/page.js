import UploadPyqForm from "@/components/UploadPyqForm";
import Navbar from "@/components/navbar";
import { conectDB } from "@/lib/conection";
import Pyq from "@/models/Pyq";
import Subject from "@/models/Subject";

const page = async () => {
  "use server";
  conectDB();
  const data = await Pyq.find({}).populate([
    { path: "subject", model: Subject },
    // { path: "subject.branch", model: Branch },
  ]);
  console.log("sp", data);

  return (
    <div className="bg-gradient-to-r from-slate-900 to-slate-700">
      <div className="bg-gradient-to-r from-slate-900 to-slate-700">
        <Navbar />
      </div>

      <div>
        {/* <Admin /> */}
        <UploadPyqForm />
      </div>
      <div className="  flex gap-2 flex-wrap justify-stretch bg-gradient-to-r from-slate-900 to-slate-700 ">
        {data?.map((pyq, index) => {
          return (
            <div key={index} className="">
              <div className="relative h-[200px] w-[200px] rounded-md">
                <div className="absolute inset-0 bg-black"></div>
                <div className="absolute bottom-4 left-4 text-left">
                  <h1 className="text-lg font-semibold text-white">
                    {pyq?.subject?.name}
                  </h1>
                  <p className="mt-2 text-sm text-gray-300">{pyq.year}</p>
                  <h1 className="text-white">{pyq?.subject?.sem}</h1>
                  <h1 className="text-white">{pyq?.subject?.branch}</h1>
                  <a
                    className="mt-2 inline-flex cursor-pointer items-center text-sm font-semibold text-white"
                    href={pyq.url}
                    download
                  >
                    download &rarr;
                  </a>
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
