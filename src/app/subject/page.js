import { fetchSubjects } from "@/actions/subject";
import Link from "next/link";
import { redirect } from "next/navigation";




const page = async ({ searchParams }) => {
  const { branch, sem } = searchParams;


  const data = await fetchSubjects({ branch, sem });

  if (!branch || !sem) {
    redirect("/");
  }

  return (
    <div className=" bg-gray-900 min-h-[42rem] flex flex-col gap-10">
      <h1 className="mt-3 text-2xl text-center md:text-5xl uppercase font-extrabold bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent pt-7">
        Select Your SUBJECT
      </h1>
      <p className="text-2xl text-center md:text-5xl uppercase font-extrabold bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent">
        {`${branch} - ${sem} Sem`}
      </p>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] w-full gap-4">
        {data?.length ? (
          data.map((sub, index) => {
            return (
              <div key={index} className="">
                <Link
                  href={`/pyqpepar?branch=${branch}&sem=${sem}&subject=${sub.name}`}
                >
                  <div className="text-white p-6 text-xl w-full items-center flex justify-center rounded-[40px] font-bold border-2 hover:scale-105 transition-transform">
                    {sub.name}
                  </div>
                </Link>
              </div>
            );
          })
        ) : (
          <h2 className="text-center col-span-full text-xl text-red-500 font-semibold capitalize">
            No Subjects found for <span className="uppercase text-white">{branch} {sem}</span> semester
          </h2>
        )}
      </div>
    </div>
  );
};

export default page;
