// components/ScrollHighlightText.jsx

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollHighlightText({
  children,
  className = "",
  variant = "background",
}) {
  const textRef = useRef(null);

  useEffect(() => {
    const el = textRef.current;

    if (!el) return;

    ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      onEnter: () => {
        el.classList.add("active");
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      <style jsx>{`
        .text-highlight {
          position: relative;
          background-repeat: no-repeat;
          background-size: 0% 100%;
          transition: background-size 1s ease;
        }

        .text-highlight.active {
          background-size: 100% 100%;
        }

        .background {
          background-image: linear-gradient(#facc15, #facc15);
        }

        .background-blue {
          background-image: linear-gradient(#bfdbfe, #cfe8ff);
        }

        .half {
          background-image: linear-gradient(
            transparent 60%,
            #facc15 40%
          );
        }

        .underline {
          background-image: linear-gradient(
            transparent 85%,
            #000 15%
          );
        }
      `}</style>

      <span
        ref={textRef}
        className={`text-highlight ${variant} ${className}`}
      >
        {children}
      </span>
    </>
  );
}