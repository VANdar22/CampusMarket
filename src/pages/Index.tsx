import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ProductCard } from "@/components/ProductCard";
import { CategoryFilter } from "@/components/CategoryFilter";
import { Slider } from "@/components/ui/slider";
import { Skeleton } from "@/components/ui/skeleton";
import type { Database } from "@/integrations/supabase/types";

type Product = Database["public"]["Tables"]["products"]["Row"];

export default function Index() {
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const searchParams = new URLSearchParams(window.location.search);
  const searchQuery = searchParams.get("q") || "";

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

  const filtered = products?.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 space-y-6">
      {/* Hero */}
      <section className="rounded-2xl bg-gradient-to-br from-primary/10 via-accent to-primary/5 p-8 md:p-12">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
          Student Marketplace
        </h1>
        <p className="text-muted-foreground text-lg max-w-lg">
          Buy, sell, and negotiate with fellow students. Find great deals on campus.
        </p>
      </section>

      {/* Categories */}
      <CategoryFilter selected={category} onSelect={setCategory} />

      {/* Price filter */}
      <div className="flex items-center gap-4 rounded-xl bg-card p-4 border">
        <span className="text-sm font-medium text-muted-foreground shrink-0">Price:</span>
        <Slider
          min={0}
          max={500}
          step={5}
          value={priceRange}
          onValueChange={setPriceRange}
          className="flex-1"
        />
        <span className="text-sm font-medium text-foreground shrink-0 min-w-[90px] text-right">
          £{priceRange[0]} – £{priceRange[1]}
        </span>
      </div>

      {/* Products Grid */}
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
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <span className="text-5xl mb-4">🛒</span>
          <h2 className="text-xl font-semibold text-foreground mb-2">No products found</h2>
          <p className="text-muted-foreground">Try adjusting your filters or check back later.</p>
        </div>
      )}
    </div>
  );
}
