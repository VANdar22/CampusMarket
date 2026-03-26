import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
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

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault(); // prevent Link's default navigation

    // Increment views via RPC (fire-and-forget, no auth needed)
    supabase.rpc("increment_views", { product_id: product.id });

    // Navigate to product detail page
    navigate(`/product/${product.id}`);
  };

  return (
    <div onClick={handleClick}>
      <Card className="border-none shadow-none bg-transparent group cursor-pointer">
        <CardContent className="p-0">
          {/* Image */}
          <div className="aspect-square mb-3 overflow-hidden bg-muted/10 relative">
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
              <div className="flex h-full w-full items-center justify-center text-muted-foreground">
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
    </div>
  );
}