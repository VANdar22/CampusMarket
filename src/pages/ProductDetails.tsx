import { useNavigate, useParams } from "react-router-dom";
import { getProperties } from "@/services/properties";
import PropertyVideoGallery from "@/components/PropertyVideoGallery";
import { useEffect, useState } from "react";

import {
  ArrowLeft,
  Plus,
  Minus,
} from "lucide-react";

import bed from "../images/bedroom.png";
import bath from "../images/bathroom.png";
import check from "../images/check.png";
import house from "../images/house.png";
import location from "../images/location.png";

import ScrollHighlightText from "../components/ScrollHighlightText";

// -----------------------------------
// IMAGE GALLERY
// -----------------------------------
interface PropertyImageGalleryProps {
  gallery_images: any[];
}
const PropertyImageGallery = ({ gallery_images }: PropertyImageGalleryProps) => {
  return (
    <div className="w-full">
      {/* DESKTOP */}
      <div className="hidden lg:flex flex-col gap-4">
        {gallery_images.map((img, index) => (
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
          {gallery_images.map((img, index) => (
            <div
              key={index}
              className="min-w-full snap-center overflow-hidden h-[300px]"
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
        src={
          item.featured_image ||
          (Array.isArray(item.gallery_images) &&
          item.gallery_images.length > 0
            ? typeof item.gallery_images[0] === "string"
              ? item.gallery_images[0]
              : item.gallery_images[0]?.url
            : "")
        }
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

  const [property, setProperty] = useState<any>(null);

  const [properties, setProperties] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  const [openAccordion, setOpenAccordion] = useState(1);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const data = await getProperties();

        setProperties(data || []);

        const foundProperty = data.find(
          (item: any) => String(item.id) === String(id)
        );

        setProperty(foundProperty);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-3xl font-[aboreto] text-accent">
        Loading...
      </div>
    );
  }
  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center text-3xl font-[aboreto] text-accent">Property not found</div>
    );
  }

  console.log(property.gallery_images);

  const toggleAccordion = (id: number) => {
    setOpenAccordion(openAccordion === id ? 0 : id);
  };

  // -----------------------------------
  // RELATED PROPERTIES
  // -----------------------------------

  const relatedProperties = properties
    .filter(
      (item: any) =>
        item.id !== property.id &&
        item.listing_type === property.listing_type
    )
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      {/* TOP BAR */}
      <div className="max-w-7xl mx-auto px-6 pt-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-[aboreto] text-accent font-medium"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-10 space-y-14">
        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* LEFT */}
          <div className="space-y-6">
  <PropertyImageGallery
    gallery_images={
      Array.isArray(property.gallery_images)
        ? property.gallery_images
        : []
    }
  />

  <PropertyVideoGallery
    videos={
      Array.isArray(property.videos)
        ? property.videos
        : []
    }
  />
</div>

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
                {property.currency}{" "}
                {Number(property.price).toLocaleString()}
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

             
                  



                  
              {/* 4 */}
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
                      Contact Agent
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
                    <div>
                      <p className="text-lg text-muted-foreground font-[quicksand]">
                        Contact : {property.contact_phone}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* RELATED PROPERTIES */}
        {relatedProperties.length > 0 && (
          <div>
            <ScrollHighlightText className="text-2xl mb-4 font-medium font-[quicksand] uppercase">
              properties you may also like
            </ScrollHighlightText>

            <div className="grid grid-cols-1 mt-4 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProperties.map((item) => (
                <RelatedPropertyCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}