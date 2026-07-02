import { useCallback } from "react";
import { motion } from "framer-motion";
import { HiOutlineHeart } from "react-icons/hi2";
import { useFetch } from "../../hooks/useFetch";
import { getWeddingCars } from "../../services/carService";
import CarCard from "../../components/cars/CarCard";
import CarCardSkeleton from "../../components/cars/CarCardSkeleton";
import SectionHeading from "../../components/common/SectionHeading";
import Button from "../../components/common/Button";

const SUBCATEGORIES = [
  { label: "Vintage Cars", emoji: "🏛️" },
  { label: "Rolls-Royce", emoji: "👑" },
  { label: "Bentley", emoji: "💎" },
  { label: "Mercedes-Benz", emoji: "⭐" },
  { label: "BMW", emoji: "🔵" },
  { label: "Audi", emoji: "🔷" },
  { label: "Stretch Limousines", emoji: "🚗" },
  { label: "Exotic Cars", emoji: "🔥" },
];

function WeddingCars() {
  const fetcher = useCallback(() => getWeddingCars(), []);
  const { data: cars, isLoading } = useFetch(fetcher);

  return (
    <div className="pt-28 pb-20 min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-base-900 via-base-950 to-black" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gold-500/[0.05] rounded-full blur-[120px] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-8 sm:px-10 lg:px-12 text-center">
          <div className="flex items-center justify-center gap-2 mb-5">
            <span className="h-px w-10 bg-gold-500/40" />
            <HiOutlineHeart className="w-4 h-4 text-gold-400" />
            <span className="h-px w-10 bg-gold-500/40" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs sm:text-sm tracking-[0.3em] uppercase text-gold-400 font-medium mb-4">
              Your Special Day
            </p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-ivory leading-tight">
              Wedding Collection
            </h1>
            <p className="mt-6 text-mist text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Make your special day even more memorable with our luxury wedding cars.
              Every vehicle is chauffeur-ready, beautifully presented, and tailored to
              your day.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Subcategories */}
      <section className="border-y border-gold-500/10 bg-base-900">
        <div className="max-w-7xl mx-auto px-8 sm:px-10 lg:px-12 py-10">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {SUBCATEGORIES.map((sub, i) => (
              <motion.span
                key={sub.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-gold-500/20 bg-base-950 text-sm text-ivory/80 hover:border-gold-400/50 hover:text-ivory transition-colors duration-200 cursor-default"
              >
                <span>{sub.emoji}</span>
                {sub.label}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* Cars listing */}
      <section className="max-w-7xl mx-auto px-8 sm:px-10 lg:px-12 py-20">
        <SectionHeading
          label="Our Wedding Fleet"
          title="Available Wedding Cars"
          description="Each vehicle arrives cleaned, decorated on request, and with a professional chauffeur available."
        />

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => <CarCardSkeleton key={i} />)
            : (cars || []).map((car, i) => (
                <CarCard key={car.id} car={car} index={i} />
              ))}
        </div>

        <div className="mt-16 rounded-2xl glass-panel p-10 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-gold-400 font-medium mb-3">
            Need Something Specific?
          </p>
          <h3 className="font-display text-2xl font-semibold text-ivory">
            Custom Wedding Package
          </h3>
          <p className="text-mist text-sm mt-3 max-w-md mx-auto leading-relaxed">
            Multiple cars for the bridal party? Vintage and modern combo? Get in
            touch and we'll put together a bespoke package for your day.
          </p>
          <Button to="/contact" variant="primary" size="md" className="mt-6">
            Enquire Now
          </Button>
        </div>
      </section>
    </div>
  );
}

export default WeddingCars;
