import { useEffect, useMemo, useState } from "react";

import Footer from "@/components/ui/footer";
import { PropertyCard } from "@/components/PropertyCard";
import ScrollHighlightText from "@/components/ScrollHighlightText";

import {
  PropertyFilter,
  EMPTY_FILTERS,
  applyFilters,
  filtersFromSearchParams,
  type PropertyFilterValues,
} from "@/components/PropertyFilter";

/* -------------------------------------------------------------------------- */
/*                                PROPERTY DATA                               */
/* -------------------------------------------------------------------------- */

const properties = [
  {
    id: "1",
    name: "Modern Luxury Villa",
    type: "Villa",
    price: "250000",
    location: "East Legon, Accra",
    bedrooms: 4,
    bathrooms: 5,
    description: "Luxury villa with swimming pool and modern interior.",
    image:
    "https://res.cloudinary.com/dvsdcgu9q/image/upload/q_auto/f_auto/v1778520935/cosmos_1959895835_inipve.jpg  ",
  },
  {
    id: "2",
    name: "Executive Apartment",
    type: "Penthouse",
    price: "180000",
    location: "Airport Residential, Accra",
    bedrooms: 3,
    bathrooms: 3,
    description: "Executive apartment close to the airport.",
    image:
    "https://res.cloudinary.com/dvsdcgu9q/image/upload/q_auto/f_auto/v1778520935/cosmos_1959895835_inipve.jpg  ",
  },
  {
    id: "3",
    name: "Beachfront House",
    type: "Beach House",
    price: "450000",
    location: "Labadi, Accra",
    bedrooms: 5,
    bathrooms: 6,
    description: "Beautiful beachfront property with ocean views.",
    image:
    "https://res.cloudinary.com/dvsdcgu9q/image/upload/q_auto/f_auto/v1778520935/cosmos_1959895835_inipve.jpg  ",
  },
  {
    id: "4",
    name: "Minimal Family Home",
    type: "Estate",
    price: "320000",
    location: "Cantonments, Accra",
    bedrooms: 4,
    bathrooms: 4,
    description: "Modern family home in a secure neighborhood.",
    image:
    "https://res.cloudinary.com/dvsdcgu9q/image/upload/q_auto/f_auto/v1778520935/cosmos_1959895835_inipve.jpg  ",
  },
];

/* -------------------------------------------------------------------------- */
/*                               LISTINGS PAGE                                */
/* -------------------------------------------------------------------------- */

export default function ListingsPage({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  /* ------------------------------- ALL DATA -------------------------------- */

  const allProperties = useMemo(() => properties, []);

  /* ------------------------------- FILTERS --------------------------------- */

  const [filters, setFilters] =
    useState<PropertyFilterValues>(EMPTY_FILTERS);

  /* ------------------------ LOAD FILTERS FROM URL -------------------------- */

  useEffect(() => {
    if (typeof window !== "undefined") {
      setFilters(filtersFromSearchParams(window.location.search));
    }
  }, []);

  /* ---------------------------- FILTER RESULTS ----------------------------- */

  const filteredProperties = useMemo(
    () => applyFilters(allProperties, filters),
    [allProperties, filters]
  );

  /* ------------------------------------------------------------------------ */

  return (
    <div className="min-h-screen bg-background">

      <section className="border-b border-border px-6 py-20 text-center md:px-10">
        

        <ScrollHighlightText className="mt-4 text-xl font-quicksand font-medium uppercase md:text-2xl">
          properties around you
        </ScrollHighlightText>
      </section>

      {/* FILTER SECTION */}

      <section className="mx-auto max-w-6xl px-6 py-12 md:px-10">
        <PropertyFilter
          values={filters}
          onChange={setFilters}
          onSubmit={() => {}}
        />

        <p className="mt-6 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          {filteredProperties.length}{" "}
          {filteredProperties.length === 1
            ? "property"
            : "properties"}
        </p>
      </section>

      {/* PROPERTY GRID */}

      <section className="mx-auto max-w-7xl px-6 pb-24 md:px-10">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
            />
          ))}
        </div>

        {/* EMPTY STATE */}

        {filteredProperties.length === 0 && (
          <p className="py-20 text-center text-muted-foreground">
            No properties match your filters.
          </p>
        )}
      </section>

      {/* FOOTER */}

      <Footer />
    </div>
  );
}