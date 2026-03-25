import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Upload, X } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type ProductCategory =
  Database["public"]["Enums"]["product_category"];

const categories: { value: ProductCategory; label: string }[] = [
  { value: "books", label: "📚 Books" },
  { value: "electronics", label: "💻 Electronics" },
  { value: "fashion", label: "👕 Fashion" },
  { value: "hostel_items", label: "🏠 Hostel Items" },
  { value: "stationery", label: "✏️ Stationery" },
  { value: "sports", label: "⚽ Sports" },
  { value: "other", label: "📦 Other" },
];

export default function PostProduct() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] =
    useState<ProductCategory>("other");
  const [price, setPrice] = useState("");
  const [isNegotiable, setIsNegotiable] = useState(true);

  // ✅ MULTIPLE IMAGES
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(e.target.files || []).slice(0, 5);

    setImageFiles(files);

    const previews = files.map((file) =>
      URL.createObjectURL(file)
    );
    setImagePreviews(previews);
  };

  // ❌ remove image
  const removeImage = (index: number) => {
    const newFiles = [...imageFiles];
    const newPreviews = [...imagePreviews];

    newFiles.splice(index, 1);
    newPreviews.splice(index, 1);

    setImageFiles(newFiles);
    setImagePreviews(newPreviews);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);

    try {
      let image_urls: string[] = [];

      // ✅ upload all images
      for (const file of imageFiles) {
        const ext = file.name.split(".").pop();
        const path = `${user.id}/${Date.now()}-${Math.random()}.${ext}`;

        const { error: uploadError } = await supabase.storage
          .from("product-images")
          .upload(path, file);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
          .from("product-images")
          .getPublicUrl(path);

        image_urls.push(data.publicUrl);
      }

      const { error } = await supabase.from("products").insert({
        user_id: user.id,
        title,
        description,
        category,
        price: parseFloat(price),
        is_negotiable: isNegotiable,
        image_urls,
      });

      if (error) throw error;

      toast({
        title: "Product listed!",
        description:
          "Your item is now visible to other students.",
      });

      navigate("/my-listings");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    navigate("/auth");
    return null;
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 space-y-6">
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="gap-2"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </Button>

      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">
            List a Product
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {/* Title */}
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                placeholder="e.g. Calculus Textbook"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                placeholder="Describe your item..."
                rows={4}
              />
            </div>

            {/* Category + Price */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select
                  value={category}
                  onValueChange={(v) =>
                    setCategory(v as ProductCategory)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem
                        key={c.value}
                        value={c.value}
                      >
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Price (GHS)</Label>
                <Input
                  type="number"
                  value={price}
                  onChange={(e) =>
                    setPrice(e.target.value)
                  }
                  placeholder="0.00"
                  required
                />
              </div>
            </div>

            {/* Negotiable */}
            <div className="flex items-center justify-between border p-4 rounded-lg">
              <div>
                <Label>Negotiable</Label>
                <p className="text-xs text-muted-foreground">
                  Buyers can make offers
                </p>
              </div>
              <Switch
                checked={isNegotiable}
                onCheckedChange={setIsNegotiable}
              />
            </div>

            {/* Images */}
            <div className="space-y-2">
              <Label>Product Images</Label>

              <label className="flex flex-col items-center justify-center border border-dashed rounded-xl p-6 cursor-pointer hover:border-primary/40 transition">

                {imagePreviews.length > 0 ? (
                  <div className="grid grid-cols-3 gap-2 w-full">
                    {imagePreviews.map((src, i) => (
                      <div key={i} className="relative">
                        <img
                          src={src}
                          className="h-24 w-full object-cover rounded-md"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(i)}
                          className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    <Upload className="h-6 w-6 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Upload up to 5 images
                    </p>
                    <p className="text-xs text-muted-foreground/70">
                      First image will be your cover • Clear photos sell faster
                    </p>
                  </>
                )}

                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading || !title || !price}
            >
              {loading ? "Listing..." : "List Product"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}