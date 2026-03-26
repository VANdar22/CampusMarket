import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const Footer = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut(); // correct way
      navigate("/auth"); // redirect to login page
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  return (
    <footer className="w-full bg-background text-foreground pt-8 pb-2 px-6 border-t border-border mt-48">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-8">
        <div>
          <h3 className="text-lg font-light tracking-wider mb-4">CampusMarket</h3>
          <p className="text-sm font-light text-muted-foreground leading-relaxed max-w-md">
            The student marketplace for buying and selling on campus
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h4 className="text-sm font-normal mb-4">Marketplace</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm font-light text-muted-foreground hover:text-foreground transition-colors">Browse All</Link></li>
              <li><Link to="/post" className="text-sm font-light text-muted-foreground hover:text-foreground transition-colors">Sell an Item</Link></li>
              <li><Link to="/my-listings" className="text-sm font-light text-muted-foreground hover:text-foreground transition-colors">My Listings</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-normal mb-4">Account</h4>
            <ul className="space-y-2">
              <li><Link to="/profile" className="text-sm font-light text-muted-foreground hover:text-foreground transition-colors">Profile</Link></li>
              <li><Link to="/messages" className="text-sm font-light text-muted-foreground hover:text-foreground transition-colors">Messages</Link></li>
              {(!user) ? (
                <li><Link to="/auth" className="text-sm font-light text-muted-foreground hover:text-foreground transition-colors">Sign In</Link></li>
              ) : (
                <li>
                  <button 
                    onClick={handleSignOut} 
                    className="text-sm font-light text-destructive hover:text-destructive/70 transition-colors"
                  >
                    Sign Out
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-border -mx-6 px-6 pt-2">
        <p className="text-sm font-light text-muted-foreground">
          © 2024 CampusMarket. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;