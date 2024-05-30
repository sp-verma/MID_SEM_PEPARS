"use client";
import React from "react";
import Image from "next/image";
import sideimage from "/public/side.jpg";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "./ui/button";

const top = () => {
  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, x: 10, z: 10, opacity: 1 }}
      className="h-[calc(100vh-76px)]"
    >
      <div className="h-full grid grid-cols-1 lg:grid-cols-2 order-2 items-center">
        <div className="px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <div className="flex flex-col gap-10 items-center">
              <p className="mt-3 text-2xl text-center md:text-5xl uppercase font-extrabold bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent">
                {" "}
                previous years' mid-semester exam papers !
              </p>
              <Link href={"#get-started"} >
                <Button className="text-white border-2 border-white p-6 text-center rounded-[2rem] hover:bg-white hover:text-gray-900 transition-colors">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="order-1">
          <Image
            class="mx-auto lg:mx-0 mt-8 w-64 md:w-72 lg:max-w-lg lg:mt-0 lg:w-1/2 transform hover:-translate-y-3 infinite transition duration-500 ease-in-out"
            src={sideimage}
            width={200}
            height={200}
            alt=""
          />
        </div>

      </div>
    </motion.div>
  );
};

export default top;
