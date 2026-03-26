import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import im1 from "../images/im1.png";
import im2 from "../images/im2.png";
import im3 from "../images/im3.png";
import bg1 from "../images/bg1.png";
import bg2 from "../images/bg2.png";
import bg3 from "../images/bg3.png";

const steps = [
  {
    id: 1,
    title: "Create your account 😊",
    description: "Welcome to CampusMarket! Sign up in seconds and start connecting with fellow students around your campus. It's quick, easy, and totally free!",
    image: im1,
    bg: bg1,
    rotate: 6,
    translateX: 10,
    translateY: 0,
  },
  {
    id: 2,
    title: "List or find items 😄",
    description: "Got something you don’t need anymore? List it for sale! Or maybe you’re hunting for a great deal? Browse items nearby and find exactly what you’re looking for.",
    image: im2,
    bg: bg2,
    rotate: 3,
    translateX: 0,
    translateY: 0,
  },
  {
    id: 3,
    title: "Chat and agree 😃",
    description: "Connect directly with other students, ask questions, negotiate prices, and finalize your deals easily. Everything happens right here in one place!",
    image: im3,
    bg: bg3,
    rotate: -6,
    translateX: 0,
    translateY: 10,
  },
];

export default function StepsCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % steps.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const step = steps[current];

  return (
<div className="relative h-[250px] sm:h-[450px] md:h-[500px] lg:h-[300px] w-full mx-auto overflow-hidden shadow-md">
      {/* Background Image */}
      <img
        src={step.bg}
        alt="bg"
        className="absolute inset-0 w-full h-full object-cover transition duration-700"
      />

      {/* Main Layout */}
      <div className="relative z-10 flex items-center justify-between h-full px-8 md:px-12">

        {/* LEFT CONTENT */}
        <div className="max-w-lg text-white">
          <h1 className=" md:text-4xl text-2xl sm:text-3xl lg:text-4xl font-medium leading-tight">
            {step.title}
          </h1>

          <p className="mt-3 md:text-2xl sm:text-lg lg:text-xl font-light text-white/80">
            {step.description}
          </p>

         
        </div>

        {/* RIGHT IMAGE (SLANTED CARD) */}
        <div className="relative hidden md:flex items-center justify-center w-[280px] h-[280px]">

          {/* Glow / depth */}
          <div className="absolute w-[240px] h-[240px] bg-white/10 rounded-xl blur-2xl" />

          {/* Fixed Card */}
          <div
            className="relative w-[220px] h-[220px] bg-white rounded-xl shadow-xl 
                        transition duration-500 flex items-center justify-center overflow-hidden"
            style={{
              transform: `rotate(${step.rotate}deg) translateX(${step.translateX}px) translateY(${step.translateY}px)`,
            }}
          >
            {/* Inner padding wrapper */}
            <div className="w-full h-full p-4 flex items-center justify-center">
              <img
                src={step.image}
                alt="product"
                className="max-w-full max-h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-4 right-4 flex gap-2 z-20">
        <button
          onClick={() =>
            setCurrent((prev) =>
              prev === 0 ? steps.length - 1 : prev - 1
            )
          }
          className="bg-secondary p-2 rounded-full hover:bg-white transition"
        >
          <ChevronLeft className="text" size={32} />
        </button>

        <button
          onClick={() =>
            setCurrent((prev) => (prev + 1) % steps.length)
          }
          className="bg-secondary p-2 rounded-full hover:bg-white transition"
        >
          <ChevronRight className="text" size={32} />
        </button>
      </div>

      {/* Progress */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {steps.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-10000 ${
              i === current
                ? "w-6 bg-white"
                : "w-2 bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}