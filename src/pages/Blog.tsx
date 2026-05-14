import ScrollHighlightText from "@/components/ScrollHighlightText";
import RevealImage from "@/components/RevealImage";


const blogs = [
  {
    id: 1,
    title: "Q1 2026 NYC Market Report",
    date: "April 13, 2026",
    image:
      "https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=1600&auto=format&fit=crop",
    content:
      "Q1 2026 saw strong rental demand, active sales, and shifting pricing across NYC. Buyers continued prioritizing modern living spaces, while developers focused on high-end apartments and mixed-use communities across the city.",
  },

  {
    id: 2,
    title: "Modern Homes Continue To Rise In Demand",
    date: "March 28, 2026",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1600&auto=format&fit=crop",
    content:
      "Modern homes with open layouts, smart-home integrations, and energy-efficient systems are becoming increasingly popular among younger buyers and investors in urban locations.",
  },

  {
    id: 3,
    title: "Luxury Apartments Lead Urban Growth",
    date: "February 10, 2026",
    image:
      "https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=1600&auto=format&fit=crop",
    content:
      "Luxury apartment developments continue expanding across major cities as demand for premium amenities, rooftop spaces, and co-working environments grows steadily.",
  },
];

export default function BlogPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20 grid gap-24">

      {blogs.map((blog, index) => (
        <div
          key={blog.id}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >

          {/* IMAGE */}
          <div
            className={`overflow-hidden  ${
              index % 2 !== 0
                ? "lg:order-2"
                : ""
            }`}
          >
            <RevealImage
              src={blog.image}
              alt={blog.title}
              height="350px"
              
            />
          </div>

          {/* CONTENT */}
          <div
            className={`max-w-2xl ${
              index % 2 !== 0
                ? "lg:order-1"
                : ""
            }`}
          >

            <ScrollHighlightText variant="background-blue" className="text-sm text-muted-foreground mb-10 p-3">
              {blog.date}
            </ScrollHighlightText>

            <ScrollHighlightText variant="background" className="text-xl md:text-3xl font-[quicksand] font-medium leading-tight mb-6">
              {blog.title}
            </ScrollHighlightText>

            <p className="text-muted-foreground leading-8 text-lg font-[quicksand]">
              {blog.content}
            </p>

          </div>

        </div>
      ))}

    </div>
  );
}