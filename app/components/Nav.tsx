"use client";

import logo from "@/public/logo.svg";
import Image from "next/image";
import { useState, useEffect } from "react";
import { NeueMontreal } from "../util/font";
import Link from "next/link";
import { IframeModal } from "./iframe-modal";

const Nav = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show nav when scrolling up, hide when scrolling down
      if (currentScrollY < lastScrollY || currentScrollY < 200) {
        // Scrolling up or near top
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 200) {
        // Scrolling down and past 200px
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Handle hash navigation
  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash;
      if (hash) {
        const sectionId = hash.replace("#", "");
        const element = document.getElementById(sectionId);
        if (element) {
          const offset = 100; // Offset for fixed nav
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }
    };

    // Scroll on initial load if hash exists
    scrollToHash();

    // Listen for hash changes
    window.addEventListener("hashchange", scrollToHash);

    return () => window.removeEventListener("hashchange", scrollToHash);
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Hidden preload iframe */}
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
      <nav
        className={`fixed w-[94%] md:w-[200rem] md:max-w-[90%] left-[50%] translate-x-[-50%] rounded-full z-[9999] bg-[#8D8D8D]/30 border-[#FFFFFF]/10 border backdrop-blur-md transition-all duration-1000 ${
          NeueMontreal.className
        } ${isVisible ? "top-5" : "-top-24"}`}
      >
        <div className="w-full mx-auto p-1.5 flex items-center justify-between">
          <a href="#" className="pl-3 md:pl-5">
            <Image src={logo} alt="logo" className="w-[6rem] h-auto" />
          </a>
          <div className="hidden capitalize md:flex gap-8 text-lg">
            <a href="#why" className="hover:text-pink-500 transition-colors">
              Why choose us
            </a>
            <a href="#how" className="hover:text-pink-500 transition-colors">
              How it works
            </a>
            <a
              href="#testimonials"
              className="hover:text-pink-500 transition-colors"
            >
              Testimonials
            </a>
          </div>
          <button
            onClick={() => {
              setIsModalOpen(true);
            }}
            className="bg-gradient-to-r cursor-pointer from-pink-500 to-[#FF004C] px-6 py-3 rounded-full font-bold hover:from-pink-600 hover:to-pink-700 transition-all transform hover:scale-105"
          >
            GET IN TOUCH
          </button>
        </div>
      </nav>
      {/* Render modal when open */}
      {isModalOpen && <IframeModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default Nav;
