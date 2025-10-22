"use client";
import React, { useRef, useMemo, useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

interface SlowCharacterRevealProps {
  text: string;
  className?: string;
  highlightedColor?: string;
  fadedColor?: string;
  // New props for responsive breaks
  desktopText?: string; // Optional separate text for desktop
  mobileBreakpoints?: number[]; // Array of character indices where mobile should break
}

const SlowCharacterReveal: React.FC<SlowCharacterRevealProps> = ({
  text,
  className = "",
  highlightedColor = "#E9F7FF",
  fadedColor = "#4A6170",
  desktopText,
  mobileBreakpoints = [],
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

  // Calculate lines and character positions based on screen size
  const { lines, totalChars } = useMemo(() => {
    // Use desktopText for desktop if provided, otherwise use main text
    const textToUse = !isMobile && desktopText ? desktopText : text;

    if (isMobile && mobileBreakpoints.length > 0) {
      // For mobile, create breaks at specified character indices
      const cleanText = text.replace(/<br\/?>/g, ""); // Remove existing breaks
      const mobileLines: string[] = [];
      let startIndex = 0;

      // Sort breakpoints to ensure correct order
      const sortedBreakpoints = [...mobileBreakpoints].sort((a, b) => a - b);

      sortedBreakpoints.forEach((breakpoint) => {
        if (breakpoint > startIndex && breakpoint <= cleanText.length) {
          mobileLines.push(cleanText.slice(startIndex, breakpoint));
          startIndex = breakpoint;
        }
      });

      // Add remaining text
      if (startIndex < cleanText.length) {
        mobileLines.push(cleanText.slice(startIndex));
      }

      return {
        lines: mobileLines,
        totalChars: cleanText.length,
      };
    } else {
      // For desktop or when no mobile breakpoints specified
      const splitLines = textToUse.split(/<br\/?>/);
      const totalCharCount = textToUse.replace(/<br\/?>/g, "").length;

      return {
        lines: splitLines,
        totalChars: totalCharCount,
      };
    }
  }, [text, desktopText, isMobile, mobileBreakpoints]);

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

  // Get color for a specific character based on its position
  const getCharacterColor = (charIndex: number) => {
    // Calculate when this character should start and finish highlighting
    const charStart = charIndex / totalChars;
    const charEnd = (charIndex + 1) / totalChars;

    // Calculate progress for this specific character
    let charProgress = 0;
    if (revealProgress >= charEnd) {
      charProgress = 1; // Fully highlighted
    } else if (revealProgress >= charStart) {
      charProgress = (revealProgress - charStart) / (charEnd - charStart);
    }

    return interpolateColor(fadedColor, highlightedColor, charProgress);
  };

  return (
    <div ref={ref} className={className}>
      {lines.map((line, lineIndex) => {
        // Calculate the starting character index for this line
        const charsBeforeLine = lines
          .slice(0, lineIndex)
          .reduce((acc, prevLine) => acc + prevLine.length, 0);

        // Clean the line of extra spaces for better centering
        const cleanLine = line.trim();

        return (
          <div key={lineIndex} className="">
            {cleanLine.split("").map((char, charIndex) => {
              const totalCharIndex = charsBeforeLine + charIndex;
              const color = getCharacterColor(totalCharIndex);

              return (
                <span
                  key={`${lineIndex}-${charIndex}`}
                  style={{
                    color,
                    transition: "color 0.3s ease-out", // Smooth color transition
                  }}
                  className="inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              );
            })}
            {lineIndex < lines.length - 1 && <br />}
          </div>
        );
      })}
    </div>
  );
};

export default SlowCharacterReveal;
