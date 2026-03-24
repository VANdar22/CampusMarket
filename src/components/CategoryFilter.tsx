import { Button } from "@/components/ui/button";

const categories = [
  { value: "all", label: "All", icon: "🛒" },
  { value: "books", label: "Books", icon: "📚" },
  { value: "electronics", label: "Electronics", icon: "💻" },
  { value: "fashion", label: "Fashion", icon: "👕" },
  { value: "hostel_items", label: "Hostel", icon: "🏠" },
  { value: "stationery", label: "Stationery", icon: "✏️" },
  { value: "sports", label: "Sports", icon: "⚽" },
  { value: "other", label: "Other", icon: "📦" },
];

interface CategoryFilterProps {
  selected: string;
  onSelect: (cat: string) => void;
}

export function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((cat) => (
        <Button
          key={cat.value}
          variant={selected === cat.value ? "default" : "secondary"}
          size="sm"
          onClick={() => onSelect(cat.value)}
          className="shrink-0 gap-1.5 rounded-full"
        >
          <span>{cat.icon}</span>
          <span>{cat.label}</span>
        </Button>
      ))}
    </div>
  );
}
