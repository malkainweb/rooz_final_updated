"use client";

import React, { useState, useEffect } from "react";
import TestimonialsSection from "./components/testimonial";
import Nav from "./components/Nav";
import HowItWorksSection from "./components/HowItWorksSection";
import HomeUspAnimation from "./components/HomeUspAnimation";
import LockDistractionsSection from "./components/LockDistractionsSection";
import Hero from "./components/Hero";
import Footer from "./components/footer";

const RoozLanding: React.FC = () => {
  const [scrollY, setScrollY] = useState<number>(0);

  useEffect(() => {
    const handleScroll = (): void => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTestimonials = (): void => {
    const element = document.getElementById("testimonials");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative bg-black text-white overflow-clip  w-full">
      {/* Navigation */}
      <Nav />

      <Hero />
      <div className="h-[10rem]" />
      <HomeUspAnimation />
      <LockDistractionsSection />
      <HowItWorksSection />

      {/* Testimonials Section */}
      <TestimonialsSection />
      <Footer />
    </div>
  );
};

export default RoozLanding;
