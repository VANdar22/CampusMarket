import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import { createAvatar } from "@dicebear/core";
import * as Adventurer from "@dicebear/adventurer";

export default function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUri, setAvatarUri] = useState("");

  // Load profile & avatar
  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }

    const svg = createAvatar(Adventurer, {
      seed: user.id,
      size: 96,
      backgroundColor: ["b6e3f4", "c0aede", "d1d4f9"],
    }).toDataUri();
    setAvatarUri(svg);

    supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user.id)
      .single()
      .then(({ data }) => {
        if (data) {
          setDisplayName(data.display_name || "");
          setBio(data.bio || "");
          setPhoneNumber(data.phone_number || "");
        }
      });
  }, [user, navigate]);

  // Handle user input
  const handlePhoneChange = (value: string) => {
    // Keep only digits
    const digits = value.replace(/\D/g, "");
    setPhoneNumber(digits);
  };

  // Format number on blur: +233 XX XXX XXXX
  const handlePhoneBlur = () => {
    let digits = phoneNumber.replace(/\D/g, ""); // remove non-digits
    if (digits.startsWith("0")) digits = digits.slice(1); // drop leading 0
    if (!digits.startsWith("233")) digits = "233" + digits; // prepend country code

    // Format as +233 XX XXX XXXX
    if (digits.length === 12) {
      const formatted = `+${digits.slice(0, 3)} ${digits.slice(3, 5)} ${digits.slice(5, 8)} ${digits.slice(8)}`;
      setPhoneNumber(formatted);
    } else {
      setPhoneNumber("+" + digits);
    }
  };

  // Validate phone
  const validatePhoneNumber = (value: string) => {
    const digits = value.replace(/\D/g, "");
    // Should start with 233 and have 9 digits after
    return /^233\d{9}$/.test(digits);
  };

  const handleSave = async () => {
    if (!user) return;
    setLoading(true);

    if (phoneNumber && !validatePhoneNumber(phoneNumber)) {
      toast({ title: "Invalid phone number", variant: "destructive" });
      setLoading(false);
      return;
    }

    const { error } = await supabase
      .from("profiles")
      .update({
        display_name: displayName,
        bio,
        phone_number: phoneNumber,
      })
      .eq("user_id", user.id);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Profile updated!" });
    }
    setLoading(false);
  };

  return (
    <div className="mx-auto max-w-xl px-4 py-6 space-y-6">
      <Button variant="ghost" onClick={() => navigate(-1)} className="gap-2">
        <ArrowLeft className="h-4 w-4" /> Back
      </Button>

      <Card className="border-0 shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto h-24 w-24 mb-3 rounded-full overflow-hidden bg-primary/10">
            <img src={avatarUri} alt="Avatar" className="h-full w-full object-cover" />
          </div>
          <CardTitle>Your Profile</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Email</Label>
            <Input value={user?.email || ""} disabled className="bg-muted" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Display Name</Label>
            <Input
              id="name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={phoneNumber}
              onChange={(e) => handlePhoneChange(e.target.value)}
              onBlur={handlePhoneBlur}
              placeholder="024 123 4567"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell others about yourself..."
              rows={3}
            />
          </div>

          <Button onClick={handleSave} className="w-full" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}