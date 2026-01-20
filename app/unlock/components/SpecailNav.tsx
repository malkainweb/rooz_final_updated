"use client";

import logo from "@/public/logo.svg";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { NeueMontreal } from "@/app/util/font";
import CodeModal from "./CodeModal";

const SpecailNav = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false); // Changed from IframeModal to CodeModal

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY || currentScrollY < 200) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash;
      if (hash) {
        const sectionId = hash.replace("#", "");
        const element = document.getElementById(sectionId);
        if (element) {
          const offset = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }
    };

    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);

    return () => window.removeEventListener("hashchange", scrollToHash);
  }, []);

  const navLinks = [];

  return (
    <>
      <nav
        className={`fixed w-[94%] md:w-[200rem] md:max-w-[90%] left-[50%] translate-x-[-50%] rounded-full z-[9999] bg-[#8D8D8D]/30 border-[#FFFFFF]/10 border backdrop-blur-md transition-all duration-1000 ${
          NeueMontreal.className
        } top-4`}
      >
        <div className="w-full mx-auto p-1.5 flex items-center justify-between">
          <Link href="/" className="pl-3 md:pl-5">
            <Image src={logo} alt="logo" className="w-[6rem] h-auto" />
          </Link>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r cursor-pointer from-pink-500 to-[#FF004C] px-6 py-3 rounded-full font-medium hover:from-pink-600 hover:to-pink-700 transition-all transform hover:scale-105"
          >
            Claim Gift
          </button>
        </div>
      </nav>

      {/* Code Modal */}
      {isModalOpen && (
        <CodeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
};

export default SpecailNav;
