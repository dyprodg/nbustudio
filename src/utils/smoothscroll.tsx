"use client";
import React, { ReactNode } from 'react';
import { ReactLenis } from "@studio-freight/react-lenis";

interface SmoothScrollingProps {
  children: ReactNode;
}

function SmoothScrolling({ children }: SmoothScrollingProps) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 2 }}>
      {children}
    </ReactLenis>
  );
}

export default SmoothScrolling;
