import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  const [school, setSchool] = useState("");
  const [avatarUri, setAvatarUri] = useState("");

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
          setSchool(data.school || "");
        }
      });
  }, [user, navigate]);

  const handlePhoneChange = (value: string) => {
    const digits = value.replace(/\D/g, "");
    setPhoneNumber(digits);
  };

  const handlePhoneBlur = () => {
    let digits = phoneNumber.replace(/\D/g, "");
    if (digits.startsWith("0")) digits = digits.slice(1);
    if (!digits.startsWith("233")) digits = "233" + digits;

    if (digits.length === 12) {
      const formatted = `+${digits.slice(0, 3)} ${digits.slice(
        3,
        5
      )} ${digits.slice(5, 8)} ${digits.slice(8)}`;
      setPhoneNumber(formatted);
    } else {
      setPhoneNumber("+" + digits);
    }
  };

  const validatePhoneNumber = (value: string) => {
    const digits = value.replace(/\D/g, "");
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
        school, // ✅ saved to backend
      })
      .eq("user_id", user.id);

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
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
            <img
              src={avatarUri}
              alt="Avatar"
              className="h-full w-full object-cover"
            />
          </div>
          <CardTitle>Your Profile</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Email</Label>
            <Input value={user?.email || ""} disabled className="bg-muted" />
          </div>

          <div className="space-y-2">
            <Label>Display Name</Label>
            <Input
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>

          {/* SCHOOL SELECT */}
          <div className="space-y-2">
            <Label>School</Label>
            <Select value={school} onValueChange={setSchool}>
              <SelectTrigger>
                <SelectValue placeholder="Select your school" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="KNUST">KNUST</SelectItem>
                <SelectItem value="Legon">Legon</SelectItem>
                <SelectItem value="UCC">UCC</SelectItem>
                <SelectItem value="UDS">UDS</SelectItem>
                <SelectItem value="UHAS">UHAS</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Phone Number</Label>
            <Input
              value={phoneNumber}
              onChange={(e) => handlePhoneChange(e.target.value)}
              onBlur={handlePhoneBlur}
              placeholder="024 123 4567"
            />
          </div>

          <div className="space-y-2">
            <Label>Bio</Label>
            <Textarea
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