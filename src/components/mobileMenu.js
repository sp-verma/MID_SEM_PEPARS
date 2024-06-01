'use client'

import { useMemo, useState } from "react";
import Logo from "./logo";
import { Button } from "./ui/button";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

const MobileMenu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { status } = useSession()

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
    };

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
        <>
            {/* Mobile Menu */}

            <div className="lg:hidden">
                <Menu
                    onClick={toggleMenu}
                    className="h-6 w-6 cursor-pointer text-white "
                />
            </div>
            {isMenuOpen && (
                <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
                    <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="px-5 pb-6 pt-5">
                            <div className="flex items-center justify-between">
                                <Logo />
                                <div className="-mr-2">
                                    <button
                                        type="button"
                                        onClick={toggleMenu}
                                        className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                                    >
                                        <span className="sr-only text-black">Close menu</span>
                                        <X className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>
                            </div>
                            <div className="mt-6">
                                <nav className="grid gap-y-4">
                                    {
                                        status === 'authenticated' ?

                                            <Link
                                                onClick={toggleMenu}
                                                href='/admin'
                                                className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50"
                                            >
                                                <span className="ml-3 text-base font-medium text-gray-900">
                                                    Admin
                                                </span>
                                            </Link>
                                            :
                                            null
                                    }
                                    {menuItems.map((item) => (
                                        <Link
                                            onClick={toggleMenu}
                                            key={item.name}
                                            href={item.href}
                                            className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50"
                                        >
                                            <span className="ml-3 text-base font-medium text-gray-900">
                                                {item.name}
                                            </span>
                                        </Link>
                                    ))}
                                    {
                                        status === 'authenticated' ?

                                            <Button onClick={signOut} className='bg-white text-gray-900 -m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50'>Logout</Button>
                                            :

                                            <Link
                                                onClick={toggleMenu}
                                                href='/login'
                                                className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50"
                                            >
                                                <span className="ml-3 text-base font-medium text-gray-900">
                                                    Login
                                                </span>
                                            </Link>
                                    }
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default MobileMenu
