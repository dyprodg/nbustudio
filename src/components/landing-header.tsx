"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from 'next-themes';
import { SparklesCore } from "./ui/sparkles";
import { motion } from "framer-motion";
import FlybyText from "./flighbytext";

export function LandingHeader() {
  const { theme } = useTheme();
  const [particleColor, setParticleColor] = useState("#ff6c2c");

  useEffect(() => {
    setParticleColor(theme === "dark" ? "#ff6c2c" : "#000000");
  }, [theme]);

  return (
    <motion.div 
      initial={{ y: 300}}
      animate={{ y: 0 }}
      transition={{ duration: 1, delay: 3}}
      className="h-auto w-full bg-transparent flex flex-col items-center mt-20 overflow-hidden rounded-md">
      <h1 className="md:text-7xl text-7xl lg:text-9xl font-bold text-center relative z-20">
          <FlybyText text="nbustudio" />
      </h1>
      <div className="w-[40rem] h-40 relative">
        {/* Gradients */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3 }}
        >
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent dark:via-custom-orange via-black to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent dark:via-custom-orange via-black to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent dark:via-orange-400 via-black to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent dark:via-orange-400 via-black to-transparent h-px w-1/4" />
        </motion.div>
        {/* Core component */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3 , delay: 1}}
          className="flex w-full h-full"
        >
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="w-full h-full"
          particleColor={particleColor}
        />
        </motion.div>

        {/* Radial Gradient to prevent sharp edges */}
        <div className={`absolute inset-0 w-full h-full dark:bg-black dark:radial-gradient-dark bg-custom-orange radial-gradient-light`}></div>
      </div>
      <div></div>
    </motion.div>
  );
}
