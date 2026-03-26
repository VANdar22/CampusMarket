import { useState, useRef, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ProductCard } from "@/components/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { Database } from "@/integrations/supabase/types";

type Product = Database["public"]["Tables"]["products"]["Row"];

export default function CategoryPage() {
  type CategoryType =

    | "books"
    | "electronics"
    | "fashion"
    | "hostel_items"
    | "stationery"
    | "sports"
    | "other";

  const { category } = useParams<{ category: CategoryType }>();
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedSchool, setSelectedSchool] = useState(
    searchParams.get("school") || "All"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");

  const schools = ["All", "KNUST", "Legon", "UCC", "UDS", "UHAS"];
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSchoolChange = (school: string) => {
    setSelectedSchool(school);
    const params = new URLSearchParams(searchParams.toString());
    if (school === "All") {
      params.delete("school");
    } else {
      params.set("school", school);
    }
    setSearchParams(params);
    setDropdownOpen(false);
  };

  const { data: products, isLoading } = useQuery({
    queryKey: [
      "categoryProducts",
      category,
      minPrice,
      maxPrice,
      selectedSchool,
    ],
    queryFn: async () => {
      let query = supabase
        .from("products")
        .select("*")
        .eq("is_sold", false)
        .eq("category", category)
        .order("created_at", { ascending: false });

      if (category) {
        query = query.eq("category", category); // only filter if category is defined
      }
      if (minPrice !== "") query = query.gte("price", minPrice);
      if (maxPrice !== "") query = query.lte("price", maxPrice);
      if (selectedSchool !== "All") query = query.eq("school", selectedSchool);

      const { data, error } = await query;
      if (error) throw error;

      return data as Product[];
    },
  });

  const filtered = products?.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col space-y-6">
      {/* Page Title */}
      <h1 className="text-3xl font-light text-center mb-4">
        {category?.charAt(0).toUpperCase() + category?.slice(1)}
      </h1>

      {/* Filters: School, Search, Min/Max Price */}
      <div className="flex flex-col md:flex-row items-center gap-4 justify-center">
        {/* Custom School Dropdown */}
        <div ref={dropdownRef} className="relative w-full md:w-48">
          <button
            type="button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="
              w-full flex justify-between items-center px-4 py-3
              bg-background text-foreground border border-border text-md
              focus:outline-none focus:ring-2 focus:ring-primary
            "
          >
            {selectedSchool}
            <ChevronDown className="w-5 h-5 text-primary" />
          </button>

          {dropdownOpen && (
            <ul className="absolute z-50 mt-1 w-full bg-background border border-border rounded-md shadow-lg">
              {schools.map((school) => (
                <li
                  key={school}
                  onClick={() => handleSchoolChange(school)}
                  className={`
                    px-4 py-2 cursor-pointer text-md
                    ${selectedSchool === school
                      ? "bg-primary/70"
                      : " hover:bg-secondary"
                    }
                  `}
                >
                  {school}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Search Bar */}
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search within this category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 py-3 rounded-md w-full"
          />
        </div>

        {/* Min/Max Price */}
        <div className="flex gap-2 w-full md:w-auto">
          <Input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) =>
              setMinPrice(e.target.value ? Number(e.target.value) : "")
            }
            className="w-24 rounded-md py-3 text-sm"
          />
          <Input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) =>
              setMaxPrice(e.target.value ? Number(e.target.value) : "")
            }
            className="w-24 rounded-md py-3 text-sm"
          />
        </div>
      </div>

      {/* Products Grid */}
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="aspect-square rounded-xl" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : filtered && filtered.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground text-center mt-6">
          No products found in this category and school.
        </p>
      )}
    </div>
  );
}