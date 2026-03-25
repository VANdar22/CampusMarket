import { Link } from "react-router-dom";
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
  return (
    <Link to={`/product/${product.id}`}>
      <Card className="border-none shadow-none bg-transparent group cursor-pointer">
        <CardContent className="p-0">
          
          {/* Image */}
          <div className="aspect-square mb-3 overflow-hidden bg-muted/10 relative">
          {product.image_urls && product.image_urls.length > 0 ? (
  <img
    src={product.image_urls[0]} // ✅ first image
    alt={product.title}
    className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
  />
) : product.image_url ? (
  <img
    src={product.image_url} // fallback (old data)
    alt={product.title}
    className="w-full h-full object-cover"
  />
) : (
  <div className="flex h-full w-full items-center justify-center text-muted-foreground">
    No image
  </div>
)}
          </div>

          {/* Content */}
          <div className="space-y-1">
            
            {/* Category (clean text like second design) */}
            <p className="text-sm font-light text-muted-foreground">
              {categoryLabels[product.category]?.replace(/^.+\s/, "") || product.category}
            </p>

            {/* Title + Price */}
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium text-foreground truncate">
                {product.title}
              </h3>
              <p className="text-sm font-light text-foreground ml-2">
                GHS {Number(product.price).toFixed(2)}
              </p>
            </div>

            {/* Keep original logic (Negotiable badge) */}
            {product.is_negotiable && (
              <Badge
                variant="outline"
                className="text-xs font-normal text-primary border-primary/30 mt-1"
              >
                Negotiable
              </Badge>
            )}
          </div>

        </CardContent>
      </Card>
    </Link>
  );
}