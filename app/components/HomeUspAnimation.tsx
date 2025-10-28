"use client";

import { useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import Image from "next/image";

interface HomeUspAnimationProps {
  siteHeaders?: SanitySiteHeaders;
}

import { gsap } from "gsap";

import effortless from "@/public/WhyChooseUs/effortless.webp";
import smartTechnology from "@/public/WhyChooseUs/smartTechnology.webp";
import { NeueMontreal } from "../util/font";
import { SanitySiteHeaders, SanityWhyChooseUsCard } from "../sanity/lib/types";
import { urlFor } from "../sanity/lib/image";

interface HomeUspAnimationProps {
  siteHeaders?: SanitySiteHeaders;
  cards: SanityWhyChooseUsCard[];
}

interface CardItem {
  img: any;
  heading: string;
  body: string;
}
const Items = [
  {
    img: smartTechnology,
    heading: "Smart Technology",
    body: "Using innovative locking mechanisms, our pouches keep your phone secure, so you can maintain your attention and productivity.",
  },
  {
    img: effortless,
    heading: "Effortless Focus",
    body: "With just a simple snap, our pouches lock away distractions, empowering you to stay engaged and achieve your goals.",
  },
];

const HomeUspAnimation = ({ siteHeaders, cards }: HomeUspAnimationProps) => {
  // Transform Sanity cards to component format
  const Items: CardItem[] = cards.map((card) => ({
    img: card.image
      ? urlFor(card.image).width(800).height(600).url()
      : smartTechnology,
    heading: card.heading,
    body: card.body,
  }));
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
  });

  const width = globalThis.innerWidth;
  useEffect(() => {
    setcalwidth(width);
  }, [width]);

  const [calwidth, setcalwidth] = useState(0);
  const [yvalue, setyvalue] = useState(1);
  const [scale_y2value, setscale_y2value] = useState(0);
  const [height, setheight] = useState(1);

  const y = useTransform(scrollYProgress, [0, 1], [1, Items.length + 0.3]);
  const scale_y = useTransform(scrollYProgress, [0, 1], [10, 1]);
  const parent_height = useTransform(scrollYProgress, [0, 1], [1, 10]);

  useMotionValueEvent(y, "change", (latest) => {
    setyvalue(latest);
  });
  useMotionValueEvent(scale_y, "change", (latest) => {
    setscale_y2value(latest);
  });
  useMotionValueEvent(parent_height, "change", (latest) => {
    setheight(latest);
  });

  const dynamicArray_scaling = Array(Items.length)
    .fill("")
    .map((_, index) => index);

  const calculateScale = (index: number, data_array: any[], yvalue: number) => {
    const minScale = Math.min(...data_array) / 2 + scale_y2value / 10;
    const maxScale = 1;
    const scaleFactor = (yvalue - (index + 1)) / (calwidth < 765 ? 9 : 8);
    const scale = maxScale - (maxScale - minScale) * scaleFactor;
    return scale;
  };

  const itemRefs = useRef<any>([]);

  useEffect(() => {
    itemRefs.current.forEach((ref: any, index: any) => {
      gsap.to(ref, {
        opacity:
          index + 1 - yvalue >= 0 && index + 1 - yvalue <= 1
            ? 1
            : index + 1 - yvalue <= 0
              ? 1
              : 0,
        transform:
          index + 1 - yvalue >= 0 && index + 1 - yvalue <= 1
            ? `translateY(${
                (index + 2 - yvalue) * 100 -
                (calwidth < 765 ? 135 : 150) * (-index + yvalue)
              }%) translateX(-50%)`
            : index + 1 - yvalue <= 0
              ? `translateY(${
                  -(calwidth < 765 ? 40 : 50) -
                  (yvalue - (index + 1)) * (calwidth < 765 ? 12 / 1.7 : 1 / 1)
                }%) translateX(-50%) scale(${calculateScale(
                  index,
                  dynamicArray_scaling,
                  yvalue
                )})`
              : `translateY(${yvalue + 1 + index * 100}%) translateX(-50%)`,
        duration: 0.4,
      });
    });
  }, [yvalue]);

  console.log(Items);

  return (
    <>
      {/* Header */}
      <h2 className="text-4xl md:text-5xl font-medium text-center   ">
        {siteHeaders?.whyChooseUsHeader || "Why choose us"}{" "}
      </h2>
      <section
        id="why"
        className={`w-full mt-[-10vh]  font-medium mx-auto flex items-end md:w-[200rem] md:max-w-full md:mt-[1.5rem] relative ${NeueMontreal.className}`}
        style={{
          height: `${Items.length * (calwidth < 765 ? 100 : 90)}vh`,
        }}
        ref={sectionRef}
        aria-label="Product benefits showcase"
      >
        <div className="flex justify-center items-center sticky bottom-0 h-[100vh] w-full">
          {Items.map((e: any, index: any) => {
            return (
              <article
                key={index}
                ref={(el: any) => (itemRefs.current[index] = el)}
                className={` absolute top-[50%] translate-x-[-50%] justify-center md:rounded-[60px] md:h-[100rem] md:max-h-[90vh] w-[95%] h-[85vh] left-[50%] md:w-[90%]  flex-col-reverse md:gap-0 gap-[1.5rem] flex rounded-[30px] bg-[#F6F4EC] overflow-clip ${
                  index % 2 ? "md:flex-row-reverse" : "md:flex-row"
                }`}
              >
                <div className=" bg-gradient-to-bl to-80% md:to-90% from-transparent via-transparent to-black h-full w-full absolute top-0 left-0 z-[10]"></div>
                <figure className="w-full absolute top-0 left-0 md:rounded-none rounded-[30px] h-full overflow-hidden">
                  <Image
                    src={e.img}
                    alt={`${e.header}`}
                    width={800}
                    height={600}
                    className="w-full h-full  object-cover"
                    priority={index === 0}
                    unoptimized
                  />
                </figure>

                <div className="w-full  gap-3 p-10 md:p-20  h-full relative flex flex-col justify-end z-[100] ">
                  <h3 className={` capitalize  text-xl lg:text-5xl`}>
                    {e.heading}
                  </h3>
                  <p
                    className={` md:w-[30rem]  text-base font-normal leading-[110%]  md:text-lg`}
                  >
                    {e.body}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default HomeUspAnimation;
