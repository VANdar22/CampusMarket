import { useEffect, useState } from "react";

import Footer from "@/components/ui/footer";
import { PropertyCard } from "@/components/PropertyCard";
import Words from "@/components/ui/words";
import ScrollHighlightText from "@/components/ScrollHighlightText";
import RealEstateShowcase from "@/components/RealEstateShowcase";
import HeroParralax from "@/components/HeroParralax";
import NewsletterParallax from "@/components/NewsletterParallax";
import { getProperties } from "@/services/properties";

export default function Index() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await getProperties();

        const filtered = (data || [])
          .filter(
            (p: any) =>
              p.property_type === "Apartment" ||
              p.property_type === "Townhouse" ||
              p.property_type === "House"
          )
          .slice(0, 4);

        setProperties(filtered);
      } catch (err) {
        console.error("Error loading properties:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-x-hidden">
      <main className="flex-1">

        {/* HERO SECTION */}
        <section className="relative overflow-hidden pt-10 md:pt-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-14 items-center">

              {/* TEXT */}
              <div className="order-1">
                <div className="max-w-2xl mx-auto lg:mx-0">
                  <ScrollHighlightText className="text-2xl  font-medium font-[quicksand] md:text-4xl text-center md:text-left leading-tight  tracking-tight text-black">
                    Buy and rent properties in Ghana
                  </ScrollHighlightText>

                  <p className="mt-6 text-lg md:text-2xl text-center font-[quicksand] md:text-left leading-relaxed font-light text-secondary">
                    We help you move forward with clarity,
                    confidence, and the right agent by your side.
                  </p>
                </div>

                {/* MOBILE STATS */}
                <div className="grid grid-cols-3 gap-4 mt-10 text-center lg:hidden">
                  <div>
                    <h2 className="text-xl font-medium font-[aboreto] text-accent">350+</h2>
                    <p className="text-sm font-light font-[quicksand] text-secondary mt-1">
                      Satisfied Clients
                    </p>
                  </div>

                  <div>
                    <h2 className="text-xl font-medium font-[aboreto] text-accent">120+</h2>
                    <p className="text-sm font-light font-[quicksand] text-secondary mt-1">
                      Properties Sold
                    </p>
                  </div>

                  <div>
                    <h2 className="text-xl font-medium font-[aboreto] text-accent">
                      {new Date().getFullYear() - 2018}+
                    </h2>
                    <p className="text-sm font-light font-[quicksand] text-secondary mt-1">Years</p>
                  </div>
                </div>
              </div>

              {/* DESKTOP STATS */}
              <div className="hidden lg:flex flex-col gap-8 pt-2">

                <div>
                  <h2 className="text-xl font-light flex items-center gap-4 tracking-tight text-secondary">
                    <span className="text-4xl font-[aboreto] font-semibold text-accent ">
                      350+
                    </span>
                    Satisfied Clients
                  </h2>
                </div>

                <div>
                  <h2 className="text-xl font-light flex items-center gap-4 tracking-tight text-secondary">
                    <span className="text-4xl font-[aboreto] font-semibold text-accent ">
                      120+
                    </span>
                    Properties Sold
                  </h2>
                </div>

                <div>
                  <h2 className="text-xl font-light flex items-center gap-4 tracking-tight text-secondary">
                    <span className="text-4xl font-[aboreto] font-semibold text-accent ">
                      {new Date().getFullYear() - 2018}+
                    </span>
                    Years Experience
                  </h2>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* HERO PARALLAX */}
        <div className="mt-20 md:mt-20">
          <HeroParralax />
        </div>

        {/* WORDS SECTION */}
        <section className="py-10 md:py-20 px-5 md:px-8">
          <div className="mx-auto bg-white border border-gray-200 py-10 md:py-10">
            <Words />
          </div>
        </section>

        {/* PROPERTY SECTION */}
        <section className="py-10 px-5 md:px-10 md:py-10">
          <div className="max-w-7xl mt-20 md:mt-20 mx-auto">

            <div>
              <ScrollHighlightText
                variant="background"
                className="
                  text-xl md:text-3xl font-[quicksand]
                  leading-tight font-medium tracking-tight
                  text-gray-600 text-center lg:text-left
                  ml-9 md:ml-0
                "
              >
                Discover Premium Properties
              </ScrollHighlightText>

              <p className="mt-5 text-md mb-5 md:text-xl font-medium text-secondary text-center lg:text-left font-[quicksand] max-w-3xl">
                We help you find the best properties tailored to your needs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start mt-10">
              {loading ? (
                <p className="text-center font-semibold font-[aboreto] text-accent text-2xl col-span-2">
                  Loading properties...
                </p>
              ) : properties.length > 0 ? (
                properties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                  />
                ))
              ) : (
                <p className="text-center col-span-2">
                  No matching properties found
                </p>
              )}
            </div>

            {/* MOBILE BUTTON */}
            <div className="flex justify-center mt-8 lg:hidden">
              <button className="w-[75%] flex items-center justify-center h-10 px-5 bg-[#145a98] hover:bg-[#f5f5f5] text-accent hover:text-black font-semibold font-[Aboreto] tracking-[0.1em] transition-all duration-300 text-xs">
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

      <Footer />
    </div>
  );
}