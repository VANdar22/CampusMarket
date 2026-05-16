import logo from "../../images/sms.png";
import facebook from "../../images/facebook.png";
import instagram from "../../images/instagram.png";
import twitter from "../../images/x.png";
import whatsapp from "../../images/Whatsapp.png";

export default function LuxuryFooter() {
  return (
    <footer className="bg-[#f5f5f3] text-[#33415c] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-14 md:pt-24 pb-10 md:pb-16">
        {/* TOP STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
          {/* ITEM 1 */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 md:gap-6">
            <h2 className="text-3xl md:text-4xl font-[Aboreto] text-accent font-light leading-none">
              350+
            </h2>

            <h3 className="text-sm md:text-lg font-[quicksand] font-light text-secondary tracking-wide leading-snug max-w-xs">
              Happy Clients Successfully Guided Through Luxury Real Estate
            </h3>
          </div>

          {/* ITEM 2 */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 md:gap-6">
            <h2 className="text-3xl md:text-4xl font-[Aboreto] text-accent font-light leading-none">
              8+
            </h2>

            <h3 className="text-sm md:text-lg font-[quicksand] font-light text-secondary tracking-wide leading-snug max-w-xs">
              Years of Experience in Premium Residential Property Sales
            </h3>
          </div>

          {/* ITEM 3 */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 md:gap-6">
            <h2 className="text-3xl md:text-4xl font-[Aboreto] text-accent font-light leading-none">
              120+
            </h2>

            <h3 className="text-sm md:text-lg font-[quicksand] font-light text-secondary tracking-wide leading-snug max-w-xs">
              Luxury Properties Successfully Marketed and Sold Across Ghana
            </h3>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="w-full h-px bg-[#d7d7d7] mt-14 md:mt-20" />

        {/* MIDDLE */}
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-center gap-10 py-12 md:py-14">
          {/* LOGOS */}
          <div className="flex flex-wrap justify-center lg:justify-start items-center gap-6 md:gap-12">
            <img
              src={logo}
              alt="logo"
              className="h-10 md:h-12 object-contain opacity-80"
            />
          </div>

          {/* CONTACT */}
          <div className="flex flex-col md:flex-row items-center font-[quicksand] font-light gap-4 md:gap-10 text-sm md:text-lg text-black text-center">
            <a
              href="mailto:sahmangara@gmail.com"
              className="u hover:opacity-70 transition break-all"
            >
              sahmangara@gmail.com{" "}
            </a>

            <a
              href="tel:+233537435123"
              className="hover:opacity-70 font-[quicksand] transition"
            >
              +233 53 743 5123
            </a>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="flex flex-col xl:flex-row justify-between items-center gap-8 md:gap-10 pb-6 md:pb-12">
          {/* COPYRIGHT */}
          <p className="text-sm md:text-md text-secondary font-[quicksand] font-light text-center xl:text-left">
            ©2024 SMS HomeFinder. All rights reserved.
          </p>

          {/* NAV */}
          <div className="flex flex-wrap justify-center gap-5 text-sm md:text-md text-accent font-semibold font-[Aboreto] text-center">
            <a href="/" className="hover:text-secondary transition">
              Home
            </a>

            <a href="#/property" className="hover:text-secondary transition">
              Search Properties
            </a>

            <a href="#/about" className="hover:text-secondary transition">
              About Us
            </a>

            <a href="#/contact" className="hover:text-secondary transition">
              Contact
            </a>

            <a href="#/legal" className="hover:text-secondary transition">
              Policy
            </a>

            <a href="#/legal" className="hover:text-secondary transition">
              Cookies
            </a>
          </div>
          {/* SOCIALS */}
        {/* SOCIALS */}
<div className="flex items-center gap-3 md:gap-4">
  {[
    {
      icon: facebook,
      link: "https://www.facebook.com/profile.php?id=61587475613157",
    },
    {
      icon: instagram,
      link: "https://www.instagram.com/smshomefinder?igsh=Ym1hZGlsNmRtYmho",
    },
    {
      icon: whatsapp,
      link: "https://wa.me/233537435123",
    },
  ].map((social, index) => (
    <a
      key={index}
      href={social.link}
      target="_blank"
      rel="noopener noreferrer"
      className="
        w-10 h-10 md:w-12 md:h-12
        rounded-full
        border border-accent
        flex items-center justify-center
        hover:bg-gray-200
        transition-all duration-300
        cursor-pointer
        p-2
      "
    >
      <img
        src={social.icon}
        alt="social"
        className="w-4 h-4 md:w-5 md:h-5 object-contain"
      />
    </a>
  ))}
</div>
        </div>
      </div>
    </footer>
  );
}
