// src/components/GuestNavBar.tsx
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "../images/icon.png";

export default function GuestNavBar() {
  return (
    <nav className="bg-background backdrop-blur-lg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-6 py-3 flex justify-between items-center">
        {/* Logo / Site Name */}
        <Link to="/" className="flex items-center gap-2">
          <img className="w-16 h-16 sm:w-12 sm:h-12" src={Logo} alt="Logo" />
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-3">
          {/* Shorter text on mobile */}
          <p className="text-sm sm:text-md font-medium text-muted-foreground whitespace-nowrap">
            <span className="sm:hidden">Sign in to join</span>
            <span className="hidden sm:inline">
              Please sign in to join the CampusMarket community
            </span>
          </p>

          <Link to="/auth">
            <Button
              variant="outline"
              className="text-primary border-2"
              size="sm"
            >
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}