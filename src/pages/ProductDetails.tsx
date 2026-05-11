import { useNavigate, useParams } from "react-router-dom";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";

import { Card } from "@/components/ui/card";

import {
  ArrowLeft,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Plus,
  Minus,
} from "lucide-react";

import bed from "../images/bedroom.png";

import bath from "../images/bathroom.png";
import check from "../images/check.png";
import house from "../images/house.png";
import PropertyCard from "../components/PropertyCard";

import ScrollHighlightText from "../components/ScrollHighlightText";
import location from "../images/location.png";
// -----------------------------------
// MOCK PROPERTY DATA
// -----------------------------------

const properties = [
  {
    id: "1",

    title: "4-Bedroom Uncompleted Storey Building For Sale – Bortianor",

    listing_type: "For Sale",

    status: "Pending",

    location: "Ayololo Junction – Near St. Karol Nursing School, Bortianor",

    price: 400000,

    currency: "GHS",

    negotiable: false,

    property_type: "Storey Building",

    bedrooms: 4,

    bathrooms: 5,

    description: `
A great investment opportunity in a fast-growing and peaceful neighborhood.4-Bedroom Storey Building (up to window level)Strong structural foundation completed Spacious layout with great potential Ideal for a family home or rental investment

    `,

    site_plan: true,

    indenture: true,

    building_permit: true,

    agent_name: "Noble Realty Ghana",

    phone_number: "233537435123",

    image_urls: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200",

      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1200",

      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1200",

      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200",
    ],
  },
];

// -----------------------------------
// RELATED PROPERTIES
// -----------------------------------

const relatedProperties = [
  {
    id: "2",

    title: "Luxury 5 Bedroom Townhouse – Cantonments",

    location: "Cantonments, Accra",

    price: 1100000,

    currency: "$",

    image_url:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200",

    listing_type: "For Sale",
  },

  {
    id: "3",

    title: "Land For Sale – Noble Realty Estates",

    location: "Prampram, Accra",

    price: 300000,

    currency: "GHS",

    image_url:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200",

    listing_type: "For Sale",
  },

  {
    id: "4",

    title: "Newly Built 4 Bedroom House For Rent",

    location: "School Junction, Accra",

    price: 1300,

    currency: "$",

    image_url:
      "https://images.unsplash.com/photo-1605146769289-440113cc3d00?q=80&w=1200",

    listing_type: "For Rent",
  },
];

// -----------------------------------
// IMAGE GALLERY
// -----------------------------------

interface PropertyImageGalleryProps {
  images: string[];
}

