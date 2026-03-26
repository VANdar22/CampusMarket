import { useNavigate, useSearchParams } from "react-router-dom";
import all from "@/images/all.png";
import books from "@/images/books.png";
import electronics from "@/images/electronics.png";
import fashion from "@/images/fashion.png";
import hostel_items from "@/images/hostel.png";
import stationery from "@/images/stationery.png";
import sports from "@/images/sports.png";
import other from "@/images/others.png";

const categories = [
  { value: "books", label: "Books", image: books },
  { value: "electronics", label: "Electronics", image: electronics },
  { value: "fashion", label: "Fashion", image: fashion },
  { value: "hostel_items", label: "Hostel", image: hostel_items },
  { value: "stationery", label: "Stationery", image: stationery },
  { value: "sports", label: "Sports", image: sports },
  { value: "other", label: "Other", image: other },
];

interface CategoryFilterProps {
  selected?: string; // current category from URL
}

export function CategoryFilter({ selected }: CategoryFilterProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const school = searchParams.get("school");

  return (
    <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 p-4">
      {categories.map((cat) => {
        // Compare lowercase to avoid case mismatch
        const isSelected = selected?.toLowerCase() === cat.value.toLowerCase();

        return (
          <div
            key={cat.value}
            onClick={() => {
              const base = cat.value === "all" ? "/" : `/category/${cat.value}`;

              if (school) {
                navigate(`${base}?school=${school}`);
              } else {
                navigate(base);
              }
            }}
            className={`
              relative cursor-pointer overflow-hidden 
              hover:shadow-md transition duration-300
              border ${isSelected ? "border-2 border-primary" : "border border-border"}
            `}
          >
            <img
              src={cat.image}
              alt={cat.label}
              className="w-full h-32 object-cover"
            />
            <div className="text-center text-lg font-light mt-2">
              {cat.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}