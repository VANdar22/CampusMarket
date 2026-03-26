import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface WishlistButtonProps {
  productId: string;
  className?: string;
  size?: "sm" | "md";
}

export function WishlistButton({ productId, className, size = "sm" }: WishlistButtonProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("wishlists")
      .select("id")
      .eq("user_id", user.id)
      .eq("product_id", productId)
      .maybeSingle()
      .then(({ data }) => setSaved(!!data));
  }, [user, productId]);

  const toggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!user) return navigate("/auth");
    setLoading(true);

    if (saved) {
      await supabase
        .from("wishlists")
        .delete()
        .eq("user_id", user.id)
        .eq("product_id", productId);
      setSaved(false);
    } else {
      await supabase
        .from("wishlists")
        .insert({ user_id: user.id, product_id: productId });
      setSaved(true);
    }
    setLoading(false);
  };

  const iconSize = size === "sm" ? "h-4 w-4" : "h-5 w-5";

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={cn(
        "rounded-full p-1.5 transition-colors",
        saved
          ? "text-red-500 bg-red-500/10 hover:bg-red-500/20"
          : "text-muted-foreground bg-background/80 hover:bg-muted",
        className
      )}
      aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
    >
      <Heart className={cn(iconSize, saved && "fill-current")} />
    </button>
  );
}
