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
import { SanityFooterContent } from "@/app/sanity/lib/types";
import { IframeModal } from "@/app/components/iframe-modal";

interface FooterProps {
  footerContent?: SanityFooterContent;
}

const Footer = ({ footerContent }: FooterProps) => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    checkIsDesktop();
    window.addEventListener("resize", checkIsDesktop);
    return () => window.removeEventListener("resize", checkIsDesktop);
  }, []);

  // Create social links from CMS data
  const socialLinks = footerContent
    ? [
        {
          name: "Instagram",
          url: footerContent.instagramUrl,
          icon: Instagram,
          ariaLabel: "Follow us on Instagram",
        },
        {
          name: "LinkedIn",
          url: footerContent.linkedinUrl,
          icon: Linkedin,
          ariaLabel: "Follow us on LinkedIn",
        },
      ]
    : [];

  return (
    <>
      <div
        className={`w-full overflow-clip relative justify-between flex flex-col md:w-[200rem] max-w-full mx-auto font-medium md:pt-0 pt-[30vw] md:min-h-[150vh] ${NeueMontreal.className}`}
      >
        <a
          href="https://www.malkain.com"
          className={`hover:text-white absolute bottom-5 z-[1000] right-[50%] md:translate-x-0 translate-x-[50%] md:right-5 font-medium underline underline-offset-4 capitalize text-xs md:text-sm text-white/50`}
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
            {footerContent?.ctaHeading || "Simple. Fast. Easy."}
          </h2>

          {/* Subtext */}
          <p className="text-white/60 text-balance leading-[120%] text-base font-medium md:text-lg mb-6 max-w-xl">
            {footerContent?.ctaDescription ||
              "ROOZ keeps the process simple — no phone bans, no confiscation, no conflict."}
          </p>

          {/* CTA Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-pink-500 cursor-pointer to-[#FF004C] px-10 py-4 rounded-full text-white text-base md:text-lg font-medium hover:from-pink-600 hover:to-pink-700 transition-all transform hover:scale-105"
          >
            {footerContent?.ctaButtonText || "GET IN TOUCH"}
          </button>
        </div>

        <div className="w-full md:bg-transparent bg-[#1F1F1F] z-[100] flex relative py-14">
          <div className="w-full absolute top-[-25%] md:top-[-60%]">
            <Image src={bg} alt="background" className="w-full h-auto" />
          </div>
          <div className="max-w-7xl z-[10] mx-auto flex flex-col items-center justify-center text-center md:space-y-3">
            {/* Logo */}
            <div className="flex justify-center">
              <Image
                src={logo}
                alt="ROOZ Logo"
                className="w-32 md:w-40 h-auto"
              />
            </div>

            {/* Tagline */}
            <h2 className="text-sm font-medium">
              {footerContent?.tagline || "Secure focus. Stronger learning"}
            </h2>

            <div className="flex text-base mt-10 md:mt-16 gap-2 flex-col">
              {/* Email Link */}
              <a
                href={`mailto:${footerContent?.email || "hello@myrooz.com"}`}
                className="text-white hover:text-pink-500 transition-colors underline"
              >
                <i className="bi bi-envelope-fill mr-2"></i>
                {footerContent?.email || "hello@myrooz.com"}
              </a>

              {/* Address */}
              <p className="text-white">
                <i className="bi bi-geo-alt mr-2"></i>
                {footerContent?.addressLine1 ||
                  "200 South Andrews Ave, Suite 504"}
                <br />
                {footerContent?.addressLine2 || "Fort Lauderdale, FL 33301"}
              </p>

              {/* Phone */}
              <a
                href={`tel:${footerContent?.phoneLink || "+19548001118"}`}
                className="text-white underline underline-offset-4"
              >
                <i className="bi bi-telephone mr-2"></i>
                {footerContent?.phone || "+1 (954) 800-1118"}
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
