import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import icon from "../images/sms.png";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);

  const navItems = [
    { name: "Properties", href: "/property" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Blog", href: "/blog" },
  ];

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
    className={`
      sticky md:fixed top-0 left-0 w-full z-50
      backdrop-blur-md
      bg-[rgba(245,245,243,0.75)]
      border-b border-black/5
      md:transition-transform duration-300
      ${showNavbar ? "md:translate-y-0" : "md:-translate-y-full"}
    `}
  >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center shrink-0">
          <img
            src={icon}
            alt="Logo"
            className="h-18 w-18 md:h-16 md:w-16 object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center ml-auto gap-10">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="
                text-sm
                uppercase
                tracking-[0.15em]
                font-[quicksand]
                font-semibold
                text-secondary
                hover:text-accent
                transition-colors duration-300
              "
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Button */}
        <button
          className="
            md:hidden
            relative
            flex items-center justify-center
            w-11 h-11
            rounded-full
            font-[quicksand]
            bg-accent
            text-white
          "
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <div className="relative w-5 h-5">
            
            <span
              className={`
                absolute left-0 w-5 h-0.5 bg-current
                transition-all duration-300
                ${
                  isMobileMenuOpen
                    ? "rotate-45 top-2"
                    : "top-1"
                }
              `}
            />

            <span
              className={`
                absolute left-0 top-2 w-5 h-0.5 bg-current
                transition-all duration-300
                ${
                  isMobileMenuOpen
                    ? "opacity-0"
                    : "opacity-100"
                }
              `}
            />

            <span
              className={`
                absolute left-0 w-5 h-0.5 bg-current
                transition-all duration-300
                ${
                  isMobileMenuOpen
                    ? "-rotate-45 top-2"
                    : "top-3"
                }
              `}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`
          md:hidden
          overflow-hidden
          transition-all duration-500
          ${
            isMobileMenuOpen
              ? "max-h-96 opacity-100"
              : "max-h-0 opacity-0"
          }
        `}
      >
        <div className="px-6 pb-6 pt-2 bg-[rgba(245,245,243,0.95)] backdrop-blur-xl flex flex-col gap-5">
          
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="
                text-sm
                uppercase
                tracking-[0.15em]
                text-secondary
                hover:text-accent
                transition-colors duration-300
              "
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}

export default Navbar;