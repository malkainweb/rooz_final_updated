import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TestimonialCard from "./cards/TestimonailCards";
import bg from "@/public/testimonials/bg.svg";
import Image from "next/image";
import Hls from "hls.js";
import { NeueMontreal } from "../util/font";

// Type Definitions
export interface Testimonial {
  text: string;
  author: string;
  role: string;
  avatar: string;
}

// Testimonials Section Component
const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const [isAutoScrolling, setIsAutoScrolling] = useState<boolean>(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const autoScrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const testimonials: Testimonial[] = [
    {
      text: "Since our district started using ROOZ, the change in my son has been nothing short of incredible. His grades have gone up two full letters in just one semester and for the first time he is elated to show me his test scores but what surprised me even more is the shift at home- he's more focused, less anxious, and actually enjoys reading again. ROOZ helped create boundaries without battles. As a parent, it's been a game changer for our family dynamic and his confidence. I never thought I'd see him excited about homework, but here we are! The personalized learning approach has made all the difference in keeping him engaged and motivated.",
      author: "Emily R.",
      role: "Mother of a 7th grader",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    {
      text: "ROOZ has transformed how we approach student engagement. The results speak for themselves - improved attendance and better academic performance across the board. Teachers are excited, parents are thrilled, and most importantly, our students are thriving in ways we never thought possible. We've seen a 35% increase in homework completion rates and students are actually asking for more challenging material. The analytics dashboard helps us identify struggling students early and provide targeted support before they fall behind.",
      author: "Michael T.",
      role: "Principal, Lincoln Elementary",
      avatar: "https://i.pravatar.cc/150?img=12",
    },
    {
      text: "As an educator for 15 years, I've never seen a tool that connects with students like ROOZ does. It's intuitive, effective, and truly makes a difference. My students are more engaged, more confident, and more excited about learning than ever before. The adaptive learning technology meets each student where they are and challenges them appropriately. I've watched shy students become classroom leaders and struggling learners develop genuine confidence in their abilities. ROOZ has revolutionized my teaching approach.",
      author: "Sarah J.",
      role: "Teacher, Riverside School",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
    {
      text: "The impact ROOZ has had on our son's learning journey is remarkable. Not only have his grades improved, but his attitude toward school has completely changed. He's become more independent, more curious, and genuinely enjoys tackling challenging subjects. We used to battle over homework every night, but now he voluntarily logs in to complete assignments. The gamification elements keep him motivated without feeling overwhelming. As parents, we finally feel like we have visibility into his progress and can support him effectively.",
      author: "David L.",
      role: "Father of a 5th grader",
      avatar: "https://i.pravatar.cc/150?img=8",
    },
    {
      text: "Implementing ROOZ across our district was one of the best decisions we've made. The platform's ability to track individual student progress while providing district-wide analytics has been invaluable. We've seen measurable improvements in standardized test scores and student engagement metrics. Teachers report spending less time on administrative tasks and more time on actual instruction. The parent communication features have strengthened our home-school connection significantly. ROOZ truly delivers on its promise of supporting every stakeholder in the education ecosystem.",
      author: "Dr. Patricia Chen",
      role: "District Superintendent",
      avatar: "https://i.pravatar.cc/150?img=9",
    },
    {
      text: "My daughter has always struggled with math anxiety, but ROOZ's approach has been transformative. The platform breaks down complex concepts into manageable steps and celebrates small victories along the way. She's gone from dreading math class to actually enjoying problem-solving. Her confidence has soared, and she's even considering pursuing STEM subjects in high school. The progress reports help me understand exactly what she's learning and how I can support her at home. ROOZ has given our family hope and my daughter a genuine love for learning.",
      author: "Jennifer M.",
      role: "Parent of a 6th grader",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
    {
      text: "Working with special education students requires tools that can truly differentiate instruction, and ROOZ exceeds expectations. The platform adapts to each student's unique learning style and pace, providing the individualized support that's often difficult to deliver in a traditional classroom setting. I've seen non-verbal students engage with content in ways I never thought possible. The accessibility features are thoughtfully designed, and the data tracking helps me demonstrate progress to parents and administrators. ROOZ has become an essential part of my instructional toolkit.",
      author: "Marcus Williams",
      role: "Special Education Teacher",
      avatar: "https://i.pravatar.cc/150?img=13",
    },
    {
      text: "As a school counselor, I've witnessed firsthand how ROOZ supports not just academic growth but also social-emotional development. The platform's emphasis on growth mindset and celebrating effort over perfection has helped reduce student anxiety around performance. Students feel safe to take risks and make mistakes, which is crucial for learning. The insights I gain from ROOZ help me identify students who might be struggling emotionally before it impacts their academics. It's more than just an educational tool—it's a comprehensive support system for the whole child.",
      author: "Amanda Rodriguez",
      role: "School Counselor",
      avatar: "https://i.pravatar.cc/150?img=16",
    },
  ];

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
        <h2 className=" absolute top-[50%] left-[50%] translate-y-[-50%] text-center translate-x-[-50%] md:text-7xl text-5xl z-[10] leading-[100%]  w-full">
          Built for focus. <br className=" " />
          Made for growth
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
            Testimonials
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
