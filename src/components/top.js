"use client";
import React from "react";
import Image from "next/image";
import sideimage from "/public/side.jpg";
import { motion } from "framer-motion";
import Link from "next/link";

const top = () => {
  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, x: 10, z: 10, opacity: 1 }}
      className="h-[calc(100vh-76px)] h"
    >
      <div className="h-full grid grid-cols-1 lg:grid-cols-2 order-2 items-center">
        <div className="px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <div className=" ">
              <p className="mt-3 text-2xl text-center md:text-5xl uppercase font-extrabold bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent">
                {" "}
                previous years' mid-semester exam papers !
              </p>
            </div>

            <iframe
              allow="join-ad-interest-group"
              data-tagging-id="AW-1053096647"
              data-load-time="1716145403558"
              height="0"
              width="0"
              src="https://td.doubleclick.net/td/rul/1053096647?random=1716145403543&amp;cv=11&amp;fst=1716145403543&amp;fmt=3&amp;bg=ffffff&amp;guid=ON&amp;async=1&amp;gtm=45be45f0v9138130951za200&amp;gcd=13n3n3n3n5&amp;dma=0&amp;u_w=1536&amp;u_h=864&amp;url=https%3A%2F%2Fvisme.co%2Fblog%2Fwebsite-color-schemes%2F&amp;ref=https%3A%2F%2Fwww.google.com%2F&amp;hn=www.googleadservices.com&amp;frm=0&amp;tiba=50%20Gorgeous%20Color%20Schemes%20From%20Stunning%20Websites&amp;did=dZTQ1Zm&amp;gdid=dZTQ1Zm&amp;npa=0&amp;pscdl=noapi&amp;auid=261572543.1715836325&amp;uaa=x86&amp;uab=64&amp;uafvl=Chromium%3B124.0.6367.208%7CGoogle%2520Chrome%3B124.0.6367.208%7CNot-A.Brand%3B99.0.0.0&amp;uamb=0&amp;uam=&amp;uap=Windows&amp;uapv=15.0.0&amp;uaw=0&amp;fledge=1&amp;data=event%3Dgtag.config"
              className="display: none; visibility: hidden"
            ></iframe>
          </div>
        </div>
        <div className="">
          <Image
            class="mx-auto lg:mx-0 mt-8 w-64 md:w-72 lg:max-w-lg lg:mt-0 lg:w-1/2 transform hover:-translate-y-3 infinite transition duration-500 ease-in-out"
            src={sideimage}
            width={200}
            height={200}
            alt=""
          />
        </div>
        <Link href={"#get-started"}>Get Started</Link>
      </div>
    </motion.div>
  );
};

export default top;
