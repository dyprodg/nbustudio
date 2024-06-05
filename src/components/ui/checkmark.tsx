import React from "react";
import { useTheme } from "next-themes";

const CheckMark = ({ message }: { message: string }) => {
  const { theme } = useTheme();
  const strokeColor = theme === 'dark' ? '#ff6c2c' : '#000000';

  return (
    <div className="mt-8 m-8 flex flex-col items-center justify-center">
      <svg
        className="checksvg"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 130.2 130.2"
      >
        <circle
          className="path circle"
          fill="none"
          stroke={strokeColor}
          strokeWidth="6"
          strokeMiterlimit="10"
          cx="65.1"
          cy="65.1"
          r="62.1"
        />
        <polyline
          className="path check"
          fill="none"
          stroke={strokeColor}
          strokeWidth="6"
          strokeLinecap="round"
          strokeMiterlimit="10"
          points="100.2,40.2 51.5,88.8 29.8,67.5"
        />
      </svg>
      <p className="mt-4 text-center text-black dark:text-custom-orange text-3xl">{message}</p>
    </div>
  );
};

export default CheckMark;
