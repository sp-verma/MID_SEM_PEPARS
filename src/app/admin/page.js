import Admin from "@/components/Admin";
import UploadPyqForm from "@/components/UploadPyqForm";
import Navbar from '@/components/navbar';

export const fetchPyq = async () => {
  const response = await fetch("http://localhost:3000/api/pyq", {
    next: { revalidate: 6},
  });
  const data = await response.json();
  return data;
};

const page = async () => {
  const data = await fetchPyq();
  console.log(data.name);

  const pyqdata = data?.pyqs || ["sp"];
  console.log(pyqdata);

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
        {pyqdata.map((pyq,_id) => {
          return (
            <div key={_id} className="">
            
              
              <div className="relative h-[200px] w-[200px] rounded-md">
                <div className="absolute inset-0 bg-black"></div>
                <div className="absolute bottom-4 left-4 text-left">
                  <h1 className="text-lg font-semibold text-white">
                    {pyq.subject.name}
                  </h1>
                  <p className="mt-2 text-sm text-gray-300">
                  {pyq.year}</p>
                  <a
                    className="mt-2 inline-flex cursor-pointer items-center text-sm font-semibold text-white"
                    href={pyq.url}
                    download
                  >
                    dawnload &rarr;
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
