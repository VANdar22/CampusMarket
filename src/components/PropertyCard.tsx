// PropertyCard.tsx

import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

import location from "../images/location.png";
import bed from "../images/bedroom.png";

type Property = {
  id: string;
  title: string;
  price: number;
  bedrooms: number;
  image: string;
  location: string;
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
        <div className="overflow-hidden h-[240px] sm:h-[300px] md:h-[380px] bg-muted/10">
          <img
            src={property.image}
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
          <div className="flex items-start justify-between gap-4">

            <h2 className="text-md md:text-xl tracking-wide uppercase">
              {property.title}
            </h2>

            <p className="text-lg md:text-2xl font-medium text-accent whitespace-nowrap">
              USD {property.price.toLocaleString()}
            </p>
          </div>

          {/* DETAILS */}
          <div className="flex flex-wrap items-center gap-6 text-secondary">

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

            <div className="flex items-center gap-2">
              <img
                src={location}
                alt="location"
                className="h-5 w-5"
              />

              <span>{property.location}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default PropertyCard;