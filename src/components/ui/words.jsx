import ScrollReveal from "../ScrollReveal";
import ScrollHighlightText from "../ScrollHighlightText";

export default function Words() {
  return (
    <div className="flex flex-col  items-center md:justify-center text-gray-600 space-y-10 p-10">

      <ScrollReveal>
        <ScrollHighlightText variant="background-blue" className="text-md md:text-2xl text-center font-[quicksand] font-semibold">
          We connect people to trusted homes and real estate opportunities.
        </ScrollHighlightText>
      </ScrollReveal>

      <ScrollReveal delay={0.3}>
        <ScrollHighlightText variant="background-blue" className="text-md lg:text-2xl text-center font-[quicksand] font-semibold">
          We focus on integrity, transparency, and customer satisfaction.
        </ScrollHighlightText>
      </ScrollReveal>

      <ScrollReveal delay={0.5}>
        <ScrollHighlightText variant="background-blue" className="text-md lg:text-2xl text-center font-[quicksand] font-semibold">
          We make buying, selling, and renting simple, secure, and stress-free.
        </ScrollHighlightText>
      </ScrollReveal>

    </div>
  );
}