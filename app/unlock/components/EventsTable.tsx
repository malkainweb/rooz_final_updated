"use client";

import { HelveticaNeue } from "@/app/util/font";

interface EventRow {
  event: string;
  venue: string;
  date: string;
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

const EventsTable = () => {
  return (
    <section
      className={`w-full min-h-screen bg-black text-white pt-20 px-4 flex flex-col items-center justify-center ${HelveticaNeue.className}`}
    >
      <div className="max-w-5xl w-full mx-auto">
        {/* Heading */}
        <h2
          className={`text-3xl md:text-5xl font-normal text-center mb-10 ${HelveticaNeue.className}`}
        >
          Unlock it in person if we're
          <br />
          attending the same event
        </h2>

        {/* Table */}
        <div className="w-full text-center bg-gradient-to-b from-[#252525] to-[#1A1A1A] rounded-[45px] border border-[#4B33C2] overflow-hidden shadow-2xl">
          {/* Table Header */}
          <div className="grid grid-cols-3 border-b  border-[#4B33C2] bg-[#222222]">
            <div className="px-12 py-8 text-xl font-light text-[#FFEDFF]">
              Event
            </div>
            <div className="px-12 py-8 text-xl font-light text-[#FFEDFF] border-l border-[#4B33C2]">
              Venue
            </div>
            <div className="px-12 py-8 text-xl font-light text-[#FFEDFF] border-l border-[#4B33C2]">
              Date
            </div>
          </div>

          {/* Table Rows */}
          {events.map((event, index) => (
            <div
              key={index}
              className={`grid grid-cols-3 md:text-base text-sm  text-center ${
                index !== events.length - 1 ? "border-b border-[#4B33C2]" : ""
              }`}
            >
              <div className=" px-6  justify-center md:px-12 py-8 flex items-center font-light text-[#FFEDFF]/90">
                {event.event}
              </div>
              <div className=" px-6  justify-center md:px-12 py-8  flex items-center font-light text-[#FFEDFF]/90 border-l border-[#4B33C2]">
                {event.venue}
              </div>
              <div className=" px-6  justify-center md:px-12 py-8 items-center  font-light text-[#FFEDFF]/90 border-l border-[#4B33C2]">
                {event.date}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsTable;
