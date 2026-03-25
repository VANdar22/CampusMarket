import { useState , useEffect } from "react";
import { useSearchParams , useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ProductCard } from "@/components/ProductCard";
import { CategoryFilter } from "@/components/CategoryFilter";
import { Slider } from "@/components/ui/slider";
import { Skeleton } from "@/components/ui/skeleton";
import type { Database } from "@/integrations/supabase/types";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import Footer from "@/components/ui/footer";

type Product = Database["public"]["Tables"]["products"]["Row"];

export default function Index() {
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  

  const { data: products, isLoading } = useQuery({
    queryKey: ["products", category, priceRange],
    queryFn: async () => {
      let query = supabase
        .from("products")
        .select("*")
        .eq("is_sold", false)
        .gte("price", priceRange[0])
        .lte("price", priceRange[1])
        .order("created_at", { ascending: false });

      if (category !== "all") {
        query = query.eq("category", category as Product["category"]);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Product[];
    },
  });
  const handleSearch = (value: string) => {
    setSearchQuery(value);
    if (value) {
      setSearchParams({ q: value });
    } else {
      setSearchParams({});
    }
  };

  const filtered = products?.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      
      {/* MAIN CONTENT */}
      <div className="flex-1 mx-auto max-w-7xl px-4 py-6 space-y-6">
  
        <div className="mb-12 text-center py-16">
          <h1 className="text-3xl md:text-5xl font-light text-foreground mb-3">
            CampusMarket
          </h1>
          <p className="text-muted-foreground font-light text-lg mb-8">
            Buy and sell with students on your campus
          </p>
  
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search for textbooks, electronics, furniture..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-12 h-12 rounded-none border-border font-light"
            />
          </div>
        </div>
  
        <CategoryFilter selected={category} onSelect={setCategory} />
  
        <div className="flex items-center gap-4 rounded-xl bg-card p-4 border">
          <span className="text-sm font-medium text-muted-foreground shrink-0">
            Price:
          </span>
          <Slider
            min={0}
            max={500}
            step={5}
            value={priceRange}
            onValueChange={setPriceRange}
            className="flex-1"
          />
          <span className="text-sm font-medium text-foreground shrink-0 min-w-[90px] text-right">
            GHS{priceRange[0]} – GHS{priceRange[1]}
          </span>
        </div>
  
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="aspect-square rounded-xl" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : filtered && filtered.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground font-light mb-2">
              No products found
            </p>
            <p className="text-sm text-muted-foreground font-light">
              Try adjusting your filters or be the first to list something!
            </p>
          </div>
        )}
  
      </div>
  
      {/* ✅ FOOTER (always at bottom) */}
      <Footer />
  
    </div>
  );
}