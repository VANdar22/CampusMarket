import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { WishlistButton } from "@/components/WishlistButton";
import type { Database } from "@/integrations/supabase/types";

type Product = Database["public"]["Tables"]["products"]["Row"];

const categoryLabels: Record<string, string> = {
  books: "📚 Books",
  electronics: "💻 Electronics",
  fashion: "👕 Fashion",
  hostel_items: "🏠 Hostel Items",
  stationery: "✏️ Stationery",
  sports: "⚽ Sports",
  other: "📦 Other",
};

export function ProductCard({ product }: { product: Product }) {
  const navigate = useNavigate();

  // Increment views function
  const incrementViews = async () => {
    console.log("🟡 Incrementing views for:", product.id);
    try {
      // 🔹 RPC Method (recommended)
      const { data, error } = await supabase.rpc("increment_views", {
        product_id: product.id,
      });
      console.log("📦 RPC response:", { data, error });

      if (error) {
        console.error("❌ RPC failed:", error.message);

        // 🔻 Fallback: direct update (for debugging)
        const { data: fallbackData, error: fallbackError } = await supabase
          .from("products")
          .update({ views: (product.views || 0) + 1 })
          .eq("id", product.id)
          .select();

        console.log("📦 Fallback result:", { fallbackData, fallbackError });
      } else {
        console.log("✅ RPC succeeded");
      }
    } catch (err) {
      console.error("🔥 Unexpected error:", err);
    }
  };

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();

    console.log("🟢 Product card clicked");
    console.log("➡️ Product ID:", product.id);
    console.log("➡️ Current views:", product.views);

    await incrementViews();

    console.log("➡️ Navigating to product detail page...");
    navigate(`/product/${product.id}`);
  };

  return (
    <Card
      onClick={handleClick} // ✅ Attach click directly to Card
      className="border-none shadow-none bg-transparent group cursor-pointer"
    >
      <CardContent className="p-0">
        {/* Image */}
        <div className="aspect-square mb-3 overflow-hidden bg-muted/10 relative">
          {/* Wishlist Button */}
          {/* Wishlist Button */}
<div
  className="absolute top-2 right-2 z-10"
  onClick={(e) => e.stopPropagation()} // Prevent card click when wishlist is clicked
>
  <WishlistButton productId={product.id} />
</div>

          {product.image_urls && product.image_urls.length > 0 ? (
            <img
              src={product.image_urls[0]}
              alt={product.title}
              loading="lazy"
              className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
            />
          ) : product.image_url ? (
            <img
              src={product.image_url}
              alt={product.title}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-muted-foreground text-sm">
              No image
            </div>
          )}
        </div>

        {/* Content */}
        <div className="space-y-1 sm:space-y-2">
          <p className="text-xs sm:text-sm font-light text-muted-foreground">
            {categoryLabels[product.category]?.replace(/^.+\s/, "") ||
              product.category}
          </p>

          <div className="flex flex-wrap justify-between items-center gap-1">
            <h3 className="text-sm sm:text-base font-medium text-foreground line-clamp-2">
              {product.title}
            </h3>
            <p className="text-xs sm:text-sm font-light text-foreground">
              GHS {Number(product.price).toFixed(2)}
            </p>
          </div>

          {product.is_negotiable && (
            <Badge
              variant="outline"
              className="text-[10px] sm:text-xs font-normal text-primary border-primary/30 mt-1"
            >
              Negotiable
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}