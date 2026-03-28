import { useState, useEffect, useRef, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Send, Tag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { createAvatar } from "@dicebear/core";
import * as Adventurer from "@dicebear/adventurer";

export default function Chat() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [message, setMessage] = useState("");
  const [isOffer, setIsOffer] = useState(false);
  const [offerAmount, setOfferAmount] = useState("");
  const [sellerName, setSellerName] = useState("Seller");
  const messagesEnd = useRef<HTMLDivElement>(null);

  // Redirect if not logged in
  useEffect(() => {
    if (!user) navigate("/auth");
  }, [user, navigate]);

  // ✅ Stable conversation query
  const { data: conversation } = useQuery({
    queryKey: ["conversation", id],
    enabled: !!id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("conversations")
        .select("*, products(title, price, image_url, user_id)")
        .eq("id", id!)
        .single();
      if (error) throw error;
      return data;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  // Fetch seller name
  useEffect(() => {
    if (!conversation || !conversation.products?.user_id) return;

    const fetchSeller = async () => {
      const { data } = await supabase
        .from("profiles")
        .select("display_name")
        .eq("user_id", conversation.products.user_id)
        .single();
      setSellerName(data?.display_name || "Seller");
    };

    fetchSeller();
  }, [conversation]);

  // ✅ Derive other user ID
  const otherId = useMemo(() => {
    if (!conversation || !user) return null;

    return conversation.buyer_id === user.id
      ? conversation.seller_id
      : conversation.buyer_id;
  }, [conversation, user]);

  // ✅ Stable avatar (NO flicker)
  const avatar = useMemo(() => {
    if (!otherId) return null;

    return createAvatar(Adventurer, {
      seed: otherId,
      size: 32,
      backgroundColor: ["b6e3f4", "c0aede", "d1d4f9"],
    }).toDataUri();
  }, [otherId]);

  // Messages query
  const { data: messages } = useQuery({
    queryKey: ["messages", id],
    enabled: !!id,
    refetchInterval: 3000,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("conversation_id", id!)
        .order("created_at", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  // Auto-scroll
  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send message
  const sendMessage = useMutation({
    mutationFn: async () => {
      if (!user || !id) return;

      const { error } = await supabase.from("messages").insert({
        conversation_id: id,
        sender_id: user.id,
        content: isOffer ? `Offer: £${offerAmount}` : message,
        is_offer: isOffer,
        offer_amount: isOffer ? parseFloat(offerAmount) : null,
      });

      if (error) throw error;
    },
    onSuccess: () => {
      setMessage("");
      setOfferAmount("");
      setIsOffer(false);
      queryClient.invalidateQueries({ queryKey: ["messages", id] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  if (!user) return null;

  return (
    <div className="mx-auto max-w-2xl flex flex-col h-[calc(100vh-4rem)] bg-background">
      {/* HEADER */}
      <div className="flex items-center gap-3 p-4 border-b bg-card">
        <Button variant="ghost" size="icon" onClick={() => navigate("/messages")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>

        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="h-10 w-10 rounded-lg bg-muted overflow-hidden shrink-0">
            {avatar ? (
              <img
                src={avatar}
                alt={`${sellerName} Avatar`}
                className="h-full w-full object-cover"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">📦</div>
            )}
          </div>

          <div className="min-w-0">
            <p className="font-medium text-sm truncate text-foreground">
              {conversation?.products?.title || "Loading..."}
            </p>
            <p className="text-xs text-primary font-semibold">
              GHS
              {conversation?.products?.price
                ? Number(conversation.products.price).toFixed(2)
                : "--"}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              Seller: {sellerName}
            </p>
          </div>
        </div>
      </div>

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages?.map((msg: any) => {
          const isMine = msg.sender_id === user.id;
          return (
            <div
              key={msg.id}
              className={`flex items-end ${isMine ? "justify-end" : "justify-start"} gap-2`}
            >
              {!isMine && (
                <div className="h-8 w-8 rounded-full overflow-hidden bg-muted shrink-0">
                  {avatar ? (
                    <img src={avatar} alt="Avatar" className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">👤</div>
                  )}
                </div>
              )}

              <div
                className={`max-w-[75%] px-4 py-2.5 rounded-2xl flex flex-col shadow-sm ${
                  isMine
                    ? "bg-secondary text-secondary-foreground rounded-br-md"
                    : "bg-gray-100 text-gray-900 rounded-bl-md"
                }`}
              >
                {msg.is_offer && (
                  <Badge
                    variant="outline"
                    className="mb-1 text-xs text-yellow-500 border-yellow-500 flex items-center gap-1"
                  >
                    <Tag className="h-3 w-3" /> Offer
                  </Badge>
                )}
                <p className="text-sm">{msg.content}</p>
                <p
                  className={`text-[10px] mt-1 self-end ${
                    isMine ? "text-white/60" : "text-gray-500"
                  }`}
                >
                  {new Date(msg.created_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={messagesEnd} />
      </div>

      {/* INPUT */}
      <div className="p-4 border-t bg-card space-y-2">
        {isOffer && (
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">GHS</span>
            <Input
              type="number"
              min="0"
              step="0.01"
              placeholder="Your offer amount"
              value={offerAmount}
              onChange={(e) => setOfferAmount(e.target.value)}
              className="flex-1"
            />
          </div>
        )}

        <div className="flex gap-2">
          <Button
            variant={isOffer ? "default" : "outline"}
            size="icon"
            onClick={() => setIsOffer(!isOffer)}
          >
            <Tag className="h-4 w-4" />
          </Button>

          {!isOffer && (
            <Input
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && !e.shiftKey && sendMessage.mutate()
              }
              className="flex-1"
            />
          )}

          <Button
            size="icon"
            onClick={() => sendMessage.mutate()}
            disabled={isOffer ? !offerAmount : !message.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}