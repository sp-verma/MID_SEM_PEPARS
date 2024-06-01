import { fetchSubjects } from "@/actions/subject";
import Link from "next/link";
import { redirect } from "next/navigation";




const page = async ({ searchParams }) => {
  const { branch, sem } = searchParams;

  if (!branch || !sem) return redirect("/");

  const data = await fetchSubjects({ branch, sem });
  

  // const subjects = data?.subjects;
  // console.log(subjects)

  if (!branch || !sem) {
    redirect("/");
  }

  return (
    <div className=" bg-gray-900 min-h-[42rem] flex flex-col ">
      <p className="mt-3 text-2xl text-center md:text-5xl uppercase font-extrabold bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent pt-7">
        Select Your SUBJECT
      </p>

      <div className=" flex gap-6 flex-wrap justify-center items-center pt-[20%] ">
        {data?.length ? (
          data.map((sub, index) => {
            return (
              <div key={index} className="">
                <Link
                  href={`/pyqpepar?branch=${branch}&sem=${sem}&subject=${sub.name}`}
                >
                  <div className="relative h-[120px] w-[200px] border-2 border-white rounded-[25px]  hover:w-[220px]">
                    <div className="   text-lg font-semibold text-white flex justify-center items-center pt-[20%] hover:text-3xl  ">
                      {sub.name}
                    </div>
                  </div>
                </Link>
              </div>
            );
          })
        ) : (
          <h2 className="text-white">
            No Subjects found for {branch} {sem} semester
          </h2>
        )}
      </div>
    </div>
  );
};

export default page;
