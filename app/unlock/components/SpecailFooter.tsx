"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import bg from "@/public/testimonials/bg.svg";
import logo from "@/public/logo.svg";
import teddy from "@/public/Teddy.svg";

import { Instagram, Linkedin } from "lucide-react";

import Image from "next/image";
import { NeueMontreal } from "../../util/font";
import Link from "next/link";
import { SanitySiteHeaders } from "@/app/sanity/lib/types";
import { IframeModal } from "@/app/components/iframe-modal";

interface FooterProps {
  siteHeaders?: SanitySiteHeaders;
}

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
const Footer = ({ siteHeaders }: FooterProps) => {
  //   const containerRef = useRef<HTMLDivElement>(null);
  //   const footerContainer = useRef<HTMLDivElement>(null);

  //   const { scrollYProgress } = useScroll({
  //     target: containerRef,
  //     offset: ["start start", "1.5 end"],
  //   });

  //   const { scrollYProgress: mobileProgress } = useScroll({
  //     target: footerContainer,
  //     offset: ["start start", "0.6 end"],
  //   });

  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    checkIsDesktop();
    window.addEventListener("resize", checkIsDesktop);
    return () => window.removeEventListener("resize", checkIsDesktop);
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        className={`w-full overflow-clip   relative justify-between flex flex-col  md:w-[200rem] max-w-full mx-auto font-medium md:pt-0 pt-[30vw]  md:min-h-[150vh] ${NeueMontreal.className}`}
      >
        <a
          href="https://www.malkain.com"
          className={`hover:text-white absolute bottom-5 z-[1000] right-[50%] md:translate-x-0 translate-x-[50%] md:right-5 font-medium  underline underline-offset-4  capitalize text-xs md:text-sm text-white/50 `}
        >
          Designed and developed by Malkain
        </a>
        <iframe
          src="https://cal.com/myrooz"
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
        <div className="max-w-3xl mx-auto mb-40 md:mb-0 text-center flex flex-col items-center">
          {/* Kangaroo Image */}
          <div className="">
            <Image src={teddy} alt="ROOZ Kangaroo" className="w-44 h-auto" />
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-6xl font-medium mb-4">
            Simple. Fast. Easy.
          </h2>

          {/* Subtext */}
          <p className="text-white/60 text-balance leading-[120%] text-base font-medium  md:text-lg mb-6 max-w-xl">
            ROOZ keeps the process simple — no phone bans, no confiscation, no
            conflict.
          </p>

          {/* CTA Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-pink-500 cursor-pointer to-[#FF004C] px-10 py-4 rounded-full text-white text-base md:text-lg font-medium hover:from-pink-600 hover:to-pink-700 transition-all transform hover:scale-105"
          >
            GET IN TOUCH
          </button>
        </div>

        <div className="w-full md:bg-transparent  bg-[#1F1F1F] z-[100]  flex relative py-14 ">
          {/* <motion.div className="w-[70%]  absolute  mx-auto md:hidden left-[50%] translate-x-[-50%]">
            <Image src={teddy} alt="background" className=" h-auto w-full " />
          </motion.div> */}

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

            <div className="flex  text-base mt-10 md:mt-16 gap-2 flex-col">
              {/* Email Link */}
              <a
                href="mailto:hello@myrooz.com"
                className="text-white  hover:text-pink-500 transition-colors underline"
              >
                <i className=" bi bi-envelope-fill mr-2"></i>
                hello@myrooz.com
              </a>

              {/* Copyright */}
              <p className="text-white">
                <i className="bi bi-geo-alt mr-2"></i>
                200 South Andrews Ave, Suite 504
                <br />
                Fort Lauderdale, FL 33301
              </p>

              <a
                href="tel:+19548001118"
                className="text-white underline underline-offset-4 "
              >
                <i className=" bi bi-telephone mr-2"></i>
                +1 (954) 800-1118
              </a>

              {/* Social Media Icons */}
              <div className="flex mt-3 items-center justify-center gap-4">
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
