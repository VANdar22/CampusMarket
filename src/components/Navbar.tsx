import { Link, useNavigate } from "react-router-dom";
import { User, LogOut, Package, Sun, Moon, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";
import { createAvatar } from "@dicebear/core";
import * as Adventurer from "@dicebear/adventurer";
import { useQuery } from "@tanstack/react-query";
import { useTheme } from "@/contexts/ThemeProvider";
import { supabase } from "@/integrations/supabase/client";
import icon from "../images/icon.png";

export function Navbar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme(); // ✅ FIXED
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [avatarUri, setAvatarUri] = useState<string>("");

  // Generate avatar
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

  // Fetch conversations
  const { data: conversations } = useQuery({
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

  const navItems = [
    { name: "Browse", href: "/" },
    { name: "Sell", href: "/post-product" },
    ...(conversations && conversations.length > 0
      ? [{ name: "Messages", href: "/messages", badge: conversations.length }]
      : [{ name: "Messages", href: "/messages" }]),
  ];

  return (
    <header className="sticky top-0 z-50 border-b backdrop-blur-md bg-background">
      <div className="relative flex items-center justify-between h-16 px-6 max-w-7xl mx-auto">

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <div className="w-5 h-5 relative">
            <span className={`absolute w-5 h-px bg-current transition-all ${isMobileMenuOpen ? "rotate-45 top-2.5" : "top-1.5"}`} />
            <span className={`absolute w-5 h-px bg-current top-2.5 transition-all ${isMobileMenuOpen ? "opacity-0" : "opacity-100"}`} />
            <span className={`absolute w-5 h-px bg-current transition-all ${isMobileMenuOpen ? "-rotate-45 top-2.5" : "top-3.5"}`} />
          </div>
        </button>

        {/* Desktop nav */}
        <div className="hidden lg:flex space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="relative text-sm font-light text-primary hover:text-foreground transition"
            >
              {item.name}
              {item.badge && item.badge > 0 && (
                <span className="absolute -top-2 -right-6 inline-flex items-center justify-center px-2 py-1 text-xs text-white font-bold leading-none h-5 w-5 bg-primary/70 rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </div>

        {/* Logo */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <Link to="/" className="text-lg font-light tracking-wide text-foreground">
            <img src={icon} alt="Icon" className="h-16 w-16 object-contain" />
          </Link>
        </div>

        {/* Mobile avatar */}
        <div className="lg:hidden">
          <Link to="/profile">
            {avatarUri ? (
              <img src={avatarUri} alt="Avatar" className="h-8 w-8 rounded-full object-cover" />
            ) : (
              <User className="h-5 w-5" />
            )}
          </Link>
        </div>

        {/* Desktop right menu */}
        <div className="hidden lg:flex items-center gap-4">

          {/* Dark mode switch */}
          <div className="relative flex items-center">
            <Switch
              checked={theme === "dark"}
              onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")} // ✅ FIXED
              className="h-6 w-11"
            />
            <div className="pointer-events-none absolute left-1 flex items-center h-6">
              {theme === "dark" ? (
                <Moon className="h-3.5 w-3.5 text-white translate-x-5 transition-transform duration-200" />
              ) : (
                <Sun className="h-3.5 w-3.5 text-yellow-500 translate-x-0 transition-transform duration-200" />
              )}
            </div>
          </div>

          {/* Profile */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="p-0">
                  {avatarUri ? (
                    <img src={avatarUri} alt="Avatar" className="h-8 w-8 rounded-full object-cover" />
                  ) : (
                    <User className="h-5 w-5" />
                  )}
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  <User className="mr-2 h-4 w-4" /> Edit Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/my-listings")}>
                  <Package className="mr-2 h-4 w-4" /> My Listings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/wishlist")}>
                  <Heart className="mr-2 h-4 w-4" /> Saved Items
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut}>
                  <LogOut className="mr-2 h-4 w-4 text-destructive" />
                  <span className="text-destructive">Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="ghost" size="icon" onClick={() => navigate("/auth")}>
              <User className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t bg-background">
          <div className="px-6 py-6 space-y-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-lg font-light relative"
              >
                {item.name}
                {item.badge && item.badge > 0 && (
                  <span className="absolute right-3 inline-flex items-center justify-center px-2 py-2 text-[10px] font-bold leading-none h-5 w-5 text-white bg-primary/70 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}

            {user ? (
              <>
                <Link to="/wishlist" onClick={() => setIsMobileMenuOpen(false)} className="block text-lg font-light">
                  Saved Items
                </Link>
                <Link to="/my-listings" onClick={() => setIsMobileMenuOpen(false)} className="block text-lg font-light">
                  My Listings
                </Link>

                <button
                  onClick={() => {
                    signOut();
                    setIsMobileMenuOpen(false);
                  }}
                  className="block text-lg text-destructive font-light text-left w-full"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)} className="block text-lg font-light">
                Sign In
              </Link>
            )}

            {/* Mobile Dark Mode */}
            <div className="flex items-center justify-between">
              <span className="text-lg font-light text-muted-foreground">Mode</span>
              <Switch
                checked={theme === "dark"}
                onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")} // ✅ FIXED
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;