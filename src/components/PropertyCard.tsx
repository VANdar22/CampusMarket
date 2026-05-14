// PropertyCard.tsx

import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

import location from "../images/location.png";
import bed from "../images/bedroom.png";
import house from "../images/house.png";

type Property = {
  id: string;
  title: string;
  price: number;
  bedrooms: number;
  image: string;
  location: string;
  featured_image: string;
  listing_type: string;
  currency: string;
};

export function PropertyCard({
  property,
}: {
  readonly property: Property;
}) {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() =>
        navigate(`/property/${property.id}`)
      }
      className="
        border-none
        bg-transparent
        shadow-none
        cursor-pointer
        group
      "
    >
      <CardContent className="p-0">

        {/* IMAGE */}
        <div className="overflow-hidden h-[240px] sm:h-[300px] md:h-[280px] bg-muted/10">
          <img
            src={property.featured_image}
            alt={property.title}
            className="
              w-full
              h-full
              object-cover
              transition-transform
              duration-700
              group-hover:scale-105
            "
          />
        </div>

        {/* CONTENT */}
        <div className="pt-5 space-y-4">

          {/* TITLE + PRICE */}
          <div className="space-y-3">

<h2
  className="
    text-md
    md:text-lg
    font-quicksand
    font-medium
    tracking-wide
    uppercase
    leading-relaxed
    line-clamp-1
    min-h-[56px]
  "
>
  {property.title}
</h2>

<p
  className="
    text-lg
    md:text-xl
    font-medium
    text-accent
    tracking-wide
  "
>
  {property.currency} {property.price.toLocaleString()}
</p>
</div>


          {/* DETAILS */}
          <div className="flex flex-wrap items-center gap-6 text-secondary">

{/* SHOW BEDROOMS ONLY IF AVAILABLE */}
{property.bedrooms > 0 && (
  <div className="flex items-center gap-2">
    <img
      src={bed}
      alt="bed"
      className="h-5 w-5"
    />

    <span>
      {property.bedrooms} Bedrooms
    </span>
  </div>
)}


{/* LOCATION */}
<div className="flex items-center gap-2 min-w-0">
  <img
    src={location}
    alt="location"
    className="h-5 w-5 shrink-0"
  />

  <span className="line-clamp-1">
    {property.location}
  </span>
</div>
</div>
        </div>
      </CardContent>
    </Card>
  );
}

export default PropertyCard;