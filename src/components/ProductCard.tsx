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
      <Card className="group overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        <div className="aspect-square overflow-hidden bg-muted">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-4xl text-muted-foreground">
              📦
            </div>
          )}
        </div>
        <CardContent className="p-4 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-medium text-sm line-clamp-2 text-foreground">{product.title}</h3>
          </div>
          <p className="text-lg font-bold text-primary">£{Number(product.price).toFixed(2)}</p>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs font-normal">
              {categoryLabels[product.category] || product.category}
            </Badge>
            {product.is_negotiable && (
              <Badge variant="outline" className="text-xs font-normal text-primary border-primary/30">
                Negotiable
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
