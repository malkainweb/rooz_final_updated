"use client";

import { HelveticaNeue, NeueMontreal } from "@/app/util/font";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

import checkkk from "@/public/specail/checkkk.svg";
import erroerr from "@/public/specail/erroerr.svg";
import kangaroo from "@/public/specail/kangaroo.png";

interface ComparisonRow {
  feature: string;
}

const comparisonFeatures: ComparisonRow[] = [
  { feature: "Safe and secure" },
  { feature: "Fits perfectly" },
  { feature: "Safe and secure" },
  { feature: "Fits perfectly" },
];

const UsVThemSection = () => {
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
      className={`w-full  bg-black text-white py-20 md:px-4 ${NeueMontreal.className}`}
    >
      <div className="md:max-w-5xl mx-auto">
        {/* Header */}
        <h2
          className={`text-4xl ${HelveticaNeue.className} md:text-5xl font-medium text-center `}
        >
          Us V Them
        </h2>

        {/* Comparison Table */}

        <div
          ref={scrollContainerRef}
          className=" w-full flex md:px-0 px-4 md:overflow-x-auto overflow-y-visible pb-20  overflow-x-scroll"
        >
          <div
            className="flex bg-[#1B1B1B] shrink-0 md:w-full w-[40rem]  border-[#4B33C2] border rounded-[50px] 
 mt-40"
          >
            {/* Column 1: ALL Feature Labels */}
            <div className="flex w-[40%]  lg:w-[46%] flex-col ">
              <div className="h-28"></div>
              {comparisonFeatures.map((item, index) => (
                <div
                  key={index}
                  className="text-left pl-[15%]  flex items-center h-24 border-t border-t-[#4B33C2] text-white font-normal text-2xl  px-4 "
                >
                  {item.feature}
                </div>
              ))}
            </div>

            {/* Column 2: ALL ROOZ Checks */}
            <div className="flex flex-col relative w-[30%] lg:w-[27%] ">
              <div className="bg-gradient-to-r from-[#6E78FB] to-[#4A31C1] absolute w-full h-[120%] top-[50%] rounded-[30px]  justify-center flex translate-y-[-50%] left-0">
                <div className="  w-fit h-fit mx-auto flex justify-center ">
                  {" "}
                  <Image
                    src={kangaroo}
                    alt="kangaroo"
                    className="md:w-[60%] w-[80%] h-auto translate-y-[-50%]"
                  />
                </div>
              </div>
              <div className="h-28 flex items-center justify-center">
                <p className=" text-white font-black text-4xl  translate-y-3 ">
                  ROOZ
                </p>
              </div>
              {comparisonFeatures.map((item, index) => (
                <div
                  key={index}
                  className="flex z-[10] items-center border-t border-t-white h-24 justify-center "
                >
                  <Image src={checkkk} alt="check" className="w-10" />
                </div>
              ))}
            </div>

            {/* Column 3: ALL Other Brands X */}
            <div className="flex flex-col w-[30%] lg:w-[27%] ">
              <div className="h-28 flex items-center justify-center">
                <p className=" text-white font-medium text-2xl  translate-y-3 ">
                  Other brands
                </p>
              </div>
              {comparisonFeatures.map((item, index) => (
                <div
                  key={index}
                  className="flex h-24 border-t border-t-[#4B33C2] items-center justify-center "
                >
                  <Image src={erroerr} alt="error" className="w-10" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex md:hidden w-full gap-6 justify-center ">
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
