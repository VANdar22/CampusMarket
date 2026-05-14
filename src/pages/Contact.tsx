import HeroParralax from "@/components/HeroParralax";
import Footer from "@/components/ui/footer";
import ScrollHighlightText from "@/components/ScrollHighlightText";
export default function ContactPage() {
  return (
    <>
      <section className="max-w-7xl bg-background mx-auto px-4 py-20">

        <div className="h-[60vh] overflow-hidden">
          <HeroParralax />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 text-center md:text-left md:items-start">

          {/* LEFT */}
          <div>
            <ScrollHighlightText className="text-xl md:text-3xl mt-20 font-semibold font-[quicksand] leading-tight mb-6">
              Get In Touch
            </ScrollHighlightText>

            <p className="text-muted-foreground font-[quicksand] text-lg mt-4 font-medium leading-8 mb-10 max-w-xl">
              Have questions about a property, investment,
              or rental opportunity? Our team is ready to
              help you with all your real estate needs.
            </p>

            <form className="grid  gap-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <input type="text" placeholder="Full Name" className="h-14  border  md:text-left px-5 outline-none text-center focus:ring-2 focus:ring-black" />
                <input type="email" placeholder="Email Address" className="h-14  border  md:text-left px-5 outline-none text-center focus:ring-2 focus:ring-black" />
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <input type="text" placeholder="Phone Number" className="h-14  border  md:text-left  px-5 outline-none text-center focus:ring-2 focus:ring-black" />
                <input type="text" placeholder="Subject" className="h-14 border  px-5  md:text-left outline-none text-center focus:ring-2 focus:ring-black" />
              </div>

              <textarea placeholder="Your Message" className="min-h-40 border text-center md:text-left p-5 outline-none focus:ring-2 focus:ring-black" />

              <div className="flex justify-center md:justify-start">
  <button className="w-[75%] sm:w-auto flex items-center justify-center h-10 sm:h-12 md:h-14 px-5 sm:px-8 mt-6 border-accent border bg-[#145a98] hover:bg-[#f5f5f5] text-accent hover:text-[#145a98] font-bold font-[Aboreto] tracking-widest transition-all duration-300 hover:scale-105 text-xs sm:text-sm">
    SEND
  </button>
</div>
            </form>
          </div>

          {/* RIGHT */}
          <div className="bg-muted/40  text-center sm:text-center md:text-justify rounded-3xl p-10 grid gap-8">
            <div>
              <ScrollHighlightText variant="background-blue" className="text-xl font-[quicksand] font-medium mb-3">
                Office
              </ScrollHighlightText>
              <p className="text-muted-foreground mt-2 font-[quicksand] leading-7">
                SMS HomeFinder <br />
                Accra, Ghana
              </p>
            </div>

            <div>
              <ScrollHighlightText variant="background-blue" className="text-xl font-[quicksand] font-medium mb-3">
                Phone
              </ScrollHighlightText>
              <p className="text-muted-foreground mt-2 font-[quicksand]">
                +233 24 000 0000
              </p>
            </div>

            <div>
              <ScrollHighlightText  variant="background-blue" className="text-xl font-[quicksand] font-medium mb-3">
                Email
              </ScrollHighlightText>
              <p className="text-muted-foreground mt-2 font-[quicksand]">
                info@smshomefinder.com
              </p>
            </div>

            <div>
              <ScrollHighlightText  variant="background-blue" className="text-xl font-[quicksand] font-medium mb-3">
                Working Hours
              </ScrollHighlightText>
              <p className="text-muted-foreground mt-2 font-[quicksand] leading-7">
                Monday - Friday <br />
                8:00 AM - 6:00 PM
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* FOOTER OUTSIDE CONTAINER */}
      <Footer />
    </>
  );
}