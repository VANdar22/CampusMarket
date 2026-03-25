import { useState } from "react";
import  all from "@/images/all.png";
import books from "@/images/books.png";
import electronics from "@/images/electronics.png";
import fashion from "@/images/fashion.png";
import hostel_items from "@/images/hostel.png";
import stationery from "@/images/stationery.png";
import sports from "@/images/sports.png";
import other from "@/images/others.png";

const categories = [
  {
    value: "all",
    label: "All",
    image: all,
  },
  {
    value: "books",
    label: "Books",
    image: books,
  },
  {
    value: "electronics",
    label: "Electronics",
    image: electronics,
  },
  {
    value: "fashion",
    label: "Fashion",
    image: fashion,
  },
  {
    value: "hostel_items",
    label: "Hostel",
    image: hostel_items,
  },
  {
    value: "stationery",
    label: "Stationery",
    image: stationery,
  },
  {
    value: "sports",
    label: "Sports",
    image: sports,
  },
  {
    value: "other",
    label: "Other",
    image: other,
  },
];

interface CategoryFilterProps {
  selected: string;
  onSelect: (cat: string) => void;
}

export function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4 p-4">
      {categories.map((cat) => {
        const isSelected = selected === cat.value;
        return (
          <div
            key={cat.value}
            onClick={() => onSelect(cat.value)}
            className={`
              relative cursor-pointer overflow-hidden 
              hover:shadow-md transition duration-300
              border ${isSelected ? "border-1 border-primary" : "border border-border"}
            `}
          >
            {/* Category Image */}
            
            <img
              src={cat.image}
              alt={cat.label}
              className="w-full h-32 object-cover backdrop-blur-lg"
            />

            {/* Category Label */}
            <div className="text-center text-lg font-light mt-2">
              {cat.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}