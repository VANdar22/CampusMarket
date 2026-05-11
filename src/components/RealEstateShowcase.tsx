import React, { useState } from "react";
import { ArrowRight } from "lucide-react";

const sections = [
  {
    id: "01",
    title: "Buy",
    description:
      "We’ve done this over 10,000 times, and we know what wins.",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: "02",
    title: "Sell",
    description:
      "Sell fast, sell high. Your listing gets pro staging, strategic pricing, constant open houses, and agents who never stop working until the right buyer signs.",
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: "03",
    title: "Rent",
    description:
      "Access hidden rentals before they hit the market through agents who know every landlord in town.",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1400&auto=format&fit=crop",
  },
];

export default function HoverRevealSections() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="w-full bg-black text-white">
      {sections.map((section, index) => {
        const isActive = active === index;

        return (
          <div
            key={section.id}
            onMouseEnter={() => setActive(index)}
            onMouseLeave={() => setActive(null)}
            className="group relative overflow-hidden border-t border-white/10 bg-black"
          >
            {/* Hover Background Image */}
            <div
              className={`absolute inset-0 transition-all duration-700 ${
                isActive ? "opacity-100 scale-100" : "opacity-0 scale-105"
              }`}
            >
              <img
                src={section.image}
                alt={section.title}
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-black/60" />
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex min-h-[280px] flex-col justify-between px-5 py-6 md:min-h-[360px] md:flex-row md:items-center md:px-16 md:py-10">

              {/* MOBILE LAYOUT */}
              <div className="flex h-full flex-col justify-between md:hidden">
                
                {/* Top */}
                <div className="flex items-start justify-between">
                  <div>
                    {/* Number */}
                    <div
                      className={`mb-4 flex h-10 w-10 items-center justify-center rounded-full border text-xs transition-all duration-500 ${
                        isActive
                          ? "border-white bg-white text-black"
                          : "border-white/40 text-white"
                      }`}
                    >
                      {section.id}
                    </div>

                    {/* Title */}
                    <h2 className="text-5xl  font-[quicksand] font-light leading-none tracking-tight">
                      {section.title}
                    </h2>
                  </div>

                  {/* Arrow */}
                  <button
                    className={`
                      flex h-14 w-14 items-center justify-center rounded-full border transition-all duration-500
                      ${
                        isActive
                          ? "border-white bg-white text-black scale-105 rotate-0"
                          : "border-white/20 bg-white/5 text-white rotate-[-45deg]"
                      }
                    `}
                  >
                    <ArrowRight className="h-6 w-6" />
                  </button>
                </div>

                {/* Description */}
                <p className="mt-16 max-w-[90%] font-[quicksand] text-sm leading-relaxed text-white/85">
                  {section.description}
                </p>
              </div>

              {/* DESKTOP LAYOUT */}
              <div className="hidden w-full md:flex md:items-center md:justify-between">

                {/* Left Content */}
                <div className="max-w-[320px]">
                  <div
                    className={`mb-6 flex h-14 w-14 items-center justify-center rounded-full border text-base transition-all duration-500 ${
                      isActive
                        ? "border-white bg-white text-black"
                        : "border-white/40 text-white"
                    }`}
                  >
                    {section.id}
                  </div>

                  <p className="text-xl font-[quicksand] leading-relaxed text-white/85">
                    {section.description}
                  </p>
                </div>

                {/* Center Title */}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <h2 className="text-[140px] font-light font-[quicksand] tracking-tight lg:text-[100px]">
                    {section.title}
                  </h2>
                </div>

                {/* Arrow */}
                <button
                  className={`
                    relative flex h-28 w-28 items-center justify-center rounded-full border transition-all duration-500
                    ${
                      isActive
                        ? "border-white bg-white text-black scale-110 rotate-0"
                        : "border-white/20 bg-white/5 text-white rotate-[-45deg]"
                    }
                  `}
                >
                  <ArrowRight
                    className={`h-14 w-14 transition-all duration-500 ${
                      isActive ? "translate-x-1" : ""
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}