"use client";
import Image from "next/image";
import Link from "next/link";
import Semester from "./semester";
import { motion } from "framer-motion";

const menuItems = [
  {
    name: "AI",
    href: "ai",
    image: "/ai.jpg",
  },
  {
    name: "CSE",
    href: "cse",
    image: "/cse.jpg",
  },
  {
    name: "CA",
    href: "ca",
    image: "/civil.jpg",
  },
  {
    name: "CIVIL",
    href: "civil",
    image: "/civil.jpg",
  },
  {
    name: "EEE",
    href: "eee",
    image: "/eee.jpg",
  },
  {
    name: "MECHANICAL",
    href: "mechanical",
    image: "/mechanical.jpg",
  },
];

export default function CardOne({ params }) {
  const isBranchSelected = params?.branch;
  const isSemSelected = params?.sem;

  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 5 }}
      className="bg-gray-900 px-4"
      id="get-started"
    >

      <div className="xl:mx-auto xl:w-full">
        <h1 className="mt-3 text-2xl text-center md:text-5xl uppercase font-extrabold bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent pt-7">
          {!isBranchSelected ? (
            'Select Your Deparment'
          ) : (
            !isSemSelected ?
              'Select Your semester'
              : null
          )}
        </h1>
        <h2 className="mt-3 text-2xl text-center md:text-5xl uppercase font-extrabold bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent pt-7">
          {isBranchSelected ? (
            `-${params?.branch}-`
          ) : null
          }
        </h2>

        <div className=" justify-between bg-gray-900 min-h-[42rem] px-4 mt-[5rem] m-2 grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] auto-rows-[250px] gap-4 ">
          {!isBranchSelected &&
            menuItems.map((item, index) => (
              <div className="relative w-full overflow-hidden rounded-xl shadow" key={index}>
                <div className="flex w-full">
                  <Link
                    scroll={false}
                    href={`?branch=${item.href}`}
                    className="w-full group"
                  >
                    <div className="h-[13rem] w-full overflow-hidden ">
                      <Image
                        src={item.image}
                        width={200}
                        height={200}
                        alt="AirMax Pro"
                        className="z-0 h-full w-full rounded-xl object-cover p-2 overflow-scrool opacity-60 group-hover:scale-105 transition-transform"
                      />
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                    <div className="absolute bottom-10 left-6 text-left">
                      <h1 className="text-xl font-semibold text-white group-hover:scale-150 transition-transform origin-left">
                        {item.name}
                      </h1>
                      {/* <p className="mt-2 text-sm text-[white] hover:text-[20px]">
                          click here for get previous year pepar and download
                        </p> */}
                      <button className="mt-2 inline-flex cursor-pointer items-center text-sm font-semibold text-white"></button>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          {isBranchSelected && !isSemSelected ? < Semester branch={params.branch} /> : null}
        </div>
      </div>
    </motion.div>
  );
}
