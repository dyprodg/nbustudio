'use client';
import { Link as ScrollLink } from "react-scroll";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import ThemeToggle from "./ui/mode-toggle";

export default function Navbar() {
  const pathname = usePathname();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  // Helper function to render either scroll link or regular link
  const renderLink = (to: string, name: string) => {
    if (pathname === '/#' || pathname === '/') {
      // Use ScrollLink for smooth scrolling when on the homepage
      return (
        <ScrollLink
          to={to}
          smooth={true}
          duration={500}
          className="cursor-pointer"
        >
          <p>{name}</p>
        </ScrollLink>
      );
    } else {
      // Use regular Link to navigate to the homepage and scroll
      return (
        <Link href={`/#${to}`}>
          <p>{name}</p>
        </Link>
      );
    }
  };

  return (
    <motion.div
      initial={{ y: -150 }}
      animate={{ y: 0 }}
      transition={{ duration: 1 }}
      className="flex h-[70px] fixed text-lg md:text-2xl top-0 z-50 w-full uppercase justify-evenly items-center font-bold bg-custom-orange dark:bg-black"
    >
      <motion.div
        className={`px-1 transition duration-100 ease-in-out hover:text-custom-orange hover:dark:text-black hover:bg-black hover:dark:bg-custom-orange ${
          isActive("/" || "/#home") ? "text-custom-orange dark:text-black bg-black dark:bg-custom-orange" : ""
        }`}
      >
        {renderLink("home", "Home")}
      </motion.div>

      <motion.div
        className={`px-1 transition duration-100 ease-in-out hover:text-custom-orange hover:dark:text-black hover:bg-black hover:dark:bg-custom-orange ${
          isActive("/#projekte") ? "text-custom-orange dark:text-black bg-black dark:bg-custom-orange" : ""
        }`}
      >
        {renderLink("projekte", "Projekte")}
      </motion.div>

      <motion.div
        className={`px-1 transition duration-100 ease-in-out hover:text-custom-orange hover:dark:text-black hover:bg-black hover:dark:bg-custom-orange ${
          isActive("/#kontakt") ? "text-custom-orange dark:text-black bg-black dark:bg-custom-orange" : ""
        }`}
      >
        <div
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          {renderLink("kontakt", "Kontakt")}

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute mt-2 bg-black text-custom-orange dark:bg-custom-orange dark:text-black shadow-lg rounded-lg"
              >
                <Link href="/impressum" onClick={() => setDropdownOpen(false)}>
                  <p className="p-2 hover:bg-gray-200 dark:hover:bg-neutral-700">
                    Impressum
                  </p>
                </Link>
                <Link href="/agb" onClick={() => setDropdownOpen(false)}>
                  <p className="p-2 hover:bg-gray-200 dark:hover:bg-neutral-700">
                    AGB
                  </p>
                </Link>
                <Link href="/datenschutz" onClick={() => setDropdownOpen(false)}>
                  <p className="p-2 hover:bg-gray-200 dark:hover:bg-neutral-700">
                    Datenschutz
                  </p>
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
  );
}
