import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Send, Tag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Chat() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [message, setMessage] = useState("");
  const [isOffer, setIsOffer] = useState(false);
  const [offerAmount, setOfferAmount] = useState("");
  const messagesEnd = useRef<HTMLDivElement>(null);

  const { data: conversation } = useQuery({
    queryKey: ["conversation", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("conversations")
        .select("*, products(title, price, image_url)")
        .eq("id", id!)
        .single();
      if (error) throw error;
      return data;
    },
  });

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

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  if (!user) {
    navigate("/auth");
    return null;
  }

  return (
    <div className="mx-auto max-w-2xl flex flex-col h-[calc(100vh-4rem)]">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b bg-card">
        <Button variant="ghost" size="icon" onClick={() => navigate("/messages")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        {conversation?.products && (
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="h-10 w-10 rounded-lg bg-muted overflow-hidden shrink-0">
              {(conversation.products as any).image_url ? (
                <img src={(conversation.products as any).image_url} alt="" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center">📦</div>
              )}
            </div>
            <div className="min-w-0">
              <p className="font-medium text-sm truncate text-foreground">{(conversation.products as any).title}</p>
              <p className="text-xs text-primary font-semibold">£{Number((conversation.products as any).price).toFixed(2)}</p>
            </div>
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages?.map((msg) => {
          const isMine = msg.sender_id === user.id;
          return (
            <div key={msg.id} className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
                isMine
                  ? "bg-primary text-primary-foreground rounded-br-md"
                  : "bg-secondary text-secondary-foreground rounded-bl-md"
              }`}>
                {msg.is_offer && (
                  <Badge variant="outline" className="mb-1 text-xs border-current">
                    <Tag className="h-3 w-3 mr-1" /> Offer
                  </Badge>
                )}
                <p className="text-sm">{msg.content}</p>
                <p className={`text-[10px] mt-1 ${isMine ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                  {new Date(msg.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={messagesEnd} />
      </div>

      {/* Input */}
      <div className="p-4 border-t bg-card space-y-2">
        {isOffer && (
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">£</span>
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
            title="Make an offer"
          >
            <Tag className="h-4 w-4" />
          </Button>
          {!isOffer && (
            <Input
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage.mutate()}
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
