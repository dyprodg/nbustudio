import React from "react";

// Define the props for the Cross component
interface CrossProps {
  size?: number;
  color?: string;
}

// Create the Cross component
const Cross: React.FC<CrossProps> = ({ size = 24, color = "currentColor" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M10 4H14V10H20V14H14V20H10V14H4V10H10V4Z" />
  </svg>
);

export default Cross;
