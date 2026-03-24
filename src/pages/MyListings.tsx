import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Edit, Plus, Trash2 } from "lucide-react";
import { useEffect } from "react";

export default function MyListings() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!user) navigate("/auth");
  }, [user, navigate]);

  const { data: products, isLoading } = useQuery({
    queryKey: ["my-products", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const deleteProduct = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-products"] });
      toast({ title: "Product deleted" });
    },
  });

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold text-foreground">My Listings</h1>
        </div>
        <Button onClick={() => navigate("/post")} className="gap-1.5">
          <Plus className="h-4 w-4" /> New
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))}
        </div>
      ) : products && products.length > 0 ? (
        <div className="space-y-3">
          {products.map((product) => (
            <Card key={product.id} className="border overflow-hidden">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="h-16 w-16 rounded-lg bg-muted overflow-hidden shrink-0">
                  {product.image_url ? (
                    <img src={product.image_url} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-2xl">📦</div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">{product.title}</p>
                  <p className="text-sm font-semibold text-primary">£{Number(product.price).toFixed(2)}</p>
                  {product.is_sold && <Badge variant="destructive" className="mt-1 text-xs">Sold</Badge>}
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button variant="outline" size="icon" onClick={() => navigate(`/edit-product/${product.id}`)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => deleteProduct.mutate(product.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <span className="text-5xl mb-4">📦</span>
          <h2 className="text-lg font-semibold">No listings yet</h2>
          <p className="text-muted-foreground mb-4">Start selling by listing your first product.</p>
          <Button onClick={() => navigate("/post")}>List a Product</Button>
        </div>
      )}
    </div>
  );
}
