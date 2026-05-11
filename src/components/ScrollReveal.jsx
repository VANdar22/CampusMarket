import { useEffect, useRef, useState } from "react";

/**
 * ScrollReveal
 * Wrap any content and it will animate when it enters the viewport
 */
export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up", // up, down, left, right
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // animate once
        }
      },
      {
        threshold: 0.15, // trigger when 15% visible
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const getTransform = () => {
    if (isVisible) return "translate3d(0,0,0)";

    switch (direction) {
      case "down":
        return "translate3d(0,-40px,0)";
      case "left":
        return "translate3d(40px,0,0)";
      case "right":
        return "translate3d(-40px,0,0)";
      case "up":
      default:
        return "translate3d(0,40px,0)";
    }
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: `all 0.7s ease ${delay}s`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}