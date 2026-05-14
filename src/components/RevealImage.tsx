import { motion } from "framer-motion";

interface RevealImageProps {
  src: string;
  alt?: string;
  height?: string;
  background?: string;
}

export default function RevealImage({
  src,
  alt = "image",
  height = "500px",
  background = "",
}: RevealImageProps) {
  return (
    <div
      className="relative overflow-hidden bg-background w-full"
      style={{ height }}
    >
      {/* IMAGE */}
      <img
        src={src}
        alt={alt}
        className="h-[300px] w-full object-cover md:h-[400px] lg:h-[450px]"
      />

      {/* REVEAL LAYER */}
      <motion.div
        initial={{ x: 0 }}
        whileInView={{ x: "100%" }}
        transition={{
          duration: 1.4,
          ease: [0.77, 0, 0.175, 1],
        }}
        viewport={{ once: true }}
        className="absolute inset-0 bg-background z-10"
      />
    </div>
  );
}