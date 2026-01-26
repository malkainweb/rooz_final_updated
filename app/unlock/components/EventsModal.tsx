"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { HelveticaNeue } from "@/app/util/font";
import { useLenis } from "@/app/util/LenisProvider";
import { useEffect } from "react";

interface EventRow {
  event: string;
  venue: string;
  date: string;
}

interface EventsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const events: EventRow[] = [
  {
    event: "AASA",
    venue: "Nashville",
    date: "2/12 - 2/14",
  },
  {
    event: "NYSCOSS Winter institute",
    venue: "Albany",
    date: "3/1 - 3/03",
  },
  {
    event: "NSBA",
    venue: "San Antonio",
    date: "4/10 - 4/12",
  },
  {
    event: "Safe Schools",
    venue: "SOCAL",
    date: "6/22 - 6/24",
  },
  {
    event: "ISTe",
    venue: "Orlando",
    date: "6/28 - 7/01",
  },
];

const EventsModal = ({ isOpen, onClose }: EventsModalProps) => {
  const lenis = useLenis();

  // Stop/start Lenis when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      // Stop Lenis if it exists
      if (lenis) {
        lenis.stop();
      }

      // Hide body overflow
      document.body.style.overflow = "hidden";
    } else {
      // Start Lenis if it exists
      if (lenis) {
        lenis.start();
      }

      // Restore body overflow
      document.body.style.overflow = "";
    }

    // Cleanup - restart on unmount
    return () => {
      if (lenis) {
        lenis.start();
      }
      document.body.style.overflow = "";
    };
  }, [isOpen, lenis]);
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          data-lenis-prevent
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] flex items-center  justify-center bg-black/60 backdrop-blur-xl p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1], // Luxury easing
            }}
            className="relative w-full  custom-scrollbar  rounded-[40px] overflow-y-hidden max-w-6xl max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Gradient background with glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#252525] via-[#1A1A1A] to-[#252525] rounded-[30px] border border-[#4B33C2]/50 shadow-2xl">
              {/* Luxury glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 rounded-[30px]" />
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-50 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all backdrop-blur-sm"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Content */}
            <div className="relative z-10 p-8 md:p-12 overflow-y-auto max-h-[90vh]">
              {/* Heading */}
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className={`text-3xl md:text-5xl font-normal text-center mb-10 text-white ${HelveticaNeue.className}`}
              >
                Unlock it in person if we're
                <br />
                attending the same event
              </motion.h2>

              {/* Table */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="w-full text-center bg-gradient-to-b from-[#252525] to-[#1A1A1A] rounded-[30px] border border-[#4B33C2]/50 overflow-hidden shadow-2xl"
              >
                {/* Table Header */}
                <div className="grid grid-cols-3 border-b border-[#4B33C2]/50 bg-[#222222]/80 backdrop-blur-sm">
                  <div className="px-6 md:px-12 py-6 md:py-8 text-base md:text-xl font-light text-[#FFEDFF]">
                    Event
                  </div>
                  <div className="px-6 md:px-12 py-6 md:py-8 text-base md:text-xl font-light text-[#FFEDFF] border-l border-[#4B33C2]/50">
                    Venue
                  </div>
                  <div className="px-6 md:px-12 py-6 md:py-8 text-base md:text-xl font-light text-[#FFEDFF] border-l border-[#4B33C2]/50">
                    Date
                  </div>
                </div>

                {/* Table Rows */}
                {events.map((event, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                    className={`grid grid-cols-3 text-xs md:text-base text-center transition-colors ${
                      index !== events.length - 1
                        ? "border-b border-[#4B33C2]/30"
                        : ""
                    }`}
                  >
                    <div className="px-4 md:px-12 py-6 md:py-8 flex items-center justify-center font-light text-[#FFEDFF]/90">
                      {event.event}
                    </div>
                    <div className="px-4 md:px-12 py-6 md:py-8 flex items-center justify-center font-light text-[#FFEDFF]/90 border-l border-[#4B33C2]/30">
                      {event.venue}
                    </div>
                    <div className="px-4 md:px-12 py-6 md:py-8 flex items-center justify-center font-light text-[#FFEDFF]/90 border-l border-[#4B33C2]/30">
                      {event.date}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EventsModal;
