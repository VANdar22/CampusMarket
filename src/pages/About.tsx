import ScrollHighlightText from "@/components/ScrollHighlightText";
import Footer from "@/components/ui/footer";
import MeetTheTeam from "@/components/Team";
import CoreValues from "@/components/CoreValue";
import RevealImage from "@/components/RevealImage";

export default function About() {
  return (
    <>
      <div className="min-h-screen bg-background px-5 py-10 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
          {/* Left Portrait Image */}
          <div className="hidden md:flex items-end justify-start lg:min-h-[500px]">
            <div className="overflow-hidden">
              <img
                src="https://res.cloudinary.com/dvsdcgu9q/image/upload/q_auto/f_auto/v1778520937/cosmos_1541447577_dcavnu.jpg"
                alt="Portrait"
                className="h-[300px] w-[220px] object-cover"
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="space-y-8">
            {/* Hero Image */}
            <div className="overflow-hidden">
            <RevealImage
  src="https://res.cloudinary.com/dvsdcgu9q/image/upload/q_auto/f_auto/v1778520935/cosmos_1959895835_inipve.jpg"
  height="450px"
/>
            </div>

            {/* Intro */}
            <div className="max-w-4xl space-y-6">
              <ScrollHighlightText
                variant="background"
                className="text-lg font-medium font-[quicksand] leading-tight text-gray-800 md:text-xl lg:text-2xl"
              >
                At SMS HomeFinder, we connect clients to quality properties and
                dream homes through trusted real estate services.
              </ScrollHighlightText>

              <p className="text-base leading-relaxed font-[quicksand] text-gray-600 md:text-lg  mt-4 lg:text-xl">
                We provide professional and reliable real estate solutions by
                helping clients find quality properties, investment
                opportunities, and ideal homes. Our commitment to{" "}
                <ScrollHighlightText
                  variant="background-blue"
                  className="text-gray-800"
                >
                  integrity, transparency, and customer satisfaction
                </ScrollHighlightText>{" "}
                ensures that buying, selling, and renting properties remains{" "}
                <ScrollHighlightText
                  variant="background-blue"
                  className="text-gray-800"
                >
                  simple, secure, and stress-free.
                </ScrollHighlightText>
              </p>
            </div>

            {/* About Company */}
            <div className="max-w-5xl space-y-6">
              <ScrollHighlightText className="text-lg font-medium font-[quicksand] leading-tight text-gray-900 md:text-xl lg:text-2xl">
                About SMS HomeFinder
              </ScrollHighlightText>
              <p className="text-base leading-relaxed font-[quicksand] text-gray-600 mt-4 md:text-lg lg:text-xl">
                SMS HomeFinder is a dynamic real estate company established in
                2019, delivering reliable and client-focused property solutions
                across Ghana and beyond.

                Since its founding, the company has built a strong reputation
                for trust, integrity, and exceptional customer service.
              </p>
              

              <ScrollHighlightText variant="background-blue" className="text-base leading-relaxed font-[quicksand] text-gray-600 mt-4 md:text-lg lg:text-xl">
                Our goal is to help clients maximize the value of their
                investments while finding the perfect residential and commercial
                properties.
              </ScrollHighlightText>
            </div>
          </div>
        </div>
      </div>

      <MeetTheTeam />
      <CoreValues />
      {/* Footer Outside Main Div */}
      <Footer />
  
    </>
  );
}
