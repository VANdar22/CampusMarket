import React from "react";
import { Search, ChevronDown } from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

export type PropertyFilterValues = {
  q: string;
  location: string;
  type: string;
  bedrooms: string;
  bathrooms: string;
  price: string;
};

export const EMPTY_FILTERS: PropertyFilterValues = {
  q: "",
  location: "",
  type: "",
  bedrooms: "",
  bathrooms: "",
  price: "",
};

/* -------------------------------------------------------------------------- */
/*                                   OPTIONS                                  */
/* -------------------------------------------------------------------------- */

export const LOCATIONS = [
  "East Legon",
  "Airport Residential",
  "Labadi",
  "Cantonments",
];

export const TYPES = [
  "Villa",
  "Penthouse",
  "Estate",
  "Beach House",
];

export const PRICE_RANGES = [
  { label: "Under $200k", value: "0-200000" },
  { label: "$200k – $500k", value: "200000-500000" },
  { label: "$500k – $1M", value: "500000-1000000" },
  { label: "$1M+", value: "1000000-" },
];

/* -------------------------------------------------------------------------- */
/*                                    PROPS                                   */
/* -------------------------------------------------------------------------- */

type Props = {
  values: PropertyFilterValues;
  onChange: (next: PropertyFilterValues) => void;
  onSubmit?: () => void;
  className?: string;
};

/* -------------------------------------------------------------------------- */
/*                                   FIELD                                    */
/* -------------------------------------------------------------------------- */

function Field({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex items-center  bg-white shadow-sm ring-1 ring-border">
      {children}

      <ChevronDown className="pointer-events-none absolute right-5 h-4 w-4 text-muted-foreground" />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                              FILTER COMPONENT                              */
/* -------------------------------------------------------------------------- */

export function PropertyFilter({
  values,
  onChange,
  onSubmit,
  className,
}: Props) {
  const set = <K extends keyof PropertyFilterValues>(
    key: K,
    value: PropertyFilterValues[K]
  ) => {
    onChange({
      ...values,
      [key]: value,
    });
  };

  const selectClass =
    "w-full appearance-none bg-transparent py-4 pl-5 pr-12 text-sm outline-none";

  const inputClass =
    "w-full bg-transparent py-4 pl-12 pr-5 text-sm outline-none";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.();
      }}
      className={`grid gap-3 md:grid-cols-3 ${className ?? ""}`}
    >
      {/* SEARCH */}

      <div className="md:col-span-2">
        <div className="relative flex items-center  bg-white shadow-sm ring-1 ring-border">
          <Search className="absolute left-5 h-4 w-4 text-muted-foreground" />

          <input
            type="text"
            placeholder="Search property..."
            value={values.q}
            onChange={(e) => set("q", e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      {/* LOCATION */}

      <Field>
        <select
          value={values.location}
          onChange={(e) => set("location", e.target.value)}
          className={selectClass}
        >
          <option value="">Location</option>

          {LOCATIONS.map((location) => (
            <option
              key={location}
              value={location}
            >
              {location}
            </option>
          ))}
        </select>
      </Field>

      {/* TYPE */}

      <Field>
        <select
          value={values.type}
          onChange={(e) => set("type", e.target.value)}
          className={selectClass}
        >
          <option value="">Property type</option>

          {TYPES.map((type) => (
            <option
              key={type}
              value={type}
            >
              {type}
            </option>
          ))}
        </select>
      </Field>

      {/* BEDROOMS */}

      <Field>
        <select
          value={values.bedrooms}
          onChange={(e) => set("bedrooms", e.target.value)}
          className={selectClass}
        >
          <option value="">Bedrooms</option>

          {[1, 2, 3, 4, 5].map((n) => (
            <option
              key={n}
              value={n}
            >
              {n}+ beds
            </option>
          ))}
        </select>
      </Field>

      {/* BATHROOMS */}

      <Field>
        <select
          value={values.bathrooms}
          onChange={(e) => set("bathrooms", e.target.value)}
          className={selectClass}
        >
          <option value="">Bathrooms</option>

          {[1, 2, 3, 4, 5].map((n) => (
            <option
              key={n}
              value={n}
            >
              {n}+ baths
            </option>
          ))}
        </select>
      </Field>

      {/* PRICE */}

      <div className="md:col-span-2">
        <Field>
          <select
            value={values.price}
            onChange={(e) => set("price", e.target.value)}
            className={selectClass}
          >
            <option value="">Price range</option>

            {PRICE_RANGES.map((price) => (
              <option
                key={price.value}
                value={price.value}
              >
                {price.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      {/* BUTTON */}

      <button
        type="submit"
        className=" bg-[#145a98] px-8 py-4 text-lg font-[aboreto] font-medium uppercase tracking-[0.3em] text-accent transition hover:opacity-90"
      >
        Search
      </button>
    </form>
  );
}

/* -------------------------------------------------------------------------- */
/*                               FILTER LOGIC                                 */
/* -------------------------------------------------------------------------- */

export function parsePrice(price: string): number {
  return Number(price.replace(/,/g, ""));
}

export function applyFilters<
  T extends {
    name: string;
    location: string;
    type: string;
    bedrooms: number;
    bathrooms: number;
    price: string;
    description: string;
  },
>(
  items: T[],
  filters: PropertyFilterValues
): T[] {
  return items.filter((property) => {
    if (filters.q) {
      const q = filters.q.toLowerCase();

      if (
        !property.name.toLowerCase().includes(q) &&
        !property.location.toLowerCase().includes(q) &&
        !property.description.toLowerCase().includes(q)
      ) {
        return false;
      }
    }

    if (
      filters.location &&
      !property.location
        .toLowerCase()
        .includes(filters.location.toLowerCase())
    ) {
      return false;
    }

    if (
      filters.type &&
      property.type !== filters.type
    ) {
      return false;
    }

    if (
      filters.bedrooms &&
      property.bedrooms < Number(filters.bedrooms)
    ) {
      return false;
    }

    if (
      filters.bathrooms &&
      property.bathrooms < Number(filters.bathrooms)
    ) {
      return false;
    }

    if (filters.price) {
      const [minS, maxS] =
        filters.price.split("-");

      const min = Number(minS) || 0;

      const max = maxS
        ? Number(maxS)
        : Infinity;

      const value = parsePrice(property.price);

      if (value < min || value > max) {
        return false;
      }
    }

    return true;
  });
}

/* -------------------------------------------------------------------------- */
/*                             SEARCH PARAMS                                  */
/* -------------------------------------------------------------------------- */

export function filtersFromSearchParams(
  search: string
): PropertyFilterValues {
  const sp = new URLSearchParams(search);

  return {
    q: sp.get("q") ?? "",
    location: sp.get("location") ?? "",
    type: sp.get("type") ?? "",
    bedrooms: sp.get("bedrooms") ?? "",
    bathrooms: sp.get("bathrooms") ?? "",
    price: sp.get("price") ?? "",
  };
}