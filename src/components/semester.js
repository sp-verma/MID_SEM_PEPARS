"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const menuItems2 = [
  {
    name: "1",
    href: "subject",
    image: "/ai.jpg",
  },
  {
    name: "2",
    href: "subject",
    image: "/cse.jpg",
  },
  {
    name: "3",
    href: "subject",
    image: "/civil.jpg",
  },
  {
    name: "4",
    href: "subject",
    image: "/civil.jpg",
  },
  {
    name: "5",
    href: "subject",
    image: "/eee.jpg",
  },
  {
    name: "6",
    href: "subject",
    image: "/mechanical.jpg",
  },
  {
    name: "7",
    href: "subject",
    image: "/mechanical.jpg",
  },
  {
    name: "8",
    href: "subject",
    image: "/mechanical.jpg",
  },
];

export default function Semester({ branch }) {
  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 5 }}
      className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] w-full gap-4"
    >
      {menuItems2.map((item2) => (
        <Link
          key={item2.name}
          scroll={false}
          href={`/subject?branch=${branch}&sem=${item2.name}`}
        >
          {/* <div className="w-fit h-fit ">
                <Image
                  src={item2.image}
                  width={200}
                  height={200}
                  alt="AirMax Pro"
                  className="z-0 h-full w-full rounded-md object-cover"
                />
              </div> */}

          <div className="text-white p-6 text-xl w-full items-center flex justify-center rounded-[40px] font-bold border-2 hover:scale-105 transition-transform">
            {item2.name}
          </div>
        </Link>
      ))}
    </motion.div>
  );
}
