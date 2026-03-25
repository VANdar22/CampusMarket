import { useState } from "react";

const categories = [
  {
    value: "all",
    label: "All",
    image: "https://images.pexels.com/photos/4348404/pexels-photo-4348404.jpeg",
  },
  {
    value: "books",
    label: "Books",
    image: "https://images.pexels.com/photos/694740/pexels-photo-694740.jpeg",
  },
  {
    value: "electronics",
    label: "Electronics",
    image: "https://images.pexels.com/photos/5077046/pexels-photo-5077046.jpeg",
  },
  {
    value: "fashion",
    label: "Fashion",
    image: "https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg",
  },
  {
    value: "hostel_items",
    label: "Hostel",
    image: "https://images.pexels.com/photos/534173/pexels-photo-534173.jpeg",
  },
  {
    value: "stationery",
    label: "Stationery",
    image: "https://images.pexels.com/photos/4145114/pexels-photo-4145114.jpeg",
  },
  {
    value: "sports",
    label: "Sports",
    image: "https://images.pexels.com/photos/47730/the-ball-stadion-football-the-pitch-47730.jpeg",
  },
  {
    value: "other",
    label: "Other",
    image: "https://images.pexels.com/photos/716398/pexels-photo-716398.jpeg",
  },
];

interface CategoryFilterProps {
  selected: string;
  onSelect: (cat: string) => void;
}

export function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4">
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