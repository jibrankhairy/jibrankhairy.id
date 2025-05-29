"use client";

import dynamic from "next/dynamic";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

import Sidebar from "./sidebar";

interface LayoutsProps {
  children: React.ReactNode;
}

const Layouts = ({ children }: LayoutsProps) => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      delay: 50,
    });
  }, []);
  return (
    <div className="mx-auto max-w-7xl lg:px-12">
      <div className="mx-auto flex flex-col lg:flex-row lg:gap-5 lg:py-4">
        <Sidebar />
        <main className="max-w-[854px] transition-all duration-300 lg:w-4/5">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layouts;
