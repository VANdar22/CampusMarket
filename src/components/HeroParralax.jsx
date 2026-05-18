import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RevealImage from "@/components/RevealImage";


gsap.registerPlugin(ScrollTrigger);



export default function HeroParallax() {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      imageRef.current,
      {
        y: -80,
      },
      {
        y: 80,
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
      className="relative w-full h-[350px] md:h-[520px] overflow-hidden"
    >
      <img
        ref={imageRef}
        src="https://res.cloudinary.com/dvsdcgu9q/image/upload/q_auto/f_auto/v1779087280/Screenshot_2026-05-10_202837_ayciog.png"
        alt="Luxury Properties"
        className="absolute inset-0 w-full h-[120%] object-cover"
      />
    </div>
  );
}