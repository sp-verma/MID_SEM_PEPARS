import { fetchPyq } from "@/actions/pyq";
import UploadPyqForm from "@/components/UploadPyqForm";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const page = async () => {
  const pyqdata = await fetchPyq();

  return (
    <div className="flex items-center gap-6 flex-col">
      {/* <Admin /> */}
      <UploadPyqForm />

      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] w-full gap-4 ">
        {pyqdata?.map((pyq, index) => {
          return (
            <div key={index} className="">
              <div className="relative bg-gray-800 rounded-xl p-4">
                <h2 className="text-lg font-semibold ">{pyq?.subject?.name}</h2>
                <p className="mt-2 text-sm text-gray-300">
                  Year <span className="font-semibold">{pyq.year}</span>
                </p>
                <p className="text-gray-300">
                  Sem <span className="font-semibold">{pyq?.subject?.sem}</span>
                </p>
                <p className="text-gray-300">
                  Branch{" "}
                  <span className="font-semibold">{pyq?.subject?.branch}</span>
                </p>
                <a
                  className="mt-2 inline-flex cursor-pointer items-center text-sm font-semibold bg-gray-700 rounded-xl"
                  href={pyq.url}
                  download
                >
                  <Button>
                    download <Download className="ml-2 w-4 h-4" />
                  </Button>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default page;
