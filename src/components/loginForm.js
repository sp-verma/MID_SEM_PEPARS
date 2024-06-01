"use client";

import Image from "next/image";
import image from "/public/sp.jpg";
import { signIn } from "next-auth/react";

import React, { useState } from "react";
// import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const LoginForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false)

  const login = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { email, password } = e.currentTarget;

      if (!email.value || !password.value) {
        return toast.error("please enter email and password to login");
      }
      const data = await signIn("credentials", {
        email: email.value,
        password: password.value,
        redirect: false
      });
      if (data?.error) {
        toast.error(data.error)
      } else if (data?.ok) {
        router.push("/admin");
      }
    } catch (error) {
      toast.error(error.message)
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="h-full w-full lg:block hidden">
        <Image
          className="mx-auto h-full w-full rounded-md object-cover"
          src={image}
          width={500}
          height={400}
          alt=""
        />
      </div>
      <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8 ">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md  w-full">
          <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
            Sign in
          </h2>

          <form action="#" method="POST" className="mt-8 " onSubmit={login}>
            <div className="space-y-5">
              <div>
                <label
                  htmlFor=""
                  className="text-base font-medium "
                >

                  Email address
                </label>
                <div className="mt-2">
                  <input
                    className=" flex h-10 w-full rounded-md border border-gray-100/20 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    placeholder="Email"
                    name="email"
                    disabled={loading}
                  ></input>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor=""
                    className="text-base font-medium "
                  >

                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    className=" flex h-10 w-full rounded-md border border-gray-100/20 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    placeholder="Password"
                    name="password"
                    disabled={loading}
                  ></input>
                </div>
              </div>
              <div>
                <button
                  type="submit"

                  disabled={loading}
                  className="duration-300 inline-flex w-full items-center justify-center rounded-md bg-white px-3.5 py-2.5 font-semibold leading-7 text-gray-900 hover:bg-black/80 hover:text-white"
                >

                  {
                    loading ? 'Please wait' : 'Login'
                  }

                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
