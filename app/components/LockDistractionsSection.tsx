"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { NeueMontreal } from "../util/font";
import one from "@/public/lookDistractions/one.webp";
import two from "@/public/lookDistractions/two.webp";
import three from "@/public/lookDistractions/three.webp";
import four from "@/public/lookDistractions/four.webp";
import Image from "next/image";
import SlowCharacterReveal from "./SlowCharacterReveal";
import schoolLeaders from "@/public/lookDistractions/schoolLeaders.svg";
import { urlFor } from "@/app/sanity/lib/image";
import { SanitySiteHeaders, SanityStatCard } from "../sanity/lib/types";

interface StatCard {
  icon: any; // Can be StaticImageData or string URL
  mainStat: string;
  title: string;
  subStat: string;
  subText: string;
  bgColor: string;
}

interface LockDistractionsSectionProps {
  statCards: SanityStatCard[];
  siteHeaders?: SanitySiteHeaders;
}

const LockDistractionsSection = ({
  statCards,
  siteHeaders,
}: LockDistractionsSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, {
    once: false,
    margin: "-20% 0px -10% 0px",
  });

  // Transform Sanity stat cards to component format
  const stats: StatCard[] = statCards.map((card) => ({
    icon: card.icon
      ? urlFor(card.icon).width(64).height(64).url()
      : schoolLeaders,
    mainStat: card.mainStat,
    title: card.title,
    subStat: card.subStat,
    subText: card.subText,
    bgColor: card.bgColor,
  }));

  const images = [
    four, // Students walking outside
    one, // Students in hallway
    three, // Students studying together (yellow shirt)
    two, // Students reading (striped shirt & green)
  ];

  return (
    <section className="relative bg-black text-white py-20 px-6 overflow-hidden">
      <div
        className={`font-medium max-w-7xl mx-auto ${NeueMontreal.className}`}
      >
        {/* Top Images Row */}
        <div className="flex justify-center md:px-0 px-[10%] gap-3 mb-5">
          {images.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="md:w-[6rem] w-full aspect-[1/1.4] rounded-[16px] overflow-hidden"
            >
              <Image
                src={img}
                alt={`Student ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </div>

        {/* Header */}
        <h1 className="text-4xl text-center mb-10 md:text-6xl leading-[105%]">
          {siteHeaders?.lockDistractionsHeader ||
            "Lock away distractions. Unlock potential."}
        </h1>

        {/* Stat Cards */}
        <div
          ref={sectionRef}
          className="flex flex-row justify-center items-end gap-2 mt-20 mb-7"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              style={{ backgroundColor: stat.bgColor }}
              animate={{
                maxHeight: isInView ? "1000px" : "50px",
              }}
              transition={{
                duration: 3,
                ease: [0.4, 0, 0.2, 1],
              }}
              className={`overflow-hidden rounded-[15px] w-full md:w-[10rem] flex flex-col justify-between h-[400px] items-center text-center px-2 py-4`}
            >
              {/* Icon */}
              {typeof stat.icon === "string" ? (
                <img
                  style={{ opacity: !isInView ? 0 : 1, transition: "1s " }}
                  src={stat.icon}
                  alt={stat.mainStat}
                  className="w-16 h-16"
                />
              ) : (
                <Image
                  style={{ opacity: !isInView ? 0 : 1, transition: "1s " }}
                  src={stat.icon}
                  alt={stat.mainStat}
                  className="w-16 h-16"
                />
              )}

              <div className="flex flex-col">
                {/* Title Text */}
                <p className="text-sm leading-[120%] mb-4 text-white">
                  {stat.mainStat}
                </p>

                {/* Divider */}
                <div className="h-[1px] w-[90%] mx-auto bg-white/30 mb-4" />

                {/* Bottom Stats */}
                <div className="">
                  <div className="text-xl font-semibold">{stat.subStat}</div>
                  <p className="text-xs leading-[120%] bg-[#ffffff16] font-normal opacity-50">
                    {stat.subText}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Text */}
        <SlowCharacterReveal
          text={
            siteHeaders?.lockDistractionsSubheader ||
            "Locked phones help students focus,<br/> teachers engage, and classrooms <br/>become spaces for growth."
          }
          desktopText={
            siteHeaders?.lockDistractionsSubheader ||
            "Locked phones help students focus,<br/> teachers engage, and classrooms <br/>become spaces for growth."
          }
          className="text-lg md:text-2xl w-[35rem] mx-auto max-w-[90%] text-center font-medium leading-[105%]"
          highlightedColor="#ffffff"
          fadedColor="#333333"
        />
      </div>
    </section>
  );
};

export default LockDistractionsSection;
