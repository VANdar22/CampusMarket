import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ProductCard } from "@/components/ProductCard";
import { CategoryFilter } from "@/components/CategoryFilter";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/EmptyState";
import type { Database } from "@/integrations/supabase/types";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import Footer from "@/components/ui/footer";
import HeroCarousel from "@/components/Header";
import { Button } from "@/components/ui/button";

type Product = Database["public"]["Tables"]["products"]["Row"];

export default function Index() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [mobilePage, setMobilePage] = useState(1);

  const ITEMS_PER_PAGE_MOBILE = 8;

  /* =========================
     POPULAR PRODUCTS (MAX 12)
  ========================== */
  const productSelect = "id,title,price,category,image_urls,image_url,is_negotiable,views";

  const { data: popularProducts, isLoading: isLoadingPopular } = useQuery({
    queryKey: ["popularProducts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select(productSelect)
        .eq("is_sold", false)
        .order("views", { ascending: false })
        .limit(12);

      if (error) throw error;
      return data as Product[];
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  /* =========================
     NEW ITEMS (MAX 20)
  ========================== */
  const { data: newProducts, isLoading: isLoadingNew } = useQuery({
    queryKey: ["newProducts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select(productSelect)
        .eq("is_sold", false)
        .order("created_at", { ascending: false })
        .limit(20);

      if (error) throw error;
      return data as Product[];
    },
    staleTime: 2 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  /* =========================
     SEARCH (SEPARATE)
  ========================== */
  const { data: searchedProducts, isLoading: isSearching } = useQuery({
    queryKey: ["searchedProducts", searchParams.get("q")],
    queryFn: async () => {
      const query = searchParams.get("q");
      if (!query) return [];

      const { data, error } = await supabase
        .from("products")
        .select(productSelect)
        .eq("is_sold", false)
        .or(`title.ilike.%${query}%,description.ilike.%${query}%`);

      if (error) throw error;
      return data as Product[];
    },
    enabled: !!searchParams.get("q"),
  });

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    if (value.trim()) setSearchParams({ q: value });
    else setSearchParams({});
  };

  /* Mobile pagination logic */
  const displayedNewProducts = newProducts?.slice(
    0,
    mobilePage * ITEMS_PER_PAGE_MOBILE
  );

  const canLoadMore =
    newProducts && displayedNewProducts.length < newProducts.length;

  return (
    <div className="min-h-screen flex flex-col">

      <div className="flex-1 mx-auto max-w-7xl px-4 py-6 space-y-6">
        <div className="mb-4 text-center py-16">
          <h1 className="text-3xl md:text-5xl font-light text-foreground mb-3">
            CampusMarket
          </h1>
          <p className="text-muted-foreground font-light text-lg mb-8">
            Buy and sell with students on your campus
          </p>
        </div>
        {/* HERO */}

        {/* CATEGORY */}
        <CategoryFilter selected="" />

        {/* SEARCH */}
        <div className="max-w-xl mx-auto relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search for textbooks, electronics..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-12 h-12 rounded-none border-border font-light"
          />
        </div>

        {/* =========================
            SEARCH RESULTS ONLY
        ========================== */}
        {searchParams.get("q") && (
          <section>
            <h2 className="text-2xl font-light mb-6">Search Results for '{searchQuery}'</h2>

            {isSearching ? (
              <SkeletonGrid />
            ) : searchedProducts && searchedProducts.length > 0 ? (
              <ProductGrid products={searchedProducts} />
            ) : (
              <EmptyState
                emoji="🔍"
                title="No products found"
                description={`We couldn't find anything matching "${searchQuery}". Try a different search term.`}
              />
            )}
          </section>
        )}
        
        {/* =========================
            POPULAR (MAX 12)
        ========================== */}
        {!searchParams.get("q") && (
          <section>
            <h2 className="text-2xl font-light mb-6">Popular products</h2>

            {isLoadingPopular ? (
              <SkeletonGrid />
            ) : (
              <ProductGrid products={popularProducts || []} />
            )}
          </section>
        )}

      
        <HeroCarousel />
          {/* =========================
            NEW ITEMS (NOT FILTERED)
        ========================== */}
        {!searchParams.get("q") && (
          <section>
            <h2 className="text-2xl font-light mb-6">Recent listed items</h2>

            {isLoadingNew ? (
              <SkeletonGrid />
            ) : (
              <>
                <ProductGrid products={displayedNewProducts || []} />

                {/* Mobile Load More */}
                {canLoadMore && (
                  <div className="text-center mt-6 md:hidden">
                    <Button
                      variant="outline"
                      onClick={() => setMobilePage((prev) => prev + 1)}
                    >
                      Load More
                    </Button>
                  </div>
                )}
              </>
            )}
          </section>
        )}

<Footer />

      </div>

    </div>
  );
}

/* =========================
   REUSABLE GRID COMPONENT
========================== */
function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

/* =========================
   SKELETON GRID
========================== */
function SkeletonGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="aspect-square rounded-xl" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  );
}