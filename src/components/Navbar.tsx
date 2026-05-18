import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import icon from "../images/sms.png";
import facebook from "../images/facebook.png";
import instagram from "../images/instagram.png";
import twitter from "../images/x.png";
import whatsapp from "../images/Whatsapp.png";


export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const location = useLocation();

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

  const isActive = (href: string) => location.pathname === href;

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

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-1 shrink-0">
          <img
            src={icon}
            alt="Logo"
            className="h-18 w-18 md:h-16 md:w-16 object-contain"
          />
          <p className="text-md md:text-2xl mt-1 text-accent/90 font-[aboreto] font-semibold">SMS HomeFinder</p>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center ml-auto gap-8">

          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`
                relative text-sm uppercase tracking-[0.15em]
                font-[quicksand] font-semibold
                transition-colors duration-300
                ${isActive(item.href) ? "text-accent" : "text-secondary hover:text-accent"}
              `}
            >
              {item.name}
              {/* active underbar */}
              <span
                className={`
                  absolute -bottom-1 left-0 h-[2px] bg-accent
                  transition-all duration-300
                  ${isActive(item.href) ? "w-full" : "w-0"}
                `}
              />
            </Link>
          ))}

          {/* SOCIAL ICONS */}
          <div className="flex items-center gap-3 ml-6">

            <a
              href="https://www.facebook.com/profile.php?id=61587475613157"
              target="_blank"
              rel="noopener noreferrer"
              className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gradient-to-r from-blue-500 to-white transition"
            >
              <img src={facebook} alt="Facebook" />
            </a>

            <a
              href="https://www.instagram.com/smshomefinder?igsh=Ym1hZGlsNmRtYmho"
              target="_blank"
              rel="noopener noreferrer"
              className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gradient-to-r from-red-500 to-purple-500 transition"
            >
              <img src={instagram} alt="Instagram" />
            </a>

            <a
              href="https://wa.me/233537435123"
              target="_blank"
              rel="noopener noreferrer"
              className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gradient-to-r from-green-700 to-white transition"
            >
              <img src={whatsapp} alt="Whatsapp" />
            </a>

          </div>

        </nav>

        {/* MOBILE BUTTON */}
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
                ${isMobileMenuOpen ? "rotate-45 top-2" : "top-1"}
              `}
            />

            <span
              className={`
                absolute left-0 top-2 w-5 h-0.5 bg-current
                transition-all duration-300
                ${isMobileMenuOpen ? "opacity-0" : "opacity-100"}
              `}
            />

            <span
              className={`
                absolute left-0 w-5 h-0.5 bg-current
                transition-all duration-300
                ${isMobileMenuOpen ? "-rotate-45 top-2" : "top-3"}
              `}
            />
          </div>
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`
          md:hidden
          overflow-hidden
          transition-all duration-500
          ${isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <div className="px-6 pb-6 pt-2 bg-[rgba(245,245,243,0.95)] backdrop-blur-xl flex flex-col gap-5">

          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`
                text-sm uppercase tracking-[0.15em]
                transition-colors duration-300 flex items-center gap-3
                ${isActive(item.href) ? "text-accent font-semibold" : "text-secondary hover:text-accent"}
              `}
            >
              {/* mobile active dot */}
              <span
                className={`
                  inline-block w-1.5 h-1.5 rounded-full bg-accent shrink-0
                  transition-opacity duration-300
                  ${isActive(item.href) ? "opacity-100" : "opacity-0"}
                `}
              />
              {item.name}
            </Link>
          ))}

          {/* MOBILE SOCIAL ICONS */}
          <div className="flex items-center gap-5 pt-6 border-t border-black/10">
            <a href="#"><img src={facebook} alt="Facebook" className="w-6 h-6 rounded-full" /></a>
            <a href="#"><img src={instagram} alt="Instagram" className="w-6 h-6 rounded-full" /></a>
            <a href="#"><img src={whatsapp} alt="Whatsapp" className="w-6 h-6 rounded-full" /></a>
          </div>

        </div>
      </div>

    </header>
  );
}

export default Navbar;