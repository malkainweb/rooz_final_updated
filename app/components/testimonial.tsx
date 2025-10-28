"use client"; // Keep this for animations

import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TestimonialCard from "./cards/TestimonailCards";
import bg from "@/public/testimonials/bg.svg";
import Image from "next/image";
import Hls from "hls.js";
import { NeueMontreal } from "../util/font";
import { urlFor } from "@/app/sanity/lib/image";
import { SanitySiteHeaders, SanityTestimonial } from "../sanity/lib/types";

// Type Definitions
export interface Testimonial {
  text: string;
  author: string;
  role: string;
  avatar: string;
}

interface TestimonialsSectionProps {
  testimonials: SanityTestimonial[];
  siteHeaders?: SanitySiteHeaders; // ✅ Added the ?
}

const TestimonialsSection = ({
  testimonials: sanityTestimonials,
  siteHeaders,
}: TestimonialsSectionProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const [isAutoScrolling, setIsAutoScrolling] = useState<boolean>(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const autoScrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Transform Sanity data to component format
  const testimonials: Testimonial[] = sanityTestimonials.map((item) => ({
    text: item.text,
    author: item.author,
    role: item.role,
    avatar: item.avatar
      ? urlFor(item.avatar).width(150).height(150).url()
      : "https://i.pravatar.cc/150?img=1",
  }));
  const AUTO_SCROLL_RESUME_DELAY = 3000; // One constant for all

  // Scroll to specific index
  // Scroll to specific index (HORIZONTAL ONLY - Better control)
  const scrollToIndex = (index: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cards = container.querySelectorAll("[data-testimonial-card]");
      if (cards[index]) {
        const card = cards[index] as HTMLElement;
        const containerRect = container.getBoundingClientRect();
        const cardRect = card.getBoundingClientRect();

        const scrollLeft =
          container.scrollLeft +
          (cardRect.left - containerRect.left) -
          containerRect.width / 2 +
          cardRect.width / 2;

        container.scrollTo({
          left: scrollLeft,
          behavior: "smooth",
        });
      }
    }
  };

  // Handle manual scroll - pause auto-scroll
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      // Pause auto-scroll when user manually scrolls
      setIsAutoScrolling(false);

      // Clear existing timeout
      if (autoScrollTimeoutRef.current) {
        clearTimeout(autoScrollTimeoutRef.current);
      }

      // Resume auto-scroll after 5 seconds of no manual scrolling
      autoScrollTimeoutRef.current = setTimeout(() => {
        setIsAutoScrolling(true);
      }, AUTO_SCROLL_RESUME_DELAY);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      container.removeEventListener("scroll", handleScroll);
      if (autoScrollTimeoutRef.current) {
        clearTimeout(autoScrollTimeoutRef.current);
      }
    };
  }, []);

  // Auto-scroll effect - only runs when isAutoScrolling is true
  useEffect(() => {
    if (!isAutoScrolling) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        let nextIndex = prevIndex;

        if (direction === "forward") {
          nextIndex = prevIndex + 1;
          if (nextIndex >= testimonials.length - 1) {
            setDirection("backward");
            nextIndex = testimonials.length - 1;
          }
        } else {
          nextIndex = prevIndex - 1;
          if (nextIndex <= 0) {
            setDirection("forward");
            nextIndex = 0;
          }
        }

        scrollToIndex(nextIndex);
        return nextIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [direction, testimonials.length, isAutoScrolling]);

  const nextSlide = (): void => {
    setIsAutoScrolling(false); // Pause auto-scroll on button click
    const newIndex = (currentIndex + 1) % testimonials.length;
    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);

    // Resume after 5 seconds
    if (autoScrollTimeoutRef.current) {
      clearTimeout(autoScrollTimeoutRef.current);
    }
    autoScrollTimeoutRef.current = setTimeout(() => {
      setIsAutoScrolling(true);
    }, AUTO_SCROLL_RESUME_DELAY);
  };

  const prevSlide = (): void => {
    setIsAutoScrolling(false); // Pause auto-scroll on button click
    const newIndex =
      (currentIndex - 1 + testimonials.length) % testimonials.length;
    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);

    // Resume after 5 seconds
    if (autoScrollTimeoutRef.current) {
      clearTimeout(autoScrollTimeoutRef.current);
    }
    autoScrollTimeoutRef.current = setTimeout(() => {
      setIsAutoScrolling(true);
    }, AUTO_SCROLL_RESUME_DELAY);
  };
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // ✅ setup hls
  useEffect(() => {
    if (videoRef.current) {
      if (Hls.isSupported()) {
        const hls = new Hls({ maxBufferLength: 30 });
        hls.loadSource("/testimonialVideo/index.m3u8");
        hls.attachMedia(videoRef.current);
        return () => hls.destroy();
      } else if (
        videoRef.current.canPlayType("application/vnd.apple.mpegurl")
      ) {
        videoRef.current.src = "/testimonialVideo/index.m3u8";
      }
    }
  }, []);

  return (
    <div
      id="testimonials"
      className={` font-medium   md:w-[200rem] max-w-full mx-auto overflow-clip  w-full flex flex-col relative  ${NeueMontreal.className}`}
    >
      <div className="w-full h-[100vh] sticky -top-20 left-0 ">
        <h2 className=" absolute top-[50%] md:w-[35rem] left-[50%] translate-y-[-50%] text-center translate-x-[-50%] md:text-7xl text-5xl z-[10] leading-[100%]  w-full">
          {siteHeaders?.testimonialsVideoHeader}
        </h2>
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full brightness-75 h-full object-cover"
        />
      </div>
      <section className="relative w-full py-24 bg-[#1F1F1F]">
        <div className="mx-auto flex flex-col md:w-[200rem] w-full max-w-full">
          <Image
            src={bg}
            alt="background"
            className="w-full h-auto   absolute top-[-10%] 2xl:top-[-80%] md:top-[-29%] left-0"
          />
          <h2 className="text-5xl z-[100] md:text-6xl  text-center mb-16">
            {siteHeaders?.testimonialsHeader}
          </h2>

          <div className="relative w-full mx-auto">
            {/* Testimonial Cards Container */}
            <div
              ref={scrollContainerRef}
              className="flex overflow-x-auto overflow-y-auto snap-mandatory snap-x gap-4 lg:gap-[2%] hide-scrollbar py-8"
            >
              <div className="w-[20%] shrink-0"></div>
              {testimonials.map((data, position) => (
                <div
                  key={position}
                  data-testimonial-card
                  className={`transition-all snap-center  shrink-0 max-w-[40rem] lg:w-[27%] w-[79vw] md:w-[25rem] duration-500 flex ${
                    position % 2 == 0
                      ? " translate-y-[2%] md:translate-y-[5%]"
                      : " translate-y-[-2%] md:translate-y-[-5%]"
                  }`}
                >
                  <TestimonialCard
                    testimonial={data}
                    isCenter={position === currentIndex}
                  />
                </div>
              ))}
              <div className="w-[20%] shrink-0"></div>
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center  w-full  justify-center gap-4 mt-8">
              <button
                onClick={prevSlide}
                className="w-12 h-12  rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center hover:bg-zinc-700 hover:border-pink-500 transition-all group"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-6 h-6 text-gray-400 group-hover:text-pink-500" />
              </button>

              <button
                onClick={nextSlide}
                className="w-12 h-12 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center hover:bg-zinc-700 hover:border-pink-500 transition-all group"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-pink-500" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TestimonialsSection;
