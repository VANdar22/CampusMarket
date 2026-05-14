import React, { useEffect, useRef, useState } from "react";
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

export const TYPES = ["Land", "House", "Apartment", "Townhouse"];

export const PRICE_RANGES = [
  { label: "Under $200k", value: "0-200000" },
  { label: "$200k – $500k", value: "200000-500000" },
  { label: "$500k – $1M", value: "500000-1000000" },
  { label: "$1M+", value: "1000000-" },
];

/* -------------------------------------------------------------------------- */
/*                               CUSTOM DROPDOWN                              */
/* -------------------------------------------------------------------------- */

function CustomDropdown({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative w-full font-inherit">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between bg-white py-4 px-5 text-sm ring-1 ring-border shadow-sm font-inherit"
      >
        <span className={value ? "text-black font-inherit" : "text-gray-400 font-inherit"}>
          {value || placeholder}
        </span>

        <ChevronDown className="h-4 w-4 text-gray-500" />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 mt-2 w-full bg-white shadow-lg ring-1 ring-border overflow-hidden font-inherit">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className="w-full text-left px-4 py-3 text-sm hover:bg-accent/60 font-inherit"
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

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
    onChange({ ...values, [key]: value });
  };

  const inputClass =
    "w-full bg-transparent py-4 pl-12 pr-5 text-sm outline-none font-inherit";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.();
      }}
      className={`grid gap-3 md:grid-cols-3 font-[quicksand] ${className ?? ""}`}
    >
      {/* SEARCH */}
      <div className="md:col-span-2 font-inherit">
        <div className="relative flex items-center bg-white shadow-sm ring-1 ring-border font-inherit">
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

      {/* TYPE */}
      <CustomDropdown
        value={values.type}
        onChange={(v) => set("type", v)}
        options={TYPES}
        placeholder="Property type"
      />

      {/* BEDROOMS */}
      <CustomDropdown
        value={values.bedrooms}
        onChange={(v) => set("bedrooms", v)}
        options={["1", "2", "3", "4", "5"]}
        placeholder="Bedrooms"
      />

      {/* BATHROOMS */}
      <CustomDropdown
        value={values.bathrooms}
        onChange={(v) => set("bathrooms", v)}
        options={["1", "2", "3", "4", "5"]}
        placeholder="Bathrooms"
      />


      {/* BUTTON */}
      <button
        type="submit"
        className="bg-[#145a98] px-8 py-4 text-lg font-semibold border border-accent uppercase tracking-[0.3em] text-accent transition hover:bg-white hover:text-[#145a98] font-inherit"
      >
        Search
      </button>
    </form>
  );
}

/* -------------------------------------------------------------------------- */
/*                               FILTER LOGIC                                 */
/* -------------------------------------------------------------------------- */

const extractNumber = (value: any): number => {
  if (!value) return 0;
  const match = String(value).match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
};

export function parsePrice(price: string): number {
  const n = Number((price ?? "0").replace(/,/g, ""));
  return isNaN(n) ? 0 : n;
}

export function applyFilters<T extends {
  name?: string;
  location?: string;
  type?: string;
  property_type?: string;
  bedrooms?: number | string;
  bathrooms?: number | string;
  price?: string;
  description?: string;
}>(items: T[], filters: PropertyFilterValues): T[] {
  return items.filter((property) => {
    const name = (property.name ?? "").toLowerCase();
    const location = (property.location ?? "").toLowerCase();
    const description = (property.description ?? "").toLowerCase();

    if (filters.q) {
      const q = filters.q.toLowerCase();
      if (!(name.includes(q) || location.includes(q) || description.includes(q))) {
        return false;
      }
    }

    if (
      filters.location &&
      !location.includes(filters.location.toLowerCase())
    ) return false;

    if (filters.type) {
      const rawType = property.type ?? property.property_type ?? "";
      const propertyType = String(rawType).toLowerCase().trim();
      const filterType = filters.type.toLowerCase().trim();

      if (propertyType !== filterType) return false;
    }

    if (
      filters.bedrooms &&
      extractNumber(property.bedrooms) < Number(filters.bedrooms)
    ) return false;

    if (
      filters.bathrooms &&
      extractNumber(property.bathrooms) < Number(filters.bathrooms)
    ) return false;

    if (filters.price) {
      const [minS, maxS] = filters.price.split("-");
      const min = Number(minS) || 0;
      const max = maxS ? Number(maxS) : Infinity;

      const value = parsePrice(property.price ?? "0");

      if (value < min || value > max) return false;
    }

    return true;
  });
}

/* -------------------------------------------------------------------------- */
/*                             SEARCH PARAMS                                  */
/* -------------------------------------------------------------------------- */

export function filtersFromSearchParams(search: string): PropertyFilterValues {
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