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
              p.property_type === "Townhouse"
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
        {/* HERO */}
        <section className="relative min-h-screen overflow-hidden pt-0 md:pt-20">
          <div className="max-w-7xl mx-auto px-5 md:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
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

                  <p className="mt-6 text-md sm:text-lg md:text-xl leading-relaxed font-medium text-secondary font-[quicksand] text-center lg:text-left">
                    We help you move forward with clarity, confidence, and the right agent by your side.
                  </p>
                </div>
              </div>
            </div>

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

              <p className="mt-5 text-md mb-5 md:text-xl font-medium text-secondary text-center lg:text-left font-[quicksand] max-w-3xl">
                We help you find the best properties tailored to your needs.
              </p>
            </div>

            {/* GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-6 items-start mt-10">
              {loading ? (
                <p className="text-center col-span-2">Loading properties...</p>
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