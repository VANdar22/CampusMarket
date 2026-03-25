// src/components/GuestNavBar.tsx
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "../images/icon.png";

export default function GuestNavBar() {
  return (
    <nav className="bg-background backdrop-blur-lg border-muted-foreground">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo / Site Name */}
        <Link to="/" className="text-xl font-bold text-primary">
          <img className="w-12 h-12" src={Logo} alt="Logo" />
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-4">
          <p className="text-md font-medium text-muted-foreground">
            Please sign in to join the CampusMarket community
          </p>

          <Link to="/auth">
            <Button variant="outline" className="text-primary border-2" size="sm">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}