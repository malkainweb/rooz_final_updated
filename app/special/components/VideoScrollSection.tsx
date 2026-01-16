"use client";

import { HelveticaNeue, NeueMontreal } from "@/app/util/font";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import play from "@/public/specail/play.svg";
import hero from "@/public/specail/hero.webp";
import Image from "next/image";
import Hls from "hls.js";
import { Volume2, VolumeX } from "lucide-react";

const VideoScrollSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 20%", "end 100%"],
  });

  // Transform values based on scroll
  const circleScale = useTransform(scrollYProgress, [0, 1], [100, 3200]);
  const [currentScale, setCurrentScale] = useState(100);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useMotionValueEvent(circleScale, "change", (latest) => {
    setCurrentScale(latest);

    // ✅ Pause video and reset when circle scales back down
    if (latest < 500 && isPlaying) {
      if (videoRef.current) {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  });

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoRefMobile = useRef<HTMLVideoElement | null>(null);

  // ✅ setup hls for DESKTOP
  useEffect(() => {
    if (videoRef.current) {
      if (Hls.isSupported()) {
        const hls = new Hls({ maxBufferLength: 30 });
        hls.loadSource("/specail/final-hls/index.m3u8");
        hls.attachMedia(videoRef.current);
        return () => hls.destroy();
      } else if (
        videoRef.current.canPlayType("application/vnd.apple.mpegurl")
      ) {
        videoRef.current.src = "/specail/final-hls/index.m3u8";
      }
    }
  }, []);

  // ✅ setup hls for MOBILE
  useEffect(() => {
    if (videoRefMobile.current) {
      if (Hls.isSupported()) {
        const hlsMobile = new Hls({ maxBufferLength: 30 });
        hlsMobile.loadSource("/specail/final-hls/index.m3u8");
        hlsMobile.attachMedia(videoRefMobile.current);
        return () => hlsMobile.destroy();
      } else if (
        videoRefMobile.current.canPlayType("application/vnd.apple.mpegurl")
      ) {
        videoRefMobile.current.src = "/specail/final-hls/index.m3u8";
      }
    }
  }, []);

  // Handle play button click - UPDATE THIS
  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
    if (videoRefMobile.current) {
      videoRefMobile.current.play();
    }
    setIsPlaying(true);
  };

  const [isPaused, setIsPaused] = useState(false);
  // Handle pause - UPDATE THIS
  const togglePlayPause = () => {
    if (isPaused) {
      videoRef.current?.play();
      videoRefMobile.current?.play();
      setIsPaused(false);
    } else {
      videoRef.current?.pause();
      videoRefMobile.current?.pause();
      setIsPaused(true);
    }
  };

  // Update pause on scale - UPDATE THIS
  useMotionValueEvent(circleScale, "change", (latest) => {
    setCurrentScale(latest);

    if (latest < 500 && isPlaying) {
      videoRef.current?.pause();
      videoRefMobile.current?.pause();
      setIsPlaying(false);
    }
  });
  return (
    <div className=" flex flex-col md:px-4 ">
      <div className="w-full min-h-[80vh]  mx-auto max-w-4xl sticky  top-[10vh] md:top-[10vh] bg-black flex items-center  ">
        <div className="flex flex-col-reverse w-full md:flex-row   items-center gap-6 md:gap-16 max-w-6xl">
          {/* Phone Pouch Image */}
          <div className="relative w-full ">
            <Image
              src={hero}
              alt="ROOZ Phone Pouch"
              className="w-full  h-full max-h-[60vh] md:max-h-[90vh] object-contain drop-shadow-2xl"
            />
          </div>

          {/* Text Card */}
          <div className="bg-[#1C1C1C]  text-center  rounded-[45px] md:px-16  px-10 py-10">
            <p className="text-sm font-bold uppercase tracking-widest text-white/50 mb-3">
              ROOZ
            </p>
            <h2
              className={` ${HelveticaNeue.className} text-4xl md:text-5xl  text-center font-normal max-w-xl text-white leading-[100%]`}
            >
              This Rooz is <br className="md:hidden" />
              locked on purpose
            </h2>
          </div>
        </div>
      </div>
      <section
        ref={containerRef}
        className={`w-full  relative z-[10] h-[200vh] bg-linear-to-b to-black via-10% via-black  text-white pb-30 md:pb-40 ${NeueMontreal.className}`}
      >
        <div className="w-full h-[20%] blur-3xl  z-[2]   bg-black absolute top-0 left-0"></div>
        {/* Video Container */}
        <div className="flex justify-center z-[10]  items-center sticky top-0 h-screen">
          <div className="relative w-full z-[10] h-screen">
            <div
              className={`  w-full absolute text-center left-1/2 -translate-x-1/2 md:translate-y-[-10%] translate-y-[-10%] top-[28%] z-[10] text-3xl  md:text-5xl ${HelveticaNeue.className}`}
            >
              {" "}
              What is Rooz you <br /> ask?
            </div>
            {/* Image with radial mask DESKTOP SECTION */}
            {/* Image with radial mask DESKTOP SECTION */}
            {/* Image with radial mask DESKTOP SECTION */}
            {/* Image with radial mask DESKTOP SECTION */}
            {/* Image with radial mask DESKTOP SECTION */}
            {/* Image with radial mask DESKTOP SECTION */}
            {/* Image with radial mask DESKTOP SECTION */}
            <motion.div
              className="absolute    inset-0 z-10"
              style={{
                maskImage:
                  "radial-gradient(circle at center, black 6%, transparent 6%)",
                WebkitMaskImage:
                  "radial-gradient(circle at center, black 6%, transparent 6%)",
                maskSize: `${currentScale}%`,
                WebkitMaskSize: `${currentScale}%`,
                maskRepeat: "no-repeat",
                WebkitMaskRepeat: "no-repeat",
                maskPosition: "center",
                WebkitMaskPosition: "center",
              }}
            >
              {/* Play Button - Only show when not playing */}
              {!isPlaying && (
                <button onClick={handlePlay} className="cursor-pointer">
                  <Image
                    src={play}
                    alt="Play Icon"
                    className="absolute z-20 w-[12%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-auto"
                  />
                </button>
              )}

              {isPlaying && (
                <button
                  onClick={togglePlayPause}
                  className="absolute z-20 top-[50%] translate-y-[-50%] right-8 w-16 h-16 rounded-full bg-black backdrop-blur-sm border border-white/30 flex items-center justify-center hover:bg-white/30 transition-all"
                >
                  {isPaused ? (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="white"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  ) : (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="white"
                    >
                      <rect x="6" y="4" width="4" height="16" />
                      <rect x="14" y="4" width="4" height="16" />
                    </svg>
                  )}
                </button>
              )}

              <video
                ref={videoRef}
                loop
                playsInline
                className="w-full  aspect-video brightness-75 "
              />
            </motion.div>

            {/* Image with radial mask MOBILE SECTION */}
            {/* Image with radial mask MOBILE SECTION */}
            {/* Image with radial mask MOBILE SECTION */}
            {/* Image with radial mask MOBILE SECTION */}
            {/* Image with radial mask MOBILE SECTION */}
            {/* Image with radial mask MOBILE SECTION */}
            <motion.div
              className="absolute md:hidden inset-0 z-10"
              style={{
                maskImage:
                  "radial-gradient(circle at center, black 9%, transparent 9%)",
                WebkitMaskImage:
                  "radial-gradient(circle at center, black 9%, transparent 9%)",
                maskSize: `${currentScale}%`,
                WebkitMaskSize: `${currentScale}%`,
                maskRepeat: "no-repeat",
                WebkitMaskRepeat: "no-repeat",
                maskPosition: "center",
                WebkitMaskPosition: "center",
              }}
            >
              {/* Play Button - Only show when not playing */}
              {!isPlaying && (
                <button onClick={handlePlay} className="cursor-pointer">
                  <Image
                    src={play}
                    alt="Play Icon"
                    className="absolute z-20 w-[40%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-auto"
                  />
                </button>
              )}

              {isPlaying && (
                <button
                  onClick={togglePlayPause}
                  className="absolute z-20 top-[50%] translate-y-[-50%] right-3 w-16 h-16 rounded-full bg-black backdrop-blur-sm border border-white/30 flex items-center justify-center hover:bg-white/30 transition-all"
                >
                  {isPaused ? (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="white"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  ) : (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="white"
                    >
                      <rect x="6" y="4" width="4" height="16" />
                      <rect x="14" y="4" width="4" height="16" />
                    </svg>
                  )}
                </button>
              )}

              <video
                ref={videoRefMobile}
                loop
                playsInline
                className="w-full h-full object-cover brightness-75 "
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VideoScrollSection;
