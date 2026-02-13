"use client";

import { HelveticaNeue, NeueMontreal } from "@/app/util/font";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import play from "@/public/specail/play.svg";
import hero from "@/public/specail/hero.webp";
import Image from "next/image";
import Hls from "hls.js";
import { Volume2, VolumeX } from "lucide-react";
import SlowCharacterReveal from "@/app/components/SlowCharacterReveal";
import { IframeModal } from "@/app/components/iframe-modal";
import ActionCards from "./ActionCards";
import {
  SanityActionCard,
  SanityBookDemoSection,
  SanityEvent,
  SanityVideoScrollContent,
} from "@/app/sanity/lib/types";

const VideoScrollSection = ({
  events,
  actionCards,
  bookDemoSection,
  videoScrollContent,
}: {
  events: SanityEvent[];
  actionCards: SanityActionCard[];
  bookDemoSection: SanityBookDemoSection;
  videoScrollContent: SanityVideoScrollContent;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0%", "end 100%"],
  });

  // Transform values based on scroll
  const circleScale = useTransform(scrollYProgress, [0, 1], [100, 3200]);
  const [currentScale, setCurrentScale] = useState(100);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [canPlay, setCanPlay] = useState(false);

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

  // Add this new useEffect hook right after your existing useEffects (around line 80)

  // ✅ Pause video when container is out of view
  const isInView = useInView(containerRef, {
    amount: 0.1, // Trigger when 10% of element is visible
    margin: "0px",
  });

  // ✅ setup hls for DESKTOP
  useEffect(() => {
    if (videoRef.current) {
      if (Hls.isSupported()) {
        const hls = new Hls({ maxBufferLength: 30 });
        hls.loadSource("/des/index.m3u8");
        hls.attachMedia(videoRef.current);
        return () => hls.destroy();
      } else if (
        videoRef.current.canPlayType("application/vnd.apple.mpegurl")
      ) {
        videoRef.current.src = "/des/index.m3u8";
      }
    }
  }, []);

  // ✅ setup hls for MOBILE
  useEffect(() => {
    if (videoRefMobile.current) {
      if (Hls.isSupported()) {
        const hlsMobile = new Hls({ maxBufferLength: 30 });
        hlsMobile.loadSource("/mob/index.m3u8");
        hlsMobile.attachMedia(videoRefMobile.current);
        return () => hlsMobile.destroy();
      } else if (
        videoRefMobile.current.canPlayType("application/vnd.apple.mpegurl")
      ) {
        videoRefMobile.current.src = "/mob/index.m3u8";
      }
    }
  }, []);

  // Add this state at the top with your other states
  const [isMobile, setIsMobile] = useState(false);

  // Add this useEffect to detect screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Handle play button click - UPDATED
  // Handle play button click - UPDATED
  const handlePlay = () => {
    if (!canPlay) return; // Don't play if not allowed

    if (isMobile && videoRefMobile.current) {
      videoRefMobile.current.play();
    } else if (!isMobile && videoRef.current) {
      videoRef.current.play();
    }
    setIsPlaying(true);
  };

  const [isPaused, setIsPaused] = useState(false);

  // Handle pause - UPDATED
  const togglePlayPause = () => {
    if (isPaused) {
      if (isMobile) {
        videoRefMobile.current?.play();
      } else {
        videoRef.current?.play();
      }
      setIsPaused(false);
    } else {
      if (isMobile) {
        videoRefMobile.current?.pause();
      } else {
        videoRef.current?.pause();
      }
      setIsPaused(true);
    }
  };

  // Update pause on scale - UPDATED
  // Update pause on scale - UPDATED
  useMotionValueEvent(circleScale, "change", (latest) => {
    setCurrentScale(latest);

    // Enable play button when scale is large enough
    if (latest >= 500) {
      setCanPlay(true);
    } else {
      setCanPlay(false);
    }

    if (latest < 500 && isPlaying) {
      if (isMobile) {
        videoRefMobile.current?.pause();
      } else {
        videoRef.current?.pause();
      }
      setIsPlaying(false);
    }
  });
  // Also update the useInView effect - UPDATED
  useEffect(() => {
    if (!isInView && isPlaying) {
      if (isMobile) {
        videoRefMobile.current?.pause();
      } else {
        videoRef.current?.pause();
      }
      setIsPlaying(false);
      setIsPaused(false);
    }
  }, [isInView, isPlaying, isMobile]);
  const [showIframeModal, setShowIframeModal] = useState(false);
  return (
    <>
      {showIframeModal && (
        <IframeModal onClose={() => setShowIframeModal(false)} />
      )}
      <div className=" flex flex-col md:px-4 ">
        <div className="w-full min-h-[80vh]  mx-auto max-w-4xl sticky  top-[13vh] md:top-[10vh] bg-black flex items-center  ">
          <div className="flex flex-col-reverse  w-full md:flex-row   items-center gap-6 md:gap-16 max-w-6xl">
            {/* Phone Pouch Image */}
            <div className="relative  w-full ">
              <Image
                src={hero}
                alt="ROOZ Phone Pouch"
                className="w-full  h-full max-h-[60vh] md:max-h-[90vh] object-contain drop-shadow-2xl"
              />
            </div>

            {/* Text Card */}
            <div className="bg-[#1C1C1C]  text-center rounded-[45px] md:px-16 px-10 py-10">
              <p className="text-sm font-bold uppercase tracking-widest text-white/50 mb-3">
                {videoScrollContent?.heroLabel || "ROOZ"}
              </p>
              <h2
                className={`${HelveticaNeue.className} text-4xl md:text-5xl text-center font-normal max-w-xl text-white  leading-[100%]`}
              >
                {videoScrollContent?.heroHeading.split("\\n").map((line, i) => (
                  <span key={i}>
                    {line}
                    {i <
                      videoScrollContent.heroHeading.split("\\n").length -
                        1 && <br />}
                  </span>
                )) || (
                  <>
                    This Rooz is <br className="md:hidden" />
                    locked on purpose
                  </>
                )}
              </h2>
            </div>
          </div>
        </div>
        <div className="hidden md:flex justify-center relative z-20 -mt-10">
          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex flex-col items-center gap-2 cursor-pointer"
            onClick={() => {
              window.scrollTo({
                top: window.innerHeight,
                behavior: "smooth",
              });
            }}
          >
            <span className="text-white/60 text-sm uppercase font-medium tracking-wider">
              Scroll
            </span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-60"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </motion.div>
        </div>
        <section
          className="bg-linear-to-b flex flex-col pt-20
       relative to-black via-10% via-black"
        >
          <div className="w-full h-[20%] blur-3xl  z-[2]   bg-black absolute top-0 left-0"></div>

          <div
            className={`text-center  z-[10] font-medium md:mt-40 ${NeueMontreal.className}`}
          >
            <h3
              className={`text-3xl font-medium md:text-5xl mb-4 ${HelveticaNeue.className}`}
            >
              {bookDemoSection.heading.split("\\n").map((line, i) => (
                <span key={i}>
                  {line}
                  {i < bookDemoSection.heading.split("\\n").length - 1 && (
                    <br />
                  )}
                </span>
              ))}
            </h3>

            <p
              className={`text-xl w-[17rem] font-medium mx-auto max-w-full leading-[120%]`}
            >
              {bookDemoSection.description}
            </p>

            <div className="mt-6">
              <button
                onClick={() => {
                  setShowIframeModal(true);
                }}
                className="px-10 capitalize font-bold py-3 cursor-pointer bg-gradient-to-r from-pink-500 to-pink-600 rounded-full hover:from-pink-600 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg shadow-pink-500/50"
              >
                {bookDemoSection.buttonText}
              </button>
            </div>
          </div>
          <ActionCards events={events} actionCards={actionCards} />

          <div
            ref={containerRef}
            className={`w-full  relative z-[10] h-[200vh]   text-white pb-30 md:pb-40 ${NeueMontreal.className}`}
          >
            {/* Video Container */}
            <div className="flex justify-center z-[10]  items-center sticky top-0 h-screen">
              <div className="relative w-full z-[10] h-screen">
                <div
                  className={`w-full absolute text-center left-1/2 -translate-x-1/2 md:translate-y-[-10%] translate-y-[-10%] top-[28%] z-[10] text-3xl md:text-5xl ${HelveticaNeue.className}`}
                >
                  {videoScrollContent?.videoHeading
                    .split("\\n")
                    .map((line, i) => (
                      <span key={i}>
                        {line}
                        {i <
                          videoScrollContent.videoHeading.split("\\n").length -
                            1 && <br />}
                      </span>
                    )) || (
                    <>
                      Watch a quick tutorial <br /> on how to use rooz
                    </>
                  )}
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
                    <button
                      disabled={!canPlay}
                      onClick={handlePlay}
                      className="cursor-pointer"
                    >
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
                    <button
                      disabled={!canPlay}
                      onClick={handlePlay}
                      className="cursor-pointer"
                    >
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
          </div>
        </section>
      </div>
    </>
  );
};

export default VideoScrollSection;
