import { useEffect, useRef, useState } from "react";

export default function ScrollTextReveal({ text, className = "" }) {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);

  const words = text.split(" ");

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const visible =
        1 - Math.max(0, rect.top) / (windowHeight + rect.height);

      setProgress(Math.min(1, Math.max(0, visible)));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeWords = Math.floor(progress * words.length);

  return (
    <div
      ref={ref}
      className={`text-4xl font-medium leading-relaxed ${className}`}
    >
      {words.map((word, i) => (
        <span
          key={i}
          style={{
            color: i < activeWords ? "#000" : "#bdbdbd",
            transition: "color 0.2s linear",
            marginRight: "6px",
          }}
        >
          {word}
        </span>
      ))}
    </div>
  );
}