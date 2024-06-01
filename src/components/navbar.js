"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import Logo from "./logo";
import MobileMenu from "./mobileMenu";


export default function ExampleNavbarOne() {
  const { status } = useSession()


  const menuItems = useMemo(() => [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "About",
      href: "/about",
    },
    {
      name: "Contact",
      href: "/contact",
    }
  ])
  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="w-full sticky top-0 bg-gray-900 z-50"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8 ">
        <Logo />
        <div className="hidden lg:block">
          <ul className="inline-flex space-x-8">
            {
              status === 'authenticated' ?

                <li>
                  <Link
                    href='admin'
                    className="text-sm font-semibold text-white text-[20px]  hover:text-teal-500 duration-300  "
                  >
                    Admin
                  </Link>
                </li>
                :
                null
            }
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="text-sm font-semibold text-white text-[20px]  hover:text-teal-500 duration-300  "
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden lg:block ">
          {
            status === 'authenticated' ?
              <Button onClick={signOut} className='bg-white text-gray-900 font-semibold'>Logout</Button>
              :
              <Link href="/login">
                <Button className='bg-white text-gray-900 font-semibold'>Login</Button>
              </Link>
          }
        </div>

        <MobileMenu />

      </div>
    </motion.div>
  );
}
