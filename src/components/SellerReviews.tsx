import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface SellerReviewsProps {
  sellerId: string;
  sellerName?: string;
}

export function SellerReviews({ sellerId, sellerName }: SellerReviewsProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const { data: reviews } = useQuery({
    queryKey: ["seller-reviews", sellerId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("seller_reviews")
        .select("*")
        .eq("seller_id", sellerId)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const { data: reviewerProfiles } = useQuery({
    queryKey: ["reviewer-profiles", sellerId],
    enabled: !!reviews && reviews.length > 0,
    queryFn: async () => {
      const ids = [...new Set(reviews!.map((r) => r.reviewer_id))];
      const { data } = await supabase
        .from("profiles")
        .select("user_id, display_name")
        .in("user_id", ids);
      const map: Record<string, string> = {};
      data?.forEach((p) => { map[p.user_id] = p.display_name || "Anonymous"; });
      return map;
    },
  });

  const avgRating = reviews?.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  const canReview = user && user.id !== sellerId;
  const hasReviewed = reviews?.some((r) => r.reviewer_id === user?.id);

  const handleSubmit = async () => {
    if (!user || rating === 0) return;
    setSubmitting(true);

    const { error } = await supabase.from("seller_reviews").insert({
      seller_id: sellerId,
      reviewer_id: user.id,
      rating,
      comment: comment.trim() || null,
    });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Review submitted!" });
      setRating(0);
      setComment("");
      setShowForm(false);
      queryClient.invalidateQueries({ queryKey: ["seller-reviews", sellerId] });
    }
    setSubmitting(false);
  };

  return (
    <div className="space-y-4">
      {/* Summary */}
      <div className="flex items-center gap-3">
        <h3 className="text-lg font-medium">Seller Reviews</h3>
        {avgRating && (
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium text-foreground">{avgRating}</span>
            <span>({reviews?.length})</span>
          </div>
        )}
      </div>

      {/* Reviews list */}
      {reviews && reviews.length > 0 ? (
        <div className="space-y-3">
          {reviews.slice(0, 5).map((review) => (
            <div key={review.id} className="border border-border rounded-lg p-3 space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={cn(
                          "h-3.5 w-3.5",
                          s <= review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted"
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {reviewerProfiles?.[review.reviewer_id] || "Anonymous"}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {new Date(review.created_at).toLocaleDateString()}
                </span>
              </div>
              {review.comment && (
                <p className="text-sm text-foreground">{review.comment}</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">No reviews yet</p>
      )}

      {/* Write review */}
      {canReview && !hasReviewed && (
        <>
          {!showForm ? (
            <Button variant="outline" size="sm" onClick={() => setShowForm(true)}>
              Write a Review
            </Button>
          ) : (
            <div className="border border-border rounded-lg p-4 space-y-3">
              <p className="text-sm font-medium">Rate {sellerName || "this seller"}</p>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    onMouseEnter={() => setHoverRating(s)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(s)}
                  >
                    <Star
                      className={cn(
                        "h-6 w-6 transition-colors cursor-pointer",
                        s <= (hoverRating || rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-muted"
                      )}
                    />
                  </button>
                ))}
              </div>
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your experience (optional)"
                rows={2}
              />
              <div className="flex gap-2">
                <Button size="sm" onClick={handleSubmit} disabled={submitting || rating === 0}>
                  {submitting ? "Submitting..." : "Submit"}
                </Button>
                <Button size="sm" variant="ghost" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
