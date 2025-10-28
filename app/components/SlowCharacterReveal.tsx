"use client";
import React, { useRef, useMemo, useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

interface SlowCharacterRevealProps {
  text: string;
  className?: string;
  highlightedColor?: string;
  fadedColor?: string;
  desktopText?: string; // Optional separate text for desktop
}

const SlowCharacterReveal: React.FC<SlowCharacterRevealProps> = ({
  text,
  className = "",
  highlightedColor = "#E9F7FF",
  fadedColor = "#4A6170",
  desktopText,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [revealProgress, setRevealProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check if screen is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // Track scroll position relative to container
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.6", "start 0.5"],
  });

  // Update progress state when scroll changes
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setRevealProgress(latest);
  });

  // Calculate lines and words based on screen size
  const { lines, totalWords } = useMemo(() => {
    // Use desktopText for desktop if provided, otherwise use main text
    const textToUse = !isMobile && desktopText ? desktopText : text;

    // Split by line breaks
    const splitLines = textToUse.split(/<br\/?>/);

    // Split each line into words and count total words
    const linesWithWords = splitLines.map((line) => {
      // Split by spaces and filter out empty strings
      return line
        .trim()
        .split(/\s+/)
        .filter((word) => word.length > 0);
    });

    const totalWordCount = linesWithWords.reduce(
      (acc, lineWords) => acc + lineWords.length,
      0
    );

    return {
      lines: linesWithWords,
      totalWords: totalWordCount,
    };
  }, [text, desktopText, isMobile]);

  // Helper function to interpolate between colors
  const interpolateColor = (
    color1: string,
    color2: string,
    progress: number
  ) => {
    const clampedProgress = Math.max(0, Math.min(1, progress));

    // Handle both hex and rgb colors
    const getRGB = (color: string) => {
      if (color.startsWith("#")) {
        const hex = color.replace("#", "");
        return {
          r: parseInt(hex.substr(0, 2), 16),
          g: parseInt(hex.substr(2, 2), 16),
          b: parseInt(hex.substr(4, 2), 16),
        };
      }
      // If already rgb format, parse it
      const rgbMatch = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
      if (rgbMatch) {
        return {
          r: parseInt(rgbMatch[1]),
          g: parseInt(rgbMatch[2]),
          b: parseInt(rgbMatch[3]),
        };
      }
      return { r: 0, g: 0, b: 0 };
    };

    const rgb1 = getRGB(color1);
    const rgb2 = getRGB(color2);

    const r = Math.round(rgb1.r + (rgb2.r - rgb1.r) * clampedProgress);
    const g = Math.round(rgb1.g + (rgb2.g - rgb1.g) * clampedProgress);
    const b = Math.round(rgb1.b + (rgb2.b - rgb1.b) * clampedProgress);

    return `rgb(${r}, ${g}, ${b})`;
  };

  // Get color for a specific word based on its position
  const getWordColor = (wordIndex: number) => {
    // Calculate when this word should start and finish highlighting
    const wordStart = wordIndex / totalWords;
    const wordEnd = (wordIndex + 1) / totalWords;

    // Calculate progress for this specific word
    let wordProgress = 0;
    if (revealProgress >= wordEnd) {
      wordProgress = 1; // Fully highlighted
    } else if (revealProgress >= wordStart) {
      wordProgress = (revealProgress - wordStart) / (wordEnd - wordStart);
    }

    return interpolateColor(fadedColor, highlightedColor, wordProgress);
  };

  return (
    <div ref={ref} className={className}>
      {lines.map((lineWords, lineIndex) => {
        // Calculate the starting word index for this line
        const wordsBeforeLine = lines
          .slice(0, lineIndex)
          .reduce((acc, prevLineWords) => acc + prevLineWords.length, 0);

        return (
          <div key={lineIndex} className="">
            {lineWords.map((word, wordIndex) => {
              const totalWordIndex = wordsBeforeLine + wordIndex;
              const color = getWordColor(totalWordIndex);

              return (
                <span key={`${lineIndex}-${wordIndex}`}>
                  <span
                    style={{
                      color,
                      transition: "color 0.3s ease-out", // Smooth color transition
                    }}
                    className="inline-block"
                  >
                    {word}
                  </span>
                  {/* Add space after word (except last word in line) */}
                  {wordIndex < lineWords.length - 1 && " "}
                </span>
              );
            })}
            {/* Add line break except for last line */}
            {lineIndex < lines.length - 1 && <br />}
          </div>
        );
      })}
    </div>
  );
};

export default SlowCharacterReveal;