const PropertyImageGallery = ({ images }: PropertyImageGalleryProps) => {
  return (
    <div className="w-full">
      {/* DESKTOP */}
      <div className="hidden lg:flex flex-col gap-4">
        {images.map((img, index) => (
          <div key={index} className="overflow-hidden">
            <img
              src={img}
              alt={`Property ${index + 1}`}
              className="w-full h-[500px] object-cover"
            />
          </div>
        ))}
      </div>

      {/* MOBILE */}
      <div className="lg:hidden overflow-x-auto scrollbar-hide">
        <div className="flex gap-4 snap-x snap-mandatory">
          {images.map((img, index) => (
            <div
              key={index}
              className="
                min-w-full
                snap-center
                overflow-hidden
                h-[300px]
              "
            >
              <img
                src={img}
                alt={`Property ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// -----------------------------------
// RELATED PROPERTY CARD
// -----------------------------------

const RelatedPropertyCard = ({ item }: any) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/property/${item.id}`)}
      className="
        overflow-hidden
        transition-all
        duration-300
        cursor-pointer
        border-0
      "
    >
      <img
        src={item.image_url}
        alt={item.title}
        className="h-60 w-full object-cover"
      />

      <div className="p-5 space-y-3">
        <h3 className="font-medium font-[quicksand] text-lg line-clamp-2">
          {item.title}
        </h3>

        <div className="flex items-center font-[quicksand] gap-2 text-muted-foreground">
          <img src={location} className="h-4 w-4" />
          {item.location}
        </div>

        <p className="text-2xl font-medium text-accent font-[Aboreto]">
          {item.currency} {Number(item.price).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

// -----------------------------------
// MAIN PAGE
// -----------------------------------

export default function PropertyDetails() {
  const navigate = useNavigate();

  const { id } = useParams();

  const property = properties.find((item) => item.id === id);

  const [openAccordion, setOpenAccordion] = useState(1);

  if (!property) {
    return <div className="p-10">Property not found</div>;
  }

  const toggleAccordion = (id: number) => {
    setOpenAccordion(openAccordion === id ? 0 : id);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* TOP BAR */}
      <div className="max-w-7xl mx-auto px-6 pt-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-muted-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-10 space-y-14">
        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* LEFT */}
          <PropertyImageGallery images={property.image_urls} />

          {/* RIGHT */}
          <div className="space-y-6 lg:sticky lg:top-6 h-fit">
            {/* BADGE */}
            <div>
              <div className="text-accent font-[Aboreto] text-sm tracking-[0.2em] uppercase">
                {property.listing_type}
              </div>
            </div>

            {/* TITLE */}
            <div>
              <h1 className="text-xl md:text-3xl font-[quicksand] font-medium leading-tight">
                {property.title}
              </h1>
            </div>

            {/* PRICE */}
            <div>
              <h2 className="text-2xl md:text-3xl font-[Aboreto] text-accent">
                {property.currency} {Number(property.price).toLocaleString()}
              </h2>
            </div>

            {/* QUICK INFO */}
            <div className="grid grid-cols-3 gap-4 border-y py-6">
              <div className="text-center">
                <img src={bed} className="mx-auto h-3 w-3 md:h-6 md:w-6 mb-3" />

                <p className="text-sm md:text-lg text-muted-foreground font-[quicksand]">
                  {property.bedrooms} Bedrooms
                </p>
              </div>

              <div className="text-center">
                <img
                  src={bath}
                  className="mx-auto h-3 w-3 md:h-6 md:w-6 mb-3"
                />

                <p className="text-sm md:text-lg text-muted-foreground font-[quicksand]">
                  {property.bathrooms} Bathrooms
                </p>
              </div>

              <div className="text-center">
                <img
                  src={house}
                  className="mx-auto h-3 w-3 md:h-6 md:w-6 mb-3"
                />

                <p className="text-sm md:text-lg text-muted-foreground font-[quicksand]">
                  {property.property_type}
                </p>
              </div>
            </div>

            {/* ACCORDIONS */}
            <div className="space-y-4">
              {/* 1 */}
              <div className="border rounded-[28px] overflow-hidden bg-[#fafafa]">
                <button
                  onClick={() => toggleAccordion(1)}
                  className="
                    w-full
                    flex
                    items-center
                    justify-between
                    px-6
                    md:px-10
                    py-8
                    text-left
                  "
                >
                  <div className="flex items-center gap-5">
                    <span className="text-accent text-xl md:text-2xl font-light">
                      1.
                    </span>

                    <h2
                      className="
                        text-lg
                        md:text-xl
                        font-[quicksand]
                        font-light
                        text-secondary
                      "
                    >
                      Property Description
                    </h2>
                  </div>

                  {openAccordion === 1 ? (
                    <Minus className="h-7 w-7 text-accent" />
                  ) : (
                    <Plus className="h-7 w-7 text-accent" />
                  )}
                </button>

                {openAccordion === 1 && (
                  <div className="px-6 md:px-10 pb-10 max-w-4xl">
                    <p
                      className="
                        text-base
                        md:text-lg
                        leading-relaxed
                        text-muted-foreground
                        whitespace-pre-line
                        font-[quicksand]
                      "
                    >
                      {property.description}
                    </p>
                  </div>
                )}
              </div>

              {/* 2 */}
              <div className="border rounded-[28px] overflow-hidden bg-[#fafafa]">
                <button
                  onClick={() => toggleAccordion(2)}
                  className="
                    w-full
                    flex
                    items-center
                    justify-between
                    px-6
                    md:px-10
                    py-8
                    text-left
                  "
                >
                  <div className="flex items-center gap-5">
                    <span className="text-accent text-lg md:text-xl font-light">
                      2.
                    </span>

                    <h2
                      className="
                        text-lg
                        md:text-xl
                        font-[quicksand]
                        font-light
                        text-secondary
                      "
                    >
                      Property Details
                    </h2>
                  </div>

                  {openAccordion === 2 ? (
                    <Minus className="h-7 w-7 text-accent" />
                  ) : (
                    <Plus className="h-7 w-7 text-accent" />
                  )}
                </button>

                {openAccordion === 2 && (
                  <div className="px-6 md:px-10 pb-10">
                    <div className="space-y-5 text-muted-foreground text-lg font-[quicksand]">
                      <div className="flex justify-between border-b pb-3">
                        <span>Bedrooms</span>
                        <span>{property.bedrooms}</span>
                      </div>

                      <div className="flex justify-between border-b pb-3">
                        <span>Bathrooms</span>
                        <span>{property.bathrooms}</span>
                      </div>

                      <div className="flex justify-between border-b pb-3">
                        <span>Property Type</span>
                        <span>{property.property_type}</span>
                      </div>

                      <div className="flex justify-between border-b pb-3">
                        <span>Status</span>
                        <span>{property.status}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 3 */}
              <div className="border rounded-[28px] overflow-hidden bg-[#fafafa]">
                <button
                  onClick={() => toggleAccordion(3)}
                  className="
                    w-full
                    flex
                    items-center
                    justify-between
                    px-6
                    md:px-10
                    py-8
                    text-left
                  "
                >
                  <div className="flex items-center gap-5">
                    <span className="text-accent text-lg md:text-xl font-light">
                      3.
                    </span>

                    <h2
                      className="
                        text-lg
                        md:text-xl
                        font-[quicksand]
                        font-light
                        text-secondary
                      "
                    >
                      Documents Available
                    </h2>
                  </div>

                  {openAccordion === 3 ? (
                    <Minus className="h-7 w-7 text-accent" />
                  ) : (
                    <Plus className="h-7 w-7 text-accent" />
                  )}
                </button>

                {openAccordion === 3 && (
                  <div className="px-6 md:px-10 pb-10 space-y-5">
                    {property.site_plan && (
                      <div className="flex items-center gap-3 text-lg text-muted-foreground font-[quicksand]">
                        <img src={check} className="h-5 w-5" />
                        Site Plan
                      </div>
                    )}
                    <hr />

                    {property.indenture && (
                      <div className="flex items-center gap-3 text-lg text-muted-foreground font-[quicksand]">
                        <img src={check} className="h-5 w-5" />
                        Indenture
                      </div>
                    )}
                    <hr />
                    {property.building_permit && (
                      <div className="flex items-center gap-3 text-lg text-muted-foreground font-[quicksand]">
                        <img src={check} className="h-5 w-5 " />
                        Building Permit
                      </div>
                    )}
                    <hr />
                  </div>
                )}
              </div>

              {/* 4 */}
              <div className="border rounded-[28px] overflow-hidden bg-[#fafafa]">
                <button
                  onClick={() => toggleAccordion(4)}
                  className="
                    w-full
                    flex
                    items-center
                    justify-between
                    px-6
                    md:px-10
                    py-8
                    text-left
                  "
                >
                  <div className="flex items-center gap-5">
                    <span className="text-accent text-lg md:text-xl font-light">
                      4.
                    </span>

                    <h2
                      className="
                        text-lg
                        md:text-xl
                        font-[quicksand]
                        font-light
                        text-secondary
                      "
                    >
                      Contact Agent
                    </h2>
                  </div>

                  {openAccordion === 4 ? (
                    <Minus className="h-7 w-7 text-accent" />
                  ) : (
                    <Plus className="h-7 w-7 text-accent" />
                  )}
                </button>

                {openAccordion === 4 && (
                  <div className="px-6 md:px-10 pb-10 space-y-5">
                    <div>
                      <p className="text-lg text-muted-foreground font-[quicksand]">
                        Contact : {property.phone_number}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* RELATED PROPERTIES */}
        <div>
          <ScrollHighlightText className="text-2xl mb-4 font-medium font-[quicksand] uppercase">
            properties you may also like{" "}
          </ScrollHighlightText>

          <div className="grid grid-cols-1  mt-4 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProperties.map((item) => (
              <RelatedPropertyCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
