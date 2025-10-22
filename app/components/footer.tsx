"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import bg from "@/public/testimonials/bg.svg";
import logo from "@/public/logo.svg";
import teddy from "@/public/Teddy.svg";

import { Instagram, Linkedin } from "lucide-react";

import Image from "next/image";
import { NeueMontreal } from "../util/font";
import Link from "next/link";
import { IframeModal } from "./iframe-modal";

// Social media links data
const socialLinks = [
  {
    name: "Instagram",
    url: "https://instagram.com/myroozpouch",
    icon: Instagram,
    ariaLabel: "Follow us on Instagram",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/company/myrooz/",
    icon: Linkedin,
    ariaLabel: "Follow us on LinkedIn",
  },
];
const Footer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const footerContainer = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "1.5 end"],
  });

  const { scrollYProgress: mobileProgress } = useScroll({
    target: footerContainer,
    offset: ["start start", "0.6 end"],
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

  // Transform values based on scroll progress (0 to 1)

  const translateX = useTransform(scrollYProgress, [0, 0.4], ["50%", "0%"]);
  const translateY = useTransform(
    scrollYProgress,
    [0.47, 0.7, 1],
    ["0%", "-30%", "10%"]
  );
  const scale = useTransform(scrollYProgress, [0.57, 1], [1, 4]);
  const opacity = useTransform(scrollYProgress, [0.4, 0.41], [0, 1]);
  const opacity2 = useTransform(scrollYProgress, [0.4, 0.41], [1, 0]);

  const MobileScale = useTransform(mobileProgress, [0, 1], [1, 0.5]);
  const MobileTop = useTransform(mobileProgress, [0, 1], ["-70%", "-210%"]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        ref={footerContainer}
        className={`w-full overflow-clip   relative justify-between flex flex-col  md:w-[200rem] max-w-full mx-auto font-medium md:pt-0 pt-[30vw]  md:min-h-[150vh] ${NeueMontreal.className}`}
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
        <div className=" md:flex   hidden justify-center items-center top-0 h-[100vh] sticky w-full">
          <motion.div
            className=" w-full relative gap-7  items-center flex-col  flex "
            style={{
              transition: "0.5s ease-out",
            }}
          >
            <motion.div
              className="absolute  left-[50%] translate-x-[-50%] top-[-20%]"
              style={{ translateY, opacity, scale }}
            >
              <Image
                src={teddy}
                alt="background"
                className="w-[7rem]  h-auto "
              />
            </motion.div>

            <p className="text-5xl invisible  md:text-[clamp(5rem,9vw,10rem)]  z-[10] mx-auto whitespace-nowrap">
              Ready to get started?
            </p>

            <button
              onClick={() => {
                setIsModalOpen(true);
              }}
              className="bg-gradient-to-r z-[10] invisible  w-fit cursor-pointer from-pink-500 to-[#FF004C] px-6 py-3 rounded-full font-medium hover:from-pink-600 hover:to-pink-700 transition-all transform hover:scale-105"
            >
              GET IN TOUCH
            </button>
          </motion.div>
        </div>
        <div
          ref={containerRef}
          className="h-[150vh] mt-[-100vh]  relative max-w-[95%] mx-auto md:flex-row flex-col hidden md:flex"
        >
          <motion.div
            style={
              isDesktop
                ? {
                    translateX,
                  }
                : {}
            }
            className="w-full   z-[100] h-[100vh] items-center  sticky top-0 md:mt-0 mt-[-10vh] flex justify-center "
          >
            <motion.div
              className=" w-full relative gap-7  items-center flex-col  flex "
              style={{
                transition: "0.5s ease-out",
              }}
            >
              <motion.div
                className="absolute  left-[50%] translate-x-[-50%] top-[-20%]"
                style={{ opacity: opacity2 }}
              >
                <Image
                  src={teddy}
                  alt="background"
                  className="w-[7rem]  h-auto "
                />
              </motion.div>

              <p className="text-5xl md:text-[clamp(5rem,9vw,10rem)]  z-[10] mx-auto whitespace-nowrap">
                Ready to get started?
              </p>

              <button
                onClick={() => {
                  setIsModalOpen(true);
                }}
                className="bg-gradient-to-r z-[10] w-fit cursor-pointer from-pink-500 to-[#FF004C] px-6 py-3 rounded-full font-medium hover:from-pink-600 hover:to-pink-700 transition-all transform hover:scale-105"
              >
                GET IN TOUCH
              </button>
            </motion.div>
          </motion.div>
        </div>

        <div className="  md:hidden flex  z-[1000] flex-col items-center gap-4 mb-[60%]">
          <p className="text-[14vw] leading-[105%] text-center   z-[10] mx-auto">
            Ready to <br />
            get started?
          </p>

          <button
            onClick={() => {
              setIsModalOpen(true);
            }}
            className="bg-gradient-to-r z-[10]  w-fit cursor-pointer from-pink-500 to-[#FF004C] px-6 py-3 rounded-full font-medium hover:from-pink-600 hover:to-pink-700 transition-all transform hover:scale-105"
          >
            GET IN TOUCH
          </button>
        </div>
        <div className="w-full md:bg-transparent  bg-[#1F1F1F] md:mt-[60vh] z-[100]  flex relative md:py-20 py-14 ">
          <motion.div
            style={{
              top: MobileTop,
              scale: MobileScale,
              transition: "0.4s ease-out",
            }}
            className="w-[70%]  absolute  mx-auto md:hidden left-[50%] translate-x-[-50%]"
          >
            <Image src={teddy} alt="background" className=" h-auto w-full " />
          </motion.div>

          <div className=" w-full absolute top-[-25%] md:top-[-60%] ">
            <Image src={bg} alt="background" className="w-full h-auto " />
          </div>
          <div className="max-w-7xl  z-[10] mx-auto flex flex-col items-center justify-center text-center md:space-y-3">
            {/* Logo */}
            <div className="flex justify-center">
              <Image
                src={logo}
                alt="ROOZ Logo"
                className="w-32 md:w-40  h-auto"
              />
            </div>

            {/* Tagline */}
            <h2 className="text-sm font-medium">
              Secure focus. Stronger learning
            </h2>

            <div className="flex  mt-10 md:mt-16 gap-3 flex-col">
              {/* Email Link */}
              <a
                href="mailto:hello@myrooz.com"
                className="text-white text-lg hover:text-pink-500 transition-colors underline"
              >
                hello@myrooz.com
              </a>

              {/* Copyright */}
              <p className="text-white text-lg">@Rooz 2025</p>

              {/* Social Media Icons */}
              <div className="flex items-center justify-center gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.ariaLabel}
                    className="hover:opacity-80 transition-opacity"
                  >
                    <social.icon className="w-6 h-6 text-white" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Render modal when open */}
        {isModalOpen && <IframeModal onClose={() => setIsModalOpen(false)} />}
      </div>
    </>
  );
};

export default Footer;
