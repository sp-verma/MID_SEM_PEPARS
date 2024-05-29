
import UploadPyqForm from "@/components/UploadPyqForm";
import Navbar from "@/components/navbar";
import { fetchPyq } from "./action";

const page = async () => {
  const data = await fetchPyq();

  const pyqdata = data?.pyqs;
  // console.log(pyqdata);

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
        {pyqdata?.map((pyq, index) => {
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
