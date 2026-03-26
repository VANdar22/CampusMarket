
-- Wishlists table
CREATE TABLE public.wishlists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, product_id)
);

ALTER TABLE public.wishlists ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own wishlist" ON public.wishlists
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can add to their own wishlist" ON public.wishlists
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove from their own wishlist" ON public.wishlists
  FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

-- Seller reviews table
CREATE TABLE public.seller_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id uuid NOT NULL,
  reviewer_id uuid NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (seller_id, reviewer_id)
);

ALTER TABLE public.seller_reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Reviews are viewable by everyone" ON public.seller_reviews
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create reviews" ON public.seller_reviews
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = reviewer_id AND auth.uid() != seller_id);

CREATE POLICY "Users can update their own reviews" ON public.seller_reviews
  FOR UPDATE TO authenticated
  USING (auth.uid() = reviewer_id);

CREATE POLICY "Users can delete their own reviews" ON public.seller_reviews
  FOR DELETE TO authenticated
  USING (auth.uid() = reviewer_id);
