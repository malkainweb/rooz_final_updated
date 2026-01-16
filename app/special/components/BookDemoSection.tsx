"use client";

import { useState } from "react";
import { HelveticaNeue, NeueMontreal } from "@/app/util/font";

const BookDemoSection = () => {
  const [isIframeLoading, setIsIframeLoading] = useState(true);

  const handleIframeLoad = () => {
    setIsIframeLoading(false);
  };

  return (
    <section
      className={`w-full min-h-screen bg-black text-white pt-20 px-4 ${NeueMontreal.className}`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h2
          className={`text-3xl md:text-5xl font-normal text-center mb-10 ${HelveticaNeue.className}`}
        >
          Book a 10 minute demo
        </h2>

        {/* Cal.com Iframe Container */}
        <div className="relative w-full h-[800px] border border-white/10 bg-[#1a1a1a] rounded-3xl overflow-hidden">
          {/* Loading Spinner */}
          {isIframeLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {/* Cal.com Iframe */}
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
    </section>
  );
};

export default BookDemoSection;
