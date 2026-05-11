import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroParallax() {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      imageRef.current,
      {
        y: -120,
      },
      {
        y: 120,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          scrub: true,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[500px] sm:h-[600px] md:h-[650px] overflow-hidden"
    >
      {/* PARALLAX IMAGE */}
      <img
        ref={imageRef}
        src="https://res.cloudinary.com/dvsdcgu9q/image/upload/q_auto/f_auto/v1778445751/Screenshot_2026-05-10_202837_ayciog.png"
        alt="Luxury Properties"
        className="absolute inset-0 w-full h-[120%] object-cover"
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* CONTENT */}
      <div className="relative z-20 h-full flex flex-col justify-center items-center px-4 sm:px-6 md:px-12 text-center">
        
        {/* HEADING */}
        <h2
          className="
            text-lg
            sm:text-2xl
            md:text-4xl
            font-[Aboreto]
            text-white
            leading-snug
            tracking-wide
            max-w-5xl
          "
        >
          KEEP YOURSELF UPDATED ON THE LATEST LUXURY PROPERTY AVAILABLE
        </h2>

        {/* FORM */}
        <div
          className="
            mt-8
            w-full
            max-w-5xl
            flex
            flex-col
            md:flex-row
            gap-4
          "
        >
          <input
            type="text"
            placeholder="Name*"
            className="
              w-full
              flex-1
              h-12 sm:h-14 md:h-16
              bg-white/10
              backdrop-blur-lg
              border border-white/20
              px-4 sm:px-6
              text-sm sm:text-base md:text-lg
              text-white
              placeholder:text-gray-300
              placeholder:font-[Aboreto]
              outline-none
            "
          />

          <input
            type="email"
            placeholder="Email*"
            className="
              w-full
              flex-1
              h-12 sm:h-14 md:h-16
              bg-white/10
              backdrop-blur-lg
              border border-white/20
              px-4 sm:px-6
              text-sm sm:text-base md:text-lg
              text-white
              placeholder:text-gray-300
              placeholder:font-[Aboreto]
              outline-none
            "
          />

          <button
            className="
              w-full
              md:w-auto
              h-12 sm:h-14 md:h-16
              px-8
              bg-[#f5f5f5]
              hover:bg-[#145a98]
              text-black
              hover:text-accent
              font-semibold
              font-[Aboreto]
              tracking-[0.15em]
              transition-all
              duration-300
              hover:scale-105
              text-md
            "
          >
            SIGN UP
          </button>
        </div>

        {/* SUBTEXT */}
        <p
          className="
            mt-6
            max-w-4xl
            text-md
            sm:text-md
            md:text-lg
            font-[quicksand]
            text-white/90
            leading-relaxed
            px-2
          "
        >
          By providing your contact information, you acknowledge and agree to
          receive marketing communications including calls, texts, and emails.
          You may opt out at any time.
        </p>
      </div>
    </div>
  );
}