"use client";

import { useState } from "react";
import ScrollHighlightText from "./ScrollHighlightText";
import AboutParallax from "./AboutParallax";
export default function CoreValues() {
  const [activeIndex, setActiveIndex] = useState(0);

  const values = [
    {
      number: "01",
      title: "Integrity",
      description:
        "We believe that trust is the foundation of every successful real estate transaction.",
      image:
      "https://res.cloudinary.com/dvsdcgu9q/image/upload/q_auto/f_auto/v1778626508/cosmos_371842233_y4zwzs.jpg"    },
    {
      number: "02",
      title: "Professionalism",
      description:
        "We approach every aspect of our work with discipline, expertise, and attention to detail.",
      image:
      "https://res.cloudinary.com/dvsdcgu9q/image/upload/q_auto/f_auto/v1778626508/cosmos_1882128341_xtbabp.jpg"    },
    {
      number: "03",
      title: "Client Commitment",
      description:
        "We take the time to understand every client's unique needs and provide personalized solutions that deliver real value.",
      image:
      "https://res.cloudinary.com/dvsdcgu9q/image/upload/q_auto/f_auto/v1778626508/cosmos_1333685916_xlp00b.jpg"    },
  ];

  return (
    <section className="relative bg-[#ececec] ">
      {/* Heading */}
      <div className="mb-14 px-5 text-center">
        <ScrollHighlightText className="text-lg font-[quicksand] font-semibold text-gray-900 md:text-3xl">
          Our Core Values
        </ScrollHighlightText>

        <p className="mx-auto mt-4 max-w-2xl font-medium font-[quicksand] text-gray-600 md:text-xl">
          The principles that guide our commitment to trusted and professional
          real estate services.
        </p>
      </div>

      {/* Accordion */}
      <div className="flex h-[420px] flex-col overflow-hidden md:flex-row">
        {values.map((value, index) => {
          const isActive = activeIndex === index;

          return (
            <div
              key={index}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => setActiveIndex(index)}
              className={`group relative cursor-pointer overflow-hidden transition-all duration-700 ease-in-out ${
                isActive ? "flex-[3]" : "flex-1"
              }`}
            >
              {/* Background Image with Parallax */}
              <div
                className={`absolute inset-0 scale-110 transition-transform duration-[1200ms] ${
                  isActive ? "scale-100" : "scale-125"
                }`}
              >
                <img
                  src={value.image}
                  alt={value.title}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Overlay */}
              <div
                className={`absolute inset-0 transition-all duration-500 ${
                  isActive
                    ? "bg-black/35"
                    : "bg-black/90"
                }`}
              />

              {/* Large Number */}
              <div className="absolute left-5 top-5 z-20">
                <span
                  className={`text-2xl md:text-5xl font-semibold text-accent/40 transition-all font-[aboreto] duration-500 ${
                    isActive ? "text-accent/80" : ""
                  }`}
                >
                  {value.number}
                </span>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 z-20 p-6 text-white md:p-8">
                <h3 className="text-2xl font-light font-[quicksand] md:text-3xl">
                  {value.title}
                </h3>

                <div
                  className={`overflow-hidden transition-all duration-700 ${
                    isActive
                      ? "mt-4 max-h-40 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="max-w-md font-[quicksand] text-sm font-light leading-relaxed md:text-lg">
                    {value.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <AboutParallax />
    </section>
  );
}