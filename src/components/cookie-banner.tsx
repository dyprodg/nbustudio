"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { motion } from "framer-motion";

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cookieConsent = Cookies.get("cookieConsent");
    if (!cookieConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    Cookies.set("cookieConsent", "true", { expires: 30 });
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ease: "easeOut", duration: 0.5 }}
      className="fixed border border-black dark:border-custom-orange bottom-0 left-0 right-0 bg-custom-orange dark:bg-black text-black dark:text-custom-orange p-2 flex justify-between items-center z-50"
    >
      <div>
        {`Diese Website verwendet nur technisch notwendige Cookies, um die
        Funktionalität der Website zu gewährleisten. Es werden keine Cookies gespeichert, die für die
        Funktionalität der Website nicht notwendig sind.`}
      </div>
      <div className="space-x-4">
        <div
          className="text-xl hover:scale-105 transition ease-in-out duration-100 border border-black dark:border-custom-orange p-2 cursor-pointer"
          onClick={handleAccept}
        >
          Akzeptieren
        </div>
      </div>
    </motion.div>
  );
};

export default CookieBanner;
