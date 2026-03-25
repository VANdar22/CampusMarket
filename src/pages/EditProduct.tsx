import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type ProductCategory = Database["public"]["Enums"]["product_category"];

const categories: { value: ProductCategory; label: string }[] = [
  { value: "books", label: "📚 Books" },
  { value: "electronics", label: "💻 Electronics" },
  { value: "fashion", label: "👕 Fashion" },
  { value: "hostel_items", label: "🏠 Hostel Items" },
  { value: "stationery", label: "✏️ Stationery" },
  { value: "sports", label: "⚽ Sports" },
  { value: "other", label: "📦 Other" },
];

export default function EditProduct() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<ProductCategory>("other");
  const [price, setPrice] = useState("");
  const [isNegotiable, setIsNegotiable] = useState(true);
  const [isSold, setIsSold] = useState(false);

  useEffect(() => {
    if (!user) { navigate("/auth"); return; }
    supabase
      .from("products")
      .select("*")
      .eq("id", id!)
      .single()
      .then(({ data }) => {
        if (data) {
          setTitle(data.title);
          setDescription(data.description || "");
          setCategory(data.category);
          setPrice(String(data.price));
          setIsNegotiable(data.is_negotiable);
          setIsSold(data.is_sold);
        }
      });
  }, [id, user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase
      .from("products")
      .update({
        title,
        description,
        category,
        price: parseFloat(price),
        is_negotiable: isNegotiable,
        is_sold: isSold,
      })
      .eq("id", id!);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Product updated!" });
      navigate("/my-listings");
    }
    setLoading(false);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 space-y-6">
      <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2">
        <ArrowLeft className="h-4 w-4" /> Back
      </Button>

      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Edit Product</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={4} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={category} onValueChange={(v) => setCategory(v as ProductCategory)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price (GHS)</Label>
                <Input id="price" type="number" min="0" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required />
              </div>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <Label>Negotiable</Label>
                <p className="text-xs text-muted-foreground">Allow offers</p>
              </div>
              <Switch checked={isNegotiable} onCheckedChange={setIsNegotiable} />
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <Label>Mark as Sold</Label>
                <p className="text-xs text-muted-foreground">Remove from active listings</p>
              </div>
              <Switch checked={isSold} onCheckedChange={setIsSold} />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
