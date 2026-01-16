"use client";

import { NeueMontreal } from "@/app/util/font";
import Image from "next/image";

const PlaceholderSection = () => {
  return (
    <section
      className={`w-full bg-black text-white py-20 px-4 ${NeueMontreal.className}`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-medium text-center mb-14">
          Your options to unlock
        </h2>

        {/* Mobile Image */}
        <div className="w-full md:hidden aspect-[9/16] relative rounded-3xl overflow-hidden mb-8">
          <Image
            src="https://placehold.co/600x1067/1a1a1a/ffffff?text=600x1067"
            alt="Mobile Placeholder"
            fill
            unoptimized
            className="object-cover"
          />
        </div>

        {/* Tablet Image */}
        <div className="w-full hidden md:block lg:hidden aspect-[4/3] relative rounded-3xl overflow-hidden mb-8">
          <Image
            src="https://placehold.co/1024x768/1a1a1a/ffffff?text=1024x768"
            alt="Tablet Placeholder"
            fill
            unoptimized
            className="object-cover"
          />
        </div>

        {/* Desktop Image */}
        <div className="w-full hidden lg:block aspect-video relative rounded-3xl overflow-hidden">
          <Image
            src="https://placehold.co/1920x1080/1a1a1a/ffffff?text=1920x1080"
            alt="Desktop Placeholder"
            fill
            unoptimized
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default PlaceholderSection;
