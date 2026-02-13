"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { HelveticaNeue, NeueMontreal } from "@/app/util/font";
import EventsModal from "./EventsModal";
import RequestModal from "./RequestModal";
import { SanityEvent, SanityActionCard } from "@/app/sanity/lib/types";

interface ActionCardsProps {
  events: SanityEvent[];
  actionCards: SanityActionCard[];
}

const ActionCards = ({ events, actionCards }: ActionCardsProps) => {
  const [showEventsModal, setShowEventsModal] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);

  const handleCardClick = (actionType: "request" | "events") => {
    if (actionType === "request") {
      setShowRequestModal(true);
    } else if (actionType === "events") {
      setShowEventsModal(true);
    }
  };

  return (
    <>
      <div className="w-full max-w-4xl z-[10] mx-auto md:pt-32 pt-26 grid grid-cols-1 gap-4 md:gap-10 px-6">
        {actionCards.map((card, index) => (
          <motion.div
            key={card._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A] rounded-3xl overflow-hidden border border-white/10"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 items-center">
              {/* Image */}
              <div className="relative aspect-[1/0.9] w-full">
                <Image
                  src={card.imageUrl}
                  alt={card.imageAlt}
                  fill
                  className="object-cover scale-105"
                />
              </div>

              {/* Content */}
              <div
                className={`p-10 md:p-8 flex flex-col items-start ${NeueMontreal.className}`}
              >
                <h3
                  className={`text-white text-2xl leading-[120%] md:text-4xl font-medium mb-2 ${HelveticaNeue.className}`}
                  dangerouslySetInnerHTML={{
                    __html: card.title.replace(/\\n/g, "<br />"),
                  }}
                />
                <p className={`text-white/50 text-sm md:text-base mb-6`}>
                  {card.description}
                </p>
                <button
                  onClick={() => handleCardClick(card.actionType)}
                  className="bg-gradient-to-r from-pink-500 to-[#FF004C] px-8 py-3 rounded-full text-white text-sm md:text-base font-medium cursor-pointer hover:from-pink-600 hover:to-pink-700 transition-all transform hover:scale-105"
                >
                  {card.buttonText}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Events Modal */}
      <EventsModal
        events={events}
        isOpen={showEventsModal}
        onClose={() => setShowEventsModal(false)}
      />

      {/* Request Modal */}
      <RequestModal
        isOpen={showRequestModal}
        onClose={() => setShowRequestModal(false)}
      />
    </>
  );
};

export default ActionCards;
