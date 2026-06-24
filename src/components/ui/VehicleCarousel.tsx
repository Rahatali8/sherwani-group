"use client";

import { useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { PlaceholderImage } from "./Media";

interface Vehicle {
  id: number;
  name: string;
  tagline: string;
  price: string;
  image: string;
  pdf?: string;
  specs?: { label: string; value: string }[];
}

export const vehicles: Vehicle[] = [
  {
    id: 1,
    name: "Corolla Altis X 1.8",
    tagline: "Power. Prestige. Passion.",
    price: "Rs. 7,049,000",
    image: "/images/vehicles/corolla-altis-x-1-8.jpg",
    pdf: "/pdfs/corollax8.pdf",
    specs: [
      { label: "Make", value: "Toyota" },
      { label: "Transmission", value: "Automatic" },
      { label: "Fuel Type", value: "Petrol" },
      { label: "Engine", value: "1.8L" },
      { label: "Seating", value: "5" },
    ],
  },
  {
    id: 2,
    name: "Revo",
    tagline: "Go Wild",
    price: "Rs. 12,354,000",
    image: "/images/vehicles/revo.jpg",
    pdf: "/pdfs/revo.pdf",
    specs: [
      { label: "Make", value: "Toyota" },
      { label: "Model", value: "REVO" },
      { label: "Transmission", value: "Automatic" },
      { label: "Fuel Type", value: "Diesel" },
      { label: "Engine Displacement", value: "2755 CC" },
      { label: "Seating Capacity", value: "5" },
      { label: "Engine Type", value: "4 Cylinder Diesel Engine Turbocharger & Intercooler" },
      { label: "Engine Code", value: "1GD-FTV" },
      { label: "Max. Torque", value: "450@1600-2400 Nm@rpm" },
    ],
  },
  {
    id: 3,
    name: "Revo Rocco",
    tagline: "Power that's move you",
    price: "Rs. 14,899,000",
    image: "/images/vehicles/revo-rocco.jpg",
    pdf: "/pdfs/revorocco.pdf",
    specs: [
      { label: "Make", value: "Toyota" },
      { label: "Model", value: "REVO ROCCO" },
      { label: "Transmission", value: "Automatic" },
      { label: "Fuel Type", value: "Diesel" },
      { label: "Engine", value: "2.8L" },
      { label: "Seating", value: "5" },
    ],
  },
  {
    id: 4,
    name: "Revo GR-S",
    tagline: "Power that's move you",
    price: "Rs. 15,869,000",
    image: "/images/vehicles/revo-gr-s.jpg",
    pdf: "/pdfs/revo-gr-s.pdf",
    specs: [
      { label: "Make", value: "Toyota" },
      { label: "Model", value: "REVO GR-S" },
      { label: "Transmission", value: "Automatic" },
      { label: "Fuel Type", value: "Diesel" },
      { label: "Engine", value: "2.8L" },
      { label: "Seating", value: "5" },
    ],
  },

  {
    id: 5,
    name: "COROLLA CROSS HEV",
    tagline: "The Best of all worlds",
    price: "Rs. 8,559,000",
    image: "/images/vehicles/crosshev.jpg",
     pdf: "/pdfs/corolla.pdf",
    specs: [
      { label: "Make", value: "Toyota" },
      { label: "Model", value: "REVO GR-S" },
      { label: "Transmission", value: "Automatic" },
      { label: "Fuel Type", value: "Diesel" },
      { label: "Engine", value: "2.8L" },
      { label: "Seating", value: "5" },
    ],
  },
  {
    id: 6,
    name: "YARIS",
    tagline: "Make Way",
    price: "Rs. 4,649,000",
    image: "/images/vehicles/yaris.jpg.png",
      pdf: "/pdfs/yaris.pdf",
    specs: [
      { label: "Make", value: "Toyota" },
      { label: "Model", value: "REVO GR-S" },
      { label: "Transmission", value: "Automatic" },
      { label: "Fuel Type", value: "Diesel" },
      { label: "Engine", value: "2.8L" },
      { label: "Seating", value: "5" },
    ],
  },
  {
    id: 7,
    name: "Corolla Altis X 1.6L",
    tagline: "Simply amazing",
    price: "Rs. 6,119,000",
    image: "/images/vehicles/corolla.jpg",
      pdf: "/pdfs/corollax6.pdf",
    specs: [
      { label: "Make", value: "Toyota" },
      { label: "Model", value: "REVO GR-S" },
      { label: "Transmission", value: "Automatic" },
      { label: "Fuel Type", value: "Diesel" },
      { label: "Engine", value: "2.8L" },
      { label: "Seating", value: "5" },
    ],
  },
  {
    id: 8,
    name: "Camry Hybrid",
    tagline: "Striking Luxury",
    price: "Rs. 30,015,000",
    image: "/images/vehicles/camry.jpg",
      pdf: "/pdfs/camryhybrid.pdf",
    specs: [
      { label: "Make", value: "Toyota" },
      { label: "Model", value: "REVO GR-S" },
      { label: "Transmission", value: "Automatic" },
      { label: "Fuel Type", value: "Diesel" },
      { label: "Engine", value: "2.8L" },
      { label: "Seating", value: "5" },
    ],
  },

  {
    id: 9,
    name: "Fortuner Legender",
    tagline: "Excellence Redefined",
    price: "Rs. 19,594,000",
    image: "/images/vehicles/forunerLeg.jpg",
      pdf: "/pdfs/fortunerlegender.pdf",
    specs: [
      { label: "Make", value: "Toyota" },
      { label: "Model", value: "REVO GR-S" },
      { label: "Transmission", value: "Automatic" },
      { label: "Fuel Type", value: "Diesel" },
      { label: "Engine", value: "2.8L" },
      { label: "Seating", value: "5" },
    ],
  },
  {
    id: 10,
    name: "HIACE",
    tagline: "A trustworthy partner",
    price: "Rs. 11,477,000",
    image: "/images/vehicles/hiace.jpg",
      pdf: "/pdfs/hiace.pdf",
    specs: [
      { label: "Make", value: "Toyota" },
      { label: "Model", value: "REVO GR-S" },
      { label: "Transmission", value: "Automatic" },
      { label: "Fuel Type", value: "Diesel" },
      { label: "Engine", value: "2.8L" },
      { label: "Seating", value: "5" },
    ],
  },
  {
    id: 11,
    name: "HIACE DELUXE",
    tagline: "Partenering yourDrive to success",
    price: "Rs. 13,094,000",
    image: "/images/vehicles/hiaceD.jpg",
      pdf: "/pdfs/hiaceDlux.pdf",
    specs: [
      { label: "Make", value: "Toyota" },
      { label: "Model", value: "REVO GR-S" },
      { label: "Transmission", value: "Automatic" },
      { label: "Fuel Type", value: "Diesel" },
      { label: "Engine", value: "2.8L" },
      { label: "Seating", value: "5" },
    ],
  },
  {
    id: 12,
    name: "Land Cruiser Prado",
    tagline: "Reach the Unreachable ",
    price: "Rs. 55,034,000",
    image: "/images/vehicles/landcruiser.jpg",
      pdf: "/pdfs/landcruiser.pdf",
    specs: [
      { label: "Make", value: "Toyota" },
      { label: "Model", value: "REVO GR-S" },
      { label: "Transmission", value: "Automatic" },
      { label: "Fuel Type", value: "Diesel" },
      { label: "Engine", value: "2.8L" },
      { label: "Seating", value: "5" },
    ],
  },

  {
    id: 13,
    name: "Land Cruiser 300",
    tagline: "  The Pro Way To Go",
    price: "Rs. 95,040,000",
    image: "/images/vehicles/LC300.jpg", 
      pdf: "/pdfs/LC-300.pdf",
    specs: [
      { label: "Make", value: "Toyota" },
      { label: "Model", value: "REVO GR-S" },
      { label: "Transmission", value: "Automatic" },
      { label: "Fuel Type", value: "Diesel" },
      { label: "Engine", value: "2.8L" },
      { label: "Seating", value: "5" },
    ],   
  },
  {
    id: 14,
    name: "Coaster",
    tagline: "Dependable Transportation",
    price: "Rs. 12,354,000",
    image: "/images/vehicles/coaster.jpg",
      pdf: "/pdfs/coaster.pdf",
    specs: [
      { label: "Make", value: "Toyota" },
      { label: "Model", value: "REVO GR-S" },
      { label: "Transmission", value: "Automatic" },
      { label: "Fuel Type", value: "Diesel" },
      { label: "Engine", value: "2.8L" },
      { label: "Seating", value: "5" },
    ],
  },

    {    id: 15,
    name: "FORTUNER GR-S",
    tagline: "Built to Unbeatable",
    price: "Rs. 20,529,000",
    image: "/images/vehicles/FGR-S.jpg",
      pdf: "/pdfs/fortunerGRS.pdf",
    specs: [
      { label: "Make", value: "Toyota" },
      { label: "Model", value: "REVO GR-S" },
      { label: "Transmission", value: "Automatic" },
      { label: "Fuel Type", value: "Diesel" },
      { label: "Engine", value: "2.8L" },
      { label: "Seating", value: "5" },
    ],
  },

  {
    id: 16,
    name: "Hilux E",
    tagline: "Standard",
    price: "Rs. 11,409,000",
    image: "/images/vehicles/hiluxE.jpg",
      pdf: "/pdfs/hiluxE.pdf",
    specs: [
      { label: "Make", value: "Toyota" },
      { label: "Model", value: "REVO GR-S" },
      { label: "Transmission", value: "Automatic" },
      { label: "Fuel Type", value: "Diesel" },
      { label: "Engine", value: "2.8L" },
      { label: "Seating", value: "5" },
    ],
  },
  {
    id: 17,
    name: "Hilux",
    tagline: " 6,569,000",
    price: "Rs. Single Cabin",
    image: "/images/vehicles/hilux.jpg",
      pdf: "/pdfs/hilux.pdf",
    specs: [
      { label: "Make", value: "Toyota" },
      { label: "Model", value: "REVO GR-S" },
      { label: "Transmission", value: "Automatic" },
      { label: "Fuel Type", value: "Diesel" },
      { label: "Engine", value: "2.8L" },
      { label: "Seating", value: "5" },
    ],
  },

  {
    id: 19,
    name: "FORTUNER",
    tagline: "Explore a new dimension",
    price: "Rs. 14,964,000",
    image: "/images/vehicles/fortuner.jpg",
      pdf: "/pdfs/Toyotafortuner.pdf",
    specs: [
      { label: "Make", value: "Toyota" },
      { label: "Model", value: "REVO GR-S" },
      { label: "Transmission", value: "Automatic" },
      { label: "Fuel Type", value: "Diesel" },
      { label: "Engine", value: "2.8L" },
      { label: "Seating", value: "5" },
    ],
  },
]

export interface VehicleCarouselProps {
  selectedId: number;
  onSelect: (id: number) => void;
}

export default function VehicleCarousel({ selectedId, onSelect }: VehicleCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;

    const amount = container.clientWidth * 0.85;
    container.scrollBy({ left: direction === "right" ? amount : -amount, behavior: "smooth" });
  };

  return (
    <div className="w-full">
      <div className="relative">
        <div className="absolute left-4 top-1/2 z-10 -translate-y-1/2">
          <button
            onClick={() => scroll("left")}
            className="flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-black/70 text-text transition hover:border-gold hover:text-gold"
            aria-label="Scroll vehicles left"
          >
            <FiChevronLeft size={24} />
          </button>
        </div>

        <div className="overflow-hidden rounded-3xl border border-white/10 bg-bg/80">
          <div
            ref={scrollRef}
            className="flex gap-8 overflow-x-auto px-8 py-14 scroll-smooth"
          >
            {vehicles.map((vehicle) => (
              <button
                key={vehicle.id}
                type="button"
                onClick={() => onSelect(vehicle.id)}
                className={`min-w-[360px] flex-shrink-0 rounded-3xl border p-6 text-left shadow-[0_24px_90px_-55px_rgba(0,0,0,0.75)] md:min-w-[420px] transition ${
                  vehicle.id === selectedId
                    ? "border-gold bg-surface/95"
                    : "border-white/10 bg-surface/80 hover:border-gold/50"
                }`}
              >
                <div className="mb-6 h-64 overflow-hidden rounded-3xl">
                  <PlaceholderImage
                    src={vehicle.image}
                    alt={vehicle.name}
                    sizes="(max-width: 640px) 100vw, 420px"
                    className="h-full w-full object-cover"
                  />
                </div>

                <h3 className="mb-2 font-display text-lg uppercase tracking-tight text-text md:text-xl">
                  {vehicle.name}
                </h3>
                <p className="mb-4 font-ui text-sm italic leading-snug text-gold-soft">
                  {vehicle.tagline}
                </p>
                <p className="font-display text-xl font-semibold text-gold">
                  {vehicle.price}
                </p>
              </button>
            ))}
          </div>
        </div>

        <div className="absolute right-4 top-1/2 z-10 -translate-y-1/2">
          <button
            onClick={() => scroll("right")}
            className="flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-black/70 text-text transition hover:border-gold hover:text-gold"
            aria-label="Scroll vehicles right"
          >
            <FiChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
