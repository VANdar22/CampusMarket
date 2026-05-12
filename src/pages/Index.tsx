import Footer from "@/components/ui/footer";
import { PropertyCard } from "@/components/PropertyCard";
import Words from "@/components/ui/words";
import ScrollHighlightText from "@/components/ScrollHighlightText";
import RealEstateShowcase from "@/components/RealEstateShowcase";
import HeroParralax from "@/components/HeroParralax";
import NewsletterParallax from "@/components/NewsletterParallax";

const properties = [
  {
    id: "1",
    title: "Modern Luxury Villa",
    price: 250000,
    location: "East Legon, Accra",
    bedrooms: 4,
    image:
    "https://res.cloudinary.com/dvsdcgu9q/image/upload/q_auto/f_auto/v1778520935/cosmos_1959895835_inipve.jpg  ",
  },
  {
    id: "2",
    title: "Executive Apartment",
    price: 1800,
    location: "Airport Residential, Accra",
    bedrooms: 3,
    image:
    "https://res.cloudinary.com/dvsdcgu9q/image/upload/q_auto/f_auto/v1778520935/cosmos_1959895835_inipve.jpg  ",
  },
  {
    id: "3",
    title: "Beachfront House",
    price: 450000,
    location: "Labadi, Accra",
    bedrooms: 5,
    image:
    "https://res.cloudinary.com/dvsdcgu9q/image/upload/q_auto/f_auto/v1778520935/cosmos_1959895835_inipve.jpg  ",
  },
  {
    id: "4",
    title: "Minimal Family Home",
    price: 320000,
    location: "Cantonments, Accra",
    bedrooms: 4,
    image:
    "https://res.cloudinary.com/dvsdcgu9q/image/upload/q_auto/f_auto/v1778520935/cosmos_1959895835_inipve.jpg  ",
  },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background flex flex-col overflow-x-hidden">
      <main className="flex-1">
        {/* HERO */}
        <section className="relative min-h-screen overflow-hidden pt-0 md:pt-20">
          <div className="max-w-7xl mx-auto px-5 md:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              {/* TEXT */}
              <div className="order-1 flex flex-col justify-center">
                <div className="max-w-2xl mx-auto lg:mx-0">
                  <ScrollHighlightText
                    variant="background"
                    className="
                     mt-6
                      text-lg
                      sm:text-lg
                      md:text-2xl
                      lg:text-3xl
                      leading-relaxed
                      font-semibold
                      text-gray-900
                      font-[quicksand]
                      justify-center
                      text-center
                      ml-5
                      md:ml-0
                      lg:text-left
                    "
                  >
                    BUY, RENT & MANAGE PROPERTIES
                  </ScrollHighlightText>

                  <p
                    className="
                      mt-6
                      text-md
                      sm:text-lg
                      md:text-xl
                      leading-relaxed
                      font-medium
                      text-secondary
                      font-[quicksand]
                      text-center
                      lg:text-left
                    "
                  >
                    We help you move forward with clarity, confidence, and the
                    right agent by your side.
                  </p>

                  {/* HERO BUTTON */}
                  <div className="flex justify-center lg:justify-start">
                    <button
                      className="
                        w-[75%]
                        sm:w-auto
                        flex
                        items-center
                        justify-center
                        h-10
                        sm:h-12
                        md:h-14
                        px-5
                        sm:px-8
                        mt-6
                        border-accent
                        border
                        bg-[#145a98]
                        hover:bg-[#f5f5f5]
                        text-accent
                        hover:text-[#145a98]
                        font-bold
                        font-[Aboreto]
                        tracking-widest
                        transition-all
                        duration-300
                        hover:scale-105
                        text-xs
                        sm:text-sm
                      "
                    >
                      Contact Us
                    </button>
                  </div>
                </div>

                {/* MOBILE STATS */}
                <div
                  className="
                    grid
                    grid-cols-3
                    gap-4
                    mt-10
                    text-center
                    lg:hidden
                  "
                >
                  <div>
                    <h2 className="text-lg font-[Aboreto] text-accent">
                      350+
                    </h2>

                    <p className="text-sm sm:text-sm font-[quicksand] text-secondary mt-1">
                      Satisfied Clients
                    </p>
                  </div>

                  <div>
                    <h2 className="text-lg font-[Aboreto] text-accent">
                      120+
                    </h2>

                    <p className="text-sm sm:text-sm font-[quicksand] text-secondary mt-1">
                      Properties Sold
                    </p>
                  </div>

                  <div>
                    <h2 className="text-lg font-[Aboreto] text-accent">
                      {new Date().getFullYear() - 2018}+
                    </h2>

                    <p className="text-sm sm:text-sm font-[quicksand] text-secondary mt-1">
                      Years
                    </p>
                  </div>
                </div>
              </div>

              {/* DESKTOP STATS */}
              <div className="hidden lg:flex flex-col gap-8 pt-6">
                <h2 className="text-lg font-light flex items-center gap-4 text-secondary">
                  <span className="text-3xl letterspace-2 font-[Aboreto] text-accent">
                    350+
                  </span>

                  <span className="text-xl">Satisfied Clients</span>
                </h2>

                <h2 className="text-xl font-light flex items-center gap-4 text-secondary">
                  <span className="text-3xl letterspace-4 font-[Aboreto] text-accent">
                    120+
                  </span>

                  <span className="text-xl">Properties Sold</span>
                </h2>

                <h2 className="text-lg font-light flex items-center gap-4 text-secondary">
                  <span className="text-3xl letterspace-2 font-[Aboreto] text-accent">
                    {new Date().getFullYear() - 2018}+
                  </span>

                  <span className="text-xl md:ml-7">
                    Years Experience
                  </span>
                </h2>
              </div>
            </div>

            {/* HERO IMAGE */}
            <div className="mt-20 md:mt-20">
              <HeroParralax />
            </div>
          </div>
        </section>

        {/* WORDS SECTION */}
        <section className="py-10 md:py-20 px-5 md:px-8">
          <div className="mx-auto bg-white border border-gray-200 py-10 md:py-10">
            <Words />
          </div>
        </section>

        {/* PROPERTY SECTION */}
        <section className="py-10 px-5 md:px-10 md:py-10">
          <div className="max-w-7xl mt-20 md:mt-20 mx-auto">
            {/* HEADING */}
            <div>
              <ScrollHighlightText
                variant="background"
                className="
                  text-xl
                  md:text-3xl
                  font-[quicksand]
                  leading-tight
                  font-medium
                  tracking-tight
                  text-gray-600
                  text-center
                  lg:text-left
                  ml-9
                  md:ml-0
                "
              >
                Discover Premium Properties
              </ScrollHighlightText>

              <p
                className="
                  mt-5
                  text-md
                  mb-5
                  md:text-xl
                  font-medium
                  text-secondary
                  text-center
                  lg:text-left
                  font-[quicksand]
                  max-w-3xl
                "
              >
                We help you find the best properties tailored to your needs.
              </p>

             {/* DESKTOP PROPERTY BUTTON */}
<div className="hidden lg:flex justify-start">
  <button
    className="
      w-auto
      flex
      items-center
      justify-center
      h-14
      px-8
      mt-6
      bg-[#145a98]
      hover:bg-[#f5f5f5]
      text-accent
      hover:text-[#145a98]
      border-accent
      border

      font-semibold
      font-[Aboreto]
      tracking-widest
      transition-all
      duration-300
      hover:scale-105
      text-sm
    "
  >
    View All Properties
  </button>
</div>
            </div>

            {/* PROPERTY GRID */}
            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-6
                md:gap-6
                items-start
                mt-10
              "
            >
              {properties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                />
                
              ))}
            </div>
            {/* MOBILE PROPERTY BUTTON */}
<div className="flex justify-center mt-8 lg:hidden">
  <button
    className="
      w-[75%]
      flex
      items-center
      justify-center
      h-10
      px-5
      bg-[#145a98]
      hover:bg-[#f5f5f5]
      text-accent
      hover:text-black
      font-semibold
      font-[Aboreto]
      tracking-[0.1em]
      transition-all
      duration-300
      text-xs
    "
  >
    View All Properties
  </button>
</div>
          </div>
        </section>

        {/* SHOWCASE */}
        <section className="w-full mt-10 text-white overflow-hidden">
          <RealEstateShowcase />
        </section>
      </main>

      <NewsletterParallax />
      <Footer />
    </div>
  );
}