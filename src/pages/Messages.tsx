import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { MessageCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { createAvatar } from "@dicebear/core";
import * as Adventurer from "@dicebear/adventurer";

export default function Messages() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [avatars, setAvatars] = useState<Record<string, string>>({});
  const [sellerProfiles, setSellerProfiles] = useState<Record<string, any>>({});

  // Redirect to auth if not logged in
  useEffect(() => {
    if (!user) navigate("/auth");
  }, [user, navigate]);

  // Fetch conversations
  const { data: conversations, isLoading } = useQuery({
    queryKey: ["conversations", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("conversations")
        .select("*, products(id, title, image_url, price, user_id)")
        .or(`buyer_id.eq.${user!.id},seller_id.eq.${user!.id}`)
        .order("updated_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  // Fetch seller profiles
  useEffect(() => {
    if (!conversations) return;

    const sellerIds = Array.from(
      new Set(conversations.map((conv: any) => conv.products?.user_id))
    );

    sellerIds.forEach(async (sellerId) => {
      if (!sellerProfiles[sellerId]) {
        const { data } = await supabase
          .from("profiles")
          .select("display_name")
          .eq("user_id", sellerId)
          .single();
        setSellerProfiles((prev) => ({ ...prev, [sellerId]: data || { display_name: "Anonymous" } }));
      }
    });
  }, [conversations, sellerProfiles]);

  // Delete conversation
  const handleDeleteConversation = async (conversationId: string) => {
    const { error } = await supabase
      .from("conversations")
      .delete()
      .eq("id", conversationId);

    if (error) {
      console.error("Delete failed:", error.message);
      return;
    }

    queryClient.invalidateQueries({ queryKey: ["conversations", user?.id] });
  };

  // Generate avatars
  useEffect(() => {
    if (!conversations) return;

    const newAvatars: Record<string, string> = {};
    conversations.forEach((conv: any) => {
      const sellerId = conv.products?.user_id;
      if (sellerId && !newAvatars[sellerId]) {
        newAvatars[sellerId] = createAvatar(Adventurer, {
          seed: sellerId,
          size: 32,
          backgroundColor: ["b6e3f4", "c0aede", "d1d4f9"],
        }).toDataUri();
      }
    });

    setAvatars(newAvatars);
  }, [conversations]);

  const getUnreadCount = (conv: any) => {
    if (!conv.messages) return 0;
    return conv.messages.filter(
      (msg: any) => !msg.read && msg.sender_id !== user?.id
    ).length;
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-medium text-foreground">
          Messages {conversations?.length ? `(${conversations.length})` : ""}
        </h1>
      </div>

      {/* Loading */}
      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-20 rounded-xl" />
          ))}
        </div>
      ) : conversations && conversations.length > 0 ? (
        <div className="space-y-3">
          {conversations.map((conv: any) => {
            const sellerId = conv.products?.user_id;
            const avatar = avatars[sellerId];
            const unreadCount = getUnreadCount(conv);
            const sellerName = sellerProfiles[sellerId]?.display_name || "Anonymous";

            return (
              <Card
                key={conv.id}
                className="relative p-4 flex items-center gap-4 cursor-pointer hover:shadow-md transition-shadow border rounded-2xl"
                onClick={() => navigate(`/chat/${conv.id}`)}
              >
                {/* Avatar */}
                <div className="h-14 w-14 rounded-full overflow-hidden shrink-0 bg-muted flex items-center justify-center">
                  {avatar ? (
                    <img
                      src={avatar}
                      alt={`${sellerName} Avatar`}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="text-2xl">👤</div>
                  )}
                </div>

                {/* Product & Seller Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">
                    {conv.products?.title || "Product"}
                  </p>
                  <p className="text-sm text-primary font-semibold">
                    GHS{Number(conv.products?.price || 0).toFixed(2)}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    Seller: {sellerName}
                  </p>
                </div>

                {/* Unread Badge */}
                {unreadCount > 0 && (
                  <div className="absolute top-3 right-12 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {unreadCount}
                  </div>
                )}

                {/* Delete Button */}
                <div
                  className="absolute top-3 right-3"
                  onClick={(e) => e.stopPropagation()}
                >
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full hover:bg-muted"
                      >
                        <Trash2 className="h-4 w-4 text-destructive hover:text-destructive/70 transition-colors" />
                      </Button>
                    </AlertDialogTrigger>

                    <AlertDialogContent className="max-w-sm rounded-md">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-base font-medium">
                          Delete conversation?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-sm text-muted-foreground">
                          This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>

                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-destructive hover:bg-destructive/70"
                          onClick={() => handleDeleteConversation(conv.id)}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <MessageCircle className="h-12 w-12 text-muted-foreground mb-4" />
          <h2 className="text-lg font-semibold text-foreground">
            No messages yet
          </h2>
          <p className="text-muted-foreground">
            Start a conversation by messaging a seller.
          </p>
        </div>
      )}
    </div>
  );
}