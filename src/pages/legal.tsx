import React from "react";


export default function legal() {
  return (
    <div className="min-h-screen bg-[#f5f5f3] font-[quicksand]">

      {/* HEADER IMAGE */}
      <div className="relative w-full h-[250px] md:h-[350px] overflow-hidden">
        <img
          src="https://res.cloudinary.com/dvsdcgu9q/image/upload/q_auto/f_auto/v1778520935/cosmos_1959895835_inipve.jpg"
          className="w-full h-full object-cover"
          alt="Privacy Policy"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-white text-xl md:text-4xl font-[Aboreto] tracking-widest">
            Privacy & Cookies Policy
          </h1>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-10 text-muted-foreground">

        {/* PRIVACY */}
        <section>
          <h2 className="text-xl md:text-2xl font-semibold text-black mb-3">
            Privacy Policy
          </h2>

          <p className="leading-relaxed">
            SMS HomeFinder respects your privacy and is committed to protecting
            your personal data. We only collect information necessary to help
            you find, buy, sell, or rent properties in Ghana.
          </p>

          <p className="leading-relaxed mt-3">
            Your data is never sold to third parties. We use secure systems to
            store and manage all user information with strict confidentiality.
          </p>
        </section>

        {/* COOKIES */}
        <section>
          <h2 className="text-xl md:text-2xl font-semibold text-black mb-3">
            Cookies Policy
          </h2>

          <p className="leading-relaxed">
            Our website uses cookies to improve your browsing experience,
            remember preferences, and analyze website traffic.
          </p>

          <p className="leading-relaxed mt-3">
            You can disable cookies in your browser settings, but some features
            of the site may not work properly.
          </p>
        </section>

        {/* DATA USAGE */}
        <section>
          <h2 className="text-xl md:text-2xl font-semibold text-black mb-3">
            How We Use Your Data
          </h2>

          <ul className="list-disc pl-6 space-y-2">
            <li>To connect you with property listings</li>
            <li>To respond to inquiries and contact requests</li>
            <li>To improve user experience on the platform</li>
            <li>To ensure security and prevent fraud</li>
          </ul>
        </section>

        {/* CONTACT */}
        <section>
          <h2 className="text-xl md:text-2xl font-semibold text-black mb-3">
            Contact Us
          </h2>

          <p>
            If you have any questions about this policy, contact us at:
          </p>

          <p className="mt-2 font-medium font-[quicksand] text-black">
            0537435123 <br />
            GA 363-1488 Laterbiokorshie, Accra, Ghana
          </p>
        </section>

      </div>
    </div>
  );
}