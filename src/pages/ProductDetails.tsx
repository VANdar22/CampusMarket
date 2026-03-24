import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, MessageCircle, Tag, User } from "lucide-react";

const categoryLabels: Record<string, string> = {
  books: "📚 Books",
  electronics: "💻 Electronics",
  fashion: "👕 Fashion",
  hostel_items: "🏠 Hostel Items",
  stationery: "✏️ Stationery",
  sports: "⚽ Sports",
  other: "📦 Other",
};

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id!)
        .single();
      if (error) throw error;
      return data;
    },
  });

  const { data: seller } = useQuery({
    queryKey: ["seller", product?.user_id],
    enabled: !!product?.user_id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", product!.user_id)
        .single();
      if (error) throw error;
      return data;
    },
  });

  const handleMessageSeller = async () => {
    if (!user) {
      navigate("/auth");
      return;
    }
    if (!product) return;

    // Check if conversation exists
    const { data: existing } = await supabase
      .from("conversations")
      .select("id")
      .eq("product_id", product.id)
      .eq("buyer_id", user.id)
      .maybeSingle();

    if (existing) {
      navigate(`/chat/${existing.id}`);
      return;
    }

    // Create new conversation
    const { data: conv, error } = await supabase
      .from("conversations")
      .insert({
        product_id: product.id,
        buyer_id: user.id,
        seller_id: product.user_id,
      })
      .select()
      .single();

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }

    navigate(`/chat/${conv.id}`);
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-6 space-y-6">
        <Skeleton className="h-8 w-32" />
        <div className="grid md:grid-cols-2 gap-8">
          <Skeleton className="aspect-square rounded-2xl" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <span className="text-5xl mb-4">🔍</span>
        <h2 className="text-xl font-semibold">Product not found</h2>
      </div>
    );
  }

  const isOwner = user?.id === product.user_id;

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 space-y-6">
      <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2">
        <ArrowLeft className="h-4 w-4" /> Back
      </Button>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="aspect-square overflow-hidden rounded-2xl bg-muted">
          {product.image_url ? (
            <img src={product.image_url} alt={product.title} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-6xl">📦</div>
          )}
        </div>

        <div className="space-y-5">
          <div>
            <Badge variant="secondary" className="mb-3">
              {categoryLabels[product.category] || product.category}
            </Badge>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">{product.title}</h1>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-primary">£{Number(product.price).toFixed(2)}</span>
            {product.is_negotiable && (
              <Badge variant="outline" className="text-primary border-primary/30 gap-1">
                <Tag className="h-3 w-3" /> Negotiable
              </Badge>
            )}
          </div>

          {product.description && (
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>
          )}

          {seller && (
            <Card className="p-4 flex items-center gap-3 border">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm text-foreground">{seller.display_name || "Anonymous"}</p>
                <p className="text-xs text-muted-foreground">Seller</p>
              </div>
            </Card>
          )}

          {!isOwner && (
            <div className="flex gap-3 pt-2">
              <Button onClick={handleMessageSeller} className="flex-1 gap-2">
                <MessageCircle className="h-4 w-4" /> Message Seller
              </Button>
              <Button variant="outline" onClick={handleMessageSeller} className="flex-1 gap-2">
                <Tag className="h-4 w-4" /> Make Offer
              </Button>
            </div>
          )}

          {isOwner && (
            <Button variant="outline" onClick={() => navigate(`/edit-product/${product.id}`)} className="w-full">
              Edit Listing
            </Button>
          )}

          {product.is_sold && (
            <Badge variant="destructive" className="text-base px-4 py-2">SOLD</Badge>
          )}
        </div>
      </div>
    </div>
  );
}
