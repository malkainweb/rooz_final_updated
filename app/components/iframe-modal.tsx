"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { NeueMontreal } from "../util/font";

export function IframeModal({ onClose }: any) {
  const [startAnime, setstartAnime] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  useEffect(() => {
    setstartAnime(true);
  }, []);

  // Simulated progress animation
  useEffect(() => {
    if (!isLoading) return;

    const duration = 2500; // Total duration in ms
    const steps = 60; // Number of updates
    const increment = 100 / steps;
    const interval = duration / steps;

    let currentProgress = 0;
    const timer = setInterval(() => {
      currentProgress += increment;

      // Slow down near the end to wait for actual iframe
      if (currentProgress >= 90) {
        currentProgress = 90 + (currentProgress - 90) * 0.3;
      }

      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(timer);
      }

      setProgress(Math.min(currentProgress, 99)); // Cap at 99% until iframe loads
    }, interval);

    return () => clearInterval(timer);
  }, [isLoading]);

  const close = () => {
    setstartAnime(false);
    setTimeout(() => {
      onClose();
    }, 600);
  };

  const handleIframeLoad = () => {
    setProgress(100);
    setTimeout(() => {
      setIsLoading(false);
    }, 300); // Small delay to show 100% completion
  };

  return (
    <>
      <div
        style={{ transition: "0.7s ease" }}
        className={`fixed inset-0 z-[1000000] md:pb-0 flex justify-center items-end pb-[5%] md:items-center ${
          NeueMontreal.className
        } ${startAnime ? "backdrop-blur-2xl bg-white/30" : "bg-white-0"}`}
        onClick={close}
      >
        <div
          style={{ transition: "0.7s ease", opacity: startAnime ? 1 : 0 }}
          className={`w-[56rem] max-w-[95%] relative rounded-3xl bg-[black] shadow-2xl overflow-hidden ${
            startAnime ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={close}
            aria-label="Close"
            className="absolute top-4 right-4 z-10 h-8 w-8 p-1.5 flex items-center justify-center rounded-full bg-[white] text-[#8B724F] hover:text-white hover:bg-pink-100  cursor-pointer transition-colors"
          >
            <X stroke="black" />
          </button>

          {/* Loading Screen with Progress */}
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[black] z-[5] gap-6">
              <div className="flex flex-col items-center gap-4">
                {/* Animated Logo or Text */}
                <div className="text-2xl font-medium text-pink-300 ">
                  Loading your booking form..
                </div>

                {/* Progress Bar */}
                <div className="w-64 h-2 bg-[white] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-pink-500  transition-all duration-300 ease-out rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                {/* Percentage */}
                <div className="text-base text-[white] font-medium">
                  {Math.round(progress)}%
                </div>
              </div>
            </div>
          )}

          <div className="w-full h-[650px] max-h-[85vh]">
            <iframe
              src="https://cal.com/sarah-spirer-myrooz"
              style={{
                height: "100%",
                width: "100%",
                border: 0,
                display: "block",
                margin: "auto",
              }}
              allow="geolocation"
              title="Book Consultation"
              onLoad={handleIframeLoad}
            />
          </div>
        </div>
      </div>
    </>
  );
}
