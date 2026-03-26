import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, LucidePhone, MessageCircle, Tag } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { createAvatar } from "@dicebear/core";
import * as Adventurer from "@dicebear/adventurer";

import { ProductCard } from "@/components/ProductCard"; // ✅ Import your existing ProductCard

// Category mapping with emojis
const categoryLabels: Record<string, string> = {
  books: "📚 Books",
  electronics: "💻 Electronics",
  fashion: "👕 Fashion",
  hostel_items: "🏠 Hostel Items",
  stationery: "✏️ Stationery",
  sports: "⚽ Sports",
  other: "📦 Other",
};

// ----- PRODUCT IMAGE GALLERY -----
interface ProductImageGalleryProps {
  images: string[];
}
const ProductImageGallery = ({ images }: ProductImageGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) diff > 0 ? nextImage() : prevImage();
    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (!images || images.length === 0)
    return (
      <div className="aspect-video h-full w-full bg-muted flex items-center justify-center text-6xl">
        📦
      </div>
    );

  return (
    <div className="w-full h-full">
      {/* Desktop gallery */}
      <div className="hidden lg:flex flex-col space-y-4">
        {images.map((img, index) => (
          <div
            key={index}
            className="w-full  gap-2 object-cover cursor-pointer"
            onClick={() => setCurrentIndex(index)}
          >
            <img
              src={img}
              alt={`Product view ${index + 1}`}
              className="w-full max-h-[500px] object-cover bg-muted transition-transform duration-300"
            />
          </div>
        ))}
      </div>

      {/* Mobile/Tablet slider */}
      <div className="lg:hidden relative">
        <div
          className="w-full aspect-square overflow-hidden cursor-pointer"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <img
            src={images[currentIndex]}
            alt={`Product view ${currentIndex + 1}`}
            className="w-full h-full object-cover bg-muted transition-transform duration-300 select-none"
          />
        </div>
        <div className="flex justify-center mt-4 gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === currentIndex ? "bg-foreground" : "bg-muted"
              }`}
              onClick={() => setCurrentIndex(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// ----- MAIN PRODUCT DETAILS -----
export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [avatarUri, setAvatarUri] = useState<string>("");
  const [sellerAvatar, setSellerAvatar] = useState<string>("");

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

  // Fetch related products (same category, exclude current)
const { data: relatedProducts, isLoading: relatedLoading } = useQuery({
  queryKey: ["relatedProducts", product?.category, product?.id],
  enabled: !!product?.category,
  queryFn: async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("category", product?.category)
      .neq("id", product?.id) // exclude current product
      .limit(4); // max 4 items
    if (error) throw error;
    return data;
  },
});

  useEffect(() => {
    if (user) {
      const svg = createAvatar(Adventurer, {
        seed: user.id,
        size: 32,
        backgroundColor: ["b6e3f4", "c0aede", "d1d4f9"],
      }).toDataUri();
      setAvatarUri(svg);
    }
  }, [user]);

  useEffect(() => {
    if (seller) {
      const svg = createAvatar(Adventurer, {
        seed: seller.id || seller.user_id || "anonymous",
        size: 32,
        backgroundColor: ["b6e3f4", "c0aede", "d1d4f9"],
      }).toDataUri();
      setSellerAvatar(svg);
    }
  }, [seller]);

  const handleMessageSeller = async () => {
    if (!user) return navigate("/auth");
    if (!product) return;

    const { data: existing } = await supabase
      .from("conversations")
      .select("id")
      .eq("product_id", product.id)
      .eq("buyer_id", user.id)
      .maybeSingle();

    if (existing) return navigate(`/chat/${existing.id}`);

    const { data: conv, error } = await supabase
      .from("conversations")
      .insert({
        product_id: product.id,
        buyer_id: user.id,
        seller_id: product.user_id,
      })
      .select()
      .single();

    if (error)
      return toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    navigate(`/chat/${conv.id}`);
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-6">
        <Skeleton className="h-8 w-32 mb-6" />
        <div className="grid md:grid-cols-2 gap-8">
          <Skeleton className="aspect-square rounded-xl" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) return <div>Product not found</div>;

  const images = product.image_urls?.length
    ? product.image_urls
    : product.image_url
    ? [product.image_url]
    : [];
  const isOwner = user?.id === product.user_id;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 pt-6 flex justify-end items-center text-sm text-muted-foreground">
        Home &gt; {product.category} &gt; {product.title}
      </div>

      <main className="max-w-6xl mx-auto px-6 py-6 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ProductImageGallery images={images} />

          <div className="lg:sticky lg:top-6 h-fit space-y-5">
            <Badge variant="secondary">
              {categoryLabels[product.category]}
            </Badge>
            <h1 className="text-2xl md:text-3xl font-semibold">
              {product.title}
            </h1>

            <div className="flex items-center gap-3">
              <span className="text-3xl font-md text-primary">
                GHS {Number(product.price).toFixed(2)}
              </span>
              {product.is_negotiable && (
                <Badge variant="outline">Negotiable</Badge>
              )}
            </div>

            {product.description && (
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            )}

            {seller && (
              <Card className="p-4 flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <img
                    src={user?.id === seller.user_id ? avatarUri : sellerAvatar}
                    alt="Seller Avatar"
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-medium">
                      {seller.display_name || "Anonymous"}
                    </p>
                    <p className="text-xs text-muted-foreground">Seller</p>
                  </div>
                </div>

                {seller.bio && (
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                    {seller.bio}
                  </p>
                )}

                {seller.school && (
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                    {seller.school}
                  </p>
                )}

                {seller.phone_number && (
                  <a href={`tel:${seller.phone_number}`}>
                    <div className="flex items-center gap-2 text-sm font-medium mt-1">
                      <LucidePhone className="h-4 w-4" /> {seller.phone_number}
                    </div>
                  </a>
                )}
              </Card>
            )}

            {!isOwner && (
              <div className="flex gap-3">
                <Button onClick={handleMessageSeller} className="flex-1 gap-2">
                  <MessageCircle className="h-4 w-4" /> Message
                </Button>
                <Button
                  variant="outline"
                  onClick={handleMessageSeller}
                  className="flex-1 gap-2"
                >
                  <Tag className="h-4 w-4" /> Offer
                </Button>
              </div>
            )}

            {isOwner && (
              <Button
                variant="outline"
                onClick={() => navigate(`/edit-product/${product.id}`)}
                className="w-full"
              >
                Edit Listing
              </Button>
            )}
          </div>
        </div>

{relatedProducts && relatedProducts.length > 0 && (
  <div className="mt-8">
    <h2 className="text-2xl font-light mb-4">You Might Also Like</h2>

    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {relatedProducts.map((item) => (
        <ProductCard key={item.id} product={item} />
      ))}
    </div>
  </div>
)}
      </main>
    </div>
  );
}