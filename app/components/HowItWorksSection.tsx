"use client";

import React, { useEffect, useRef, useState } from "react";
import { NeueMontreal } from "../util/font";
import { useScroll, useTransform, motion } from "framer-motion";

import lockIt from "@/public/HowItWork/lockIt.webp";
import secureIt from "@/public/HowItWork/secureIt.webp";
import learnFreely from "@/public/HowItWork/learnfreely.webp";
import Image from "next/image";

interface HowItWorksSectionProps {
  siteHeaders?: SanitySiteHeaders;
}
import teddy from "@/public/Teddy.svg";
import Link from "next/link";
import { IframeModal } from "./iframe-modal";
import { SanityHowItWorksStep, SanitySiteHeaders } from "../sanity/lib/types";
import SlowCharacterReveal from "./SlowCharacterReveal";
import { urlFor } from "../sanity/lib/image";
// Update your interface
interface Step {
  number: number;
  title: string;
  description: string;
  imageUrl: any; // Change to any for StaticImageData
}

interface HowItWorksSectionProps {
  siteHeaders?: SanitySiteHeaders;
  steps: SanityHowItWorksStep[]; // ✅ Add this
}
const steps: Step[] = [
  {
    number: 1,
    title: "Case",
    description:
      "As you enter your building, your phone will be placed in a Rooz case",
    imageUrl: lockIt,
  },
  {
    number: 2,
    title: "Lock",
    description:
      "Once inside the case will lock. You’ll keep your phone through the duration of the day",
    imageUrl: secureIt,
  },
  {
    number: 3,
    title: "Unlock ",
    description:
      "To use your phone, tap it on  any unlocking base in the designated station",
    imageUrl: learnFreely,
  },
];

const HowItWorksSection = ({ siteHeaders, steps }: HowItWorksSectionProps) => {
  // Transform Sanity steps to component format
  const transformedSteps: Step[] = steps.map((step) => ({
    number: step.number,
    title: step.title,
    description: step.description,
    imageUrl: step.image
      ? urlFor(step.image).width(800).height(600).url()
      : lockIt,
  }));
  const sectionRef = useRef<HTMLDivElement>(null);

  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    checkIsDesktop();
    window.addEventListener("resize", checkIsDesktop);
    return () => window.removeEventListener("resize", checkIsDesktop);
  }, []);

  // Track scroll progress of this section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["0.37 end", "end 0.8"], // Starts when section enters, ends when it leaves
  });

  // Transform scroll progress to height percentage (0% to 100%)
  const lineHeight = useTransform(scrollYProgress, [0, 0.85], ["10%", "100%"]);

  // Final bounce: translateY from 0 to 30px (only at the end)
  const teddyTranslateY = useTransform(
    scrollYProgress,
    [0.85, 1], // Starts bouncing at 85% progress
    [0, isDesktop ? 100 : 0]
  );

  // Final scale: scale from 1 to 1.2 (bounce effect)
  const teddyScale = useTransform(scrollYProgress, [0.85, 1], [1, 1.4]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section
      ref={sectionRef}
      id="how"
      className={`relative bg-black  text-white pb-32 pt-20 px-6 ${NeueMontreal.className}`}
    >
      <iframe
        src="https://cal.com/sarah-spirer-myrooz"
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          opacity: 0,
          pointerEvents: "none",
        }}
        allow="geolocation"
        aria-hidden="true"
      />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        {/* Header */}
        <h2 className="text-4xl md:text-6xl font-medium text-center mb-12 md:mb-20">
          {siteHeaders?.howItWorksHeader || "How it works"}
        </h2>
        {/* Steps */}
        <div className="relative flex flex-col items-center space-y-32 md:space-y-20">
          <div className="mb-[-100vh]  2xl:mb-[-80vh] pl-6 md:pl-0">
            {transformedSteps.map((step, index) => {
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={step.number}
                  className={`relative flex mb-5 md:mb-0 md:w-[53rem] 2xl:w-[100rem]  md:max-w-[95%] w-full flex-col md:flex-row items-center gap-8 md:gap-16 ${
                    !isLeft ? "md:justify-end" : "md:justify-start"
                  }`}
                >
                  {/* Content Side */}
                  <div className="md:w-[21rem] 2xl:w-[40rem] 2xl:max-w-[55%]  md:max-w-[45%] bg-[#1F1F1F] rounded-[24px] p-2">
                    <div className="w-full md:aspect-[1/1] aspect-[1/0.8] rounded-[18px] overflow-hidden">
                      {step.imageUrl && (
                        <Image
                          src={step.imageUrl}
                          alt={step.title}
                          unoptimized
                          width="0"
                          height="0"
                          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                        />
                      )}
                    </div>
                    <div className="flex pt-4 px-4 pb-5 font-medium gap-4 items-center w-full">
                      {/* Number Badge */}
                      <p className="text-7xl">{step.number}</p>

                      <div>
                        {/* Title */}
                        <h3 className="text-2xl md:text-3xl mb-3">
                          {step.title}
                        </h3>

                        {/* Description */}
                        <p className="text-base font-normal text-white/50 leading-[110%] md:mx-0">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Animated Progress Line */}
          <div className="sticky max-h-[calc(10% - 100px)] left-0 bottom-0 w-full pointer-events-none  transform   h-[100vh] flex">
            <div className="absolute top-0 left-0 md:left-1/2 md:-translate-x-1/2 h-full w-px bg-[#D9D9D9]/40"></div>
            <motion.div
              style={{ height: lineHeight }}
              className="absolute top-0 left-0 md:left-1/2 md:-translate-x-1/2 h-full w-px bg-white"
            />

            <motion.div
              className="bg-wite w-full flex md:justify-center z-[10]    md:m-0   -ml-10 items-end"
              style={{ height: lineHeight }}
            >
              <motion.div
                style={{
                  translateY: teddyTranslateY,
                  scale: isDesktop ? teddyScale : 1,
                }}
              >
                <Image
                  src={teddy}
                  alt="teddy"
                  className="md:w-[8rem] w-[5rem]  relative top-10 h-auto"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* CTA Section */}
        {/* CTA Section */}
        <div className="text-center mt-10 font-medium md:mt-40">
          <h3 className="text-3xl md:text-4xl mb-4">
            {siteHeaders?.howItWorksSubheader || "Simple. Fast. Easy."}
          </h3>

          <SlowCharacterReveal
            text={
              siteHeaders?.howItWorksDescription ||
              "ROOZ keeps the process simple — no phone collection, no chaos, just pure focus."
            }
            className="text-lg md:block hidden w-[23rem] mx-auto max-w-full leading-[120%]"
            highlightedColor="#ffffff"
            fadedColor="#333333"
          />
          <div className="mt-6">
            <button
              onClick={() => {
                setIsModalOpen(true);
              }}
              className="px-10 capitalize font-bold py-3 cursor-pointer bg-gradient-to-r from-pink-500 to-pink-600 rounded-full hover:from-pink-600 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg shadow-pink-500/50"
            >
              Get in touch
            </button>
          </div>
        </div>
      </div>

      {/* Render modal when open */}
      {isModalOpen && <IframeModal onClose={() => setIsModalOpen(false)} />}
    </section>
  );
};

export default HowItWorksSection;
