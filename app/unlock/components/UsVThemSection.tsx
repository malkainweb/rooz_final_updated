"use client";

import { HelveticaNeue, NeueMontreal } from "@/app/util/font";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

import checkkk from "@/public/specail/checkkk.svg";
import erroerr from "@/public/specail/erroerr.svg";
import kangaroo from "@/public/specail/kangaroo.png";
import { SanityComparisonRow } from "@/app/sanity/lib/types";

interface UsVThemSectionProps {
  comparisonRows: SanityComparisonRow[];
}

const UsVThemSection = ({ comparisonRows }: UsVThemSectionProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      className={`w-full bg-black text-white py-20 md:px-4 ${NeueMontreal.className}`}
    >
      <div className="md:max-w-5xl mx-auto">
        <div
          ref={scrollContainerRef}
          className="w-full flex md:px-0 px-4 md:overflow-x-auto overflow-y-visible pb-20 overflow-x-scroll"
        >
          <div className="grid grid-cols-3 bg-[#1B1B1B] shrink-0 md:w-full w-[35rem] border-[#4B33C2] border rounded-[50px] mt-40">
            {/* Column 1: ALL Feature Labels */}
            <div className="flex flex-col">
              <div className="h-28"></div>
              {comparisonRows.map((item, index) => (
                <div
                  key={item._id}
                  className="text-left px-[10%] flex items-center h-24 border-t border-t-[#4B33C2] text-white font-normal md:text-base text-sm"
                >
                  {item.feature}
                </div>
              ))}
            </div>

            {/* Column 2: ALL ROOZ Checks */}
            <div className="flex flex-col relative">
              <div className="bg-gradient-to-r from-[#6E78FB] to-[#4A31C1] absolute w-full h-[120%] top-[50%] rounded-[30px] justify-center flex translate-y-[-50%] left-0">
                <div className="w-fit h-fit mx-auto flex justify-center">
                  <Image
                    src={kangaroo}
                    alt="kangaroo"
                    className="md:w-[60%] w-[80%] h-auto translate-y-[-50%]"
                  />
                </div>
              </div>
              <div className="h-28 flex items-center justify-center">
                <p className="text-white font-black md:text-4xl text-2xl translate-y-3">
                  ROOZ
                </p>
              </div>
              {comparisonRows.map((item, index) => (
                <div
                  key={item._id}
                  className="text-left px-[10%] z-[10] flex items-center h-24 border-t border-t-[white] text-white font-normal md:text-base text-sm"
                >
                  {item.rooz}
                </div>
              ))}
            </div>

            {/* Column 3: ALL Other Brands X */}
            <div className="flex flex-col">
              <div className="h-28 flex items-center justify-center">
                <p className="text-white font-medium md:text-2xl text-lg translate-y-3">
                  Other brands
                </p>
              </div>
              {comparisonRows.map((item, index) => (
                <div
                  key={item._id}
                  className="text-left px-[10%] flex items-center h-24 border-t border-t-[#4B33C2] text-white font-normal md:text-base text-sm"
                >
                  {item.otherBrands}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex md:hidden w-full gap-6 justify-center mt-4">
          <button
            onClick={scrollLeft}
            className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all"
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18L9 12L15 6"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            onClick={scrollRight}
            className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all"
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 18L15 12L9 6"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default UsVThemSection;
