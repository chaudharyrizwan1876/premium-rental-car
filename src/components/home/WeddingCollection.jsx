import { useCallback } from "react";
import { HiOutlineHeart } from "react-icons/hi2";
import SectionHeading from "../common/SectionHeading";
import CarCard from "../cars/CarCard";
import CarCardSkeleton from "../cars/CarCardSkeleton";
import Button from "../common/Button";
import { useFetch } from "../../hooks/useFetch";
import { getWeddingCars } from "../../services/carService";

function WeddingCollection() {
  const fetcher = useCallback(() => getWeddingCars(), []);
  const { data: cars, isLoading, error } = useFetch(fetcher);

  const weddingCars = (cars || []).slice(0, 3);

  if (!isLoading && !error && weddingCars.length === 0) {
    return null;
  }

  return (
    <section className="relative overflow-hidden">
      {/* Ambient romantic glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gold-500/[0.04] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-8 sm:px-10 lg:px-12 py-24 sm:py-28">
        <div className="flex items-center justify-center gap-2 mb-5">
          <span className="h-px w-10 bg-gold-500/40" />
          <HiOutlineHeart className="w-4 h-4 text-gold-400" />
          <span className="h-px w-10 bg-gold-500/40" />
        </div>

        <SectionHeading
          label="For Your Special Day"
          title="Wedding Collection"
          description="Make your entrance unforgettable. Our wedding fleet pairs timeless elegance with flawless presentation, chauffeured and ready for the occasion."
          align="center"
        />

        <div className="mt-12">
          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <CarCardSkeleton key={i} />
              ))}
            </div>
          )}

          {!isLoading && !error && weddingCars.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {weddingCars.map((car, index) => (
                <CarCard key={car.id} car={car} index={index} />
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-center mt-12">
          <Button to="/wedding-cars" variant="secondary" size="lg">
            View Wedding Collection
          </Button>
        </div>
      </div>
    </section>
  );
}

export default WeddingCollection;
