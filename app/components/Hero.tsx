"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import pouchTop from "@/public/hero/pouchTop.webp";
import OnPhone from "@/public/hero/OnPhone.webp";
import OffPHone from "@/public/hero/OffPHone.webp";
import pouchBottom from "@/public/hero/pouchBottom.webp";
import Image from "next/image";
import { NeueMontreal } from "../util/font";
import SlowCharacterReveal from "./SlowCharacterReveal";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    checkIsDesktop();
    window.addEventListener("resize", checkIsDesktop);
    return () => window.removeEventListener("resize", checkIsDesktop);
  }, []);

  const arrVal = [0, 0.5];

  // Transform values based on scroll progress (0 to 1)
  const imageY = useTransform(
    scrollYProgress,
    [0, 0.6, 1],
    [0, -80, isDesktop ? 50 : 130]
  );
  const imageScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [isDesktop ? 1.08 : 1, 0.9, isDesktop ? 1.02 : 0.98]
  );
  const imageRotate = useTransform(scrollYProgress, [0, 0.4, 1], [-15, -8, 0]);
  const right = useTransform(scrollYProgress, arrVal, ["0%", "50%"]);
  const translateX = useTransform(scrollYProgress, arrVal, ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0.6, 0.8], [1, 0]);

  return (
    <>
      <div
        ref={containerRef}
        className={`w-full overflow-clip md:w-[200rem] max-w-full mx-auto font-medium md:pt-0 pt-[10rem] h-[250vh] ${NeueMontreal.className}`}
      >
        <div className="h-full relative max-w-[95%] mx-auto md:flex-row flex-col flex">
          <div className="w-full flex-col absolute items-center bottom-0 left-[50%] translate-x-[-50%] flex justify-center z-[100]">
            <Image
              src={pouchTop}
              alt="pouch top"
              className="md:w-[30%] w-[80%] md:translate-x-[-3%] translate-x-[-2%] translate-y-[10%] md:translate-y-[10%] h-auto"
            />
            <Image
              src={pouchBottom}
              alt="pouch bottom"
              className="md:w-[25%] w-[75%] opacity-0 h-auto"
            />
          </div>
          <div className="w-full flex-col absolute items-center bottom-0 left-[50%] translate-x-[-50%] flex justify-center z-[1000]">
            <Image
              src={pouchTop}
              alt="pouch top"
              className="md:w-[28%] w-[80%] opacity-0 h-auto"
            />
            <Image
              src={pouchBottom}
              alt="pouch bottom"
              className="md:w-[25%] w-[75%] h-auto"
            />
          </div>
          <div className="w-full flex-col gap-9 text-center md:text-start justify-center flex md:pl-[6%] md:h-[100vh]">
            <h1 className="md:text-7xl text-4xl">
              Unlock students <br />
              full potential.
            </h1>

            <div className="opacity-70 md:opacity-100">
              <SlowCharacterReveal
                text="At ROOZ, we unlock students' potential by  <br/> minimizing distractions. Our secure pouches  <br/> support phone bans, helping students focus  <br/>  and teachers teach uninterrupted."
                desktopText="At ROOZ, we unlock students' potential by minimizing <br/> distractions. Our secure pouches support phone bans, <br/> helping students focus and teachers teach uninterrupted."
                className="md:text-lg md:block hidden text-[4vw] md:text-white md:text-start text-center leading-[130%]"
                highlightedColor="#ffffff"
                fadedColor="#333333"
              />

              <p className="md:hidden">
                At ROOZ, we unlock students&apos; potential by <br /> minimizing
                distractions. Our secure pouches <br /> support phone bans,
                helping students focus <br /> and teachers teach uninterrupted.
              </p>
            </div>
          </div>
          <motion.div
            style={
              isDesktop
                ? {
                    right,
                    translateX,
                  }
                : {}
            }
            className="w-full z-[100] h-[100vh] items-center sticky top-0 md:mt-0 mt-[-10vh] flex justify-center"
          >
            <motion.div
              className="md:w-[44%] w-[65%] flex"
              style={{
                y: imageY,
                scale: imageScale,
                rotate: imageRotate,
                transition: "0.5s ease-out",
              }}
            >
              <motion.div
                style={{
                  opacity,
                  transition: "0.5s ease-out",
                }}
                className="w-full z-[10]"
              >
                <Image
                  src={OnPhone}
                  alt="Phone with ROOZ pouch"
                  className="w-full h-auto"
                />
              </motion.div>
              <motion.div className="w-full absolute top-0 left-0">
                <Image
                  src={OffPHone}
                  alt="Phone off in ROOZ pouch"
                  className="w-full h-auto"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Hero;
