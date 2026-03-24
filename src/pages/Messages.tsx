import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { MessageCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Messages() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/auth");
  }, [user, navigate]);

  const { data: conversations, isLoading } = useQuery({
    queryKey: ["conversations", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("conversations")
        .select("*, products(title, image_url, price)")
        .or(`buyer_id.eq.${user!.id},seller_id.eq.${user!.id}`)
        .order("updated_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold text-foreground">Messages</h1>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-20 rounded-xl" />
          ))}
        </div>
      ) : conversations && conversations.length > 0 ? (
        <div className="space-y-3">
          {conversations.map((conv: any) => (
            <Card
              key={conv.id}
              className="p-4 flex items-center gap-4 cursor-pointer hover:shadow-md transition-shadow border"
              onClick={() => navigate(`/chat/${conv.id}`)}
            >
              <div className="h-14 w-14 rounded-xl bg-muted overflow-hidden shrink-0">
                {conv.products?.image_url ? (
                  <img src={conv.products.image_url} alt="" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-2xl">📦</div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">{conv.products?.title || "Product"}</p>
                <p className="text-sm text-primary font-semibold">£{Number(conv.products?.price || 0).toFixed(2)}</p>
              </div>
              <MessageCircle className="h-5 w-5 text-muted-foreground shrink-0" />
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <MessageCircle className="h-12 w-12 text-muted-foreground mb-4" />
          <h2 className="text-lg font-semibold text-foreground">No messages yet</h2>
          <p className="text-muted-foreground">Start a conversation by messaging a seller.</p>
        </div>
      )}
    </div>
  );
}
