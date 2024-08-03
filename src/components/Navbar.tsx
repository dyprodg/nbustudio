'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react";
import ThemeToggle from "./ui/mode-toggle";
import Logo from "./logo";

export default function Navbar() {
    const pathname = usePathname();
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const isActive = (path: string) => pathname === path;

    return (
        <motion.div 
            initial={{ y: -150 }}
            animate={{ y: 0 }}
            transition={{ duration: 1 }}
            className="flex h-[70px] fixed text-lg md:text-2xl top-0 z-50 w-full uppercase justify-evenly items-center font-bold bg-custom-orange dark:bg-black ">
                <div className="bg-custom-orange border-2 border-black justify-center items-center p-2 rounded-full ml-4 hidden md:flex">
                    <Logo size={50} color="black" />
                </div>
            
            <motion.div className={`px-1 transition duration-100 ease-in-out hover:text-custom-orange hover:dark:text-black hover:bg-black hover:dark:bg-custom-orange ${isActive('/') ? 'text-custom-orange dark:text-black bg-black dark:bg-custom-orange' : ''}`}>
                <Link href="/">
                    <p>Home</p>
                </Link>
            </motion.div>
            {/* 
            <motion.div className={`px-1 transition duration-100 ease-in-out hover:text-custom-orange hover:dark:text-black hover:bg-black hover:dark:bg-custom-orange ${isActive('/services') ? 'text-custom-orange dark:text-black bg-black dark:bg-custom-orange' : ''}`}>
                <Link href="/services">
                    <p>Services</p>
                </Link>
            </motion.div>
            */}
            <motion.div className={`px-1 transition duration-100 ease-in-out hover:text-custom-orange hover:dark:text-black hover:bg-black hover:dark:bg-custom-orange ${isActive('/projekte') ? 'text-custom-orange dark:text-black bg-black dark:bg-custom-orange' : ''}`}>
                <Link href="/projekte">
                    <p>Projekte</p>
                </Link>
            </motion.div>
            <motion.div className={`px-1 transition duration-100 ease-in-out hover:text-custom-orange hover:dark:text-black hover:bg-black hover:dark:bg-custom-orange ${isActive('/kontakt') ? 'text-custom-orange dark:text-black bg-black dark:bg-custom-orange' : ''}`}>
                <div onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
                    <p>Kontakt</p>
                    <AnimatePresence>
                        {isDropdownOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="absolute mt-2 bg-black text-custom-orange dark:bg-custom-orange dark:text-black shadow-lg rounded-lg"
                            >
                                <Link 
                                    href="/kontakt"
                                    onClick={() => setDropdownOpen(false)}
                                >
                                    <p className="p-2 hover:bg-gray-200 dark:hover:bg-neutral-700">Kontakt</p>
                                </Link>
                                <Link 
                                    href="/impressum"
                                    onClick={() => setDropdownOpen(false)}
                                >
                                    <p className="p-2 hover:bg-gray-200 dark:hover:bg-neutral-700">Impressum</p>
                                </Link>
                                <Link 
                                    href="/agb"
                                    onClick={() => setDropdownOpen(false)}
                                >
                                    <p className="p-2 hover:bg-gray-200 dark:hover:bg-neutral-700">AGB</p>
                                </Link>
                                <Link 
                                    href="/datenschutz"
                                    onClick={() => setDropdownOpen(false)}
                                >
                                    <p className="p-2 hover:bg-gray-200 dark:hover:bg-neutral-700">Datenschutz</p>
                                </Link>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
            <motion.div>
                <ThemeToggle />
            </motion.div>
        </motion.div>
    )
}
