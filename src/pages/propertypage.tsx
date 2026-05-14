import { useEffect, useMemo, useState } from "react";

import Footer from "@/components/ui/footer";
import { PropertyCard } from "@/components/PropertyCard";
import ScrollHighlightText from "@/components/ScrollHighlightText";

import { getProperties } from "@/services/properties";

import {
  PropertyFilter,
  EMPTY_FILTERS,
  applyFilters,
  filtersFromSearchParams,
  type PropertyFilterValues,
} from "@/components/PropertyFilter";

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
  /* ------------------------------- STATE -------------------------------- */

  const [allProperties, setAllProperties] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  const [filters, setFilters] =
    useState<PropertyFilterValues>(EMPTY_FILTERS);

  /* -------------------------- FETCH PROPERTIES --------------------------- */

  useEffect(() => {
    async function loadProperties() {
      try {
        const data = await getProperties();

        setAllProperties(data || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    loadProperties();
  }, []);

  /* ------------------------ LOAD FILTERS FROM URL ------------------------ */

  useEffect(() => {
    if (typeof window !== "undefined") {
      setFilters(
        filtersFromSearchParams(window.location.search)
      );
    }
  }, []);

  /* --------------------------- FILTER RESULTS ---------------------------- */

  const filteredProperties = useMemo(
    () => applyFilters(allProperties, filters),
    [allProperties, filters]
  );

  /* ------------------------------ LOADING ------------------------------- */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-accent font-semibold font-[aboreto] text-3xl">
          Loading properties...
        </p>
      </div>
    );
  }

  /* ---------------------------------------------------------------------- */

  return (
    <div className="min-h-screen bg-background">
      {/* HERO SECTION */}

      <section className="border-b border-border px-6 py-20 text-center md:px-10">
        
        <ScrollHighlightText className="mt-4 text-xl font-quicksand font-medium uppercase md:text-2xl">
          Find your dream property
        </ScrollHighlightText>
      </section>

      {/* FILTER SECTION */}

      <section className="mx-auto max-w-6xl px-6 py-4 md:px-10">
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
          <p className="py-20 text-center text-accent font-semibold font-[aboreto] text-3xl">
            No properties match your filters.
          </p>
        )}
      </section>

      {/* FOOTER */}

      <Footer />
    </div>
  );
}