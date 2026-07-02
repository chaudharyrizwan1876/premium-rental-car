import { useCallback } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import SectionHeading from "../common/SectionHeading";
import CarCard from "../cars/CarCard";
import CarCardSkeleton from "../cars/CarCardSkeleton";
import Button from "../common/Button";
import { useFetch } from "../../hooks/useFetch";
import { getFeaturedCars } from "../../services/carService";

function FeaturedCars() {
  const fetcher = useCallback(() => getFeaturedCars(), []);
  const { data: cars, isLoading, error, refetch } = useFetch(fetcher);

  const featuredCars = (cars || []).slice(0, 8);

  return (
    <section className="max-w-7xl mx-auto px-8 sm:px-10 lg:px-12 py-24 sm:py-28">
      <SectionHeading
        label="The Collection"
        title="Featured Vehicles"
        description="A handpicked selection of our most requested cars — each one inspected, detailed, and ready for the road."
        ctaText="View All Cars"
        ctaTo="/cars"
      />

      <div className="mt-12">
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <CarCardSkeleton key={i} />
            ))}
          </div>
        )}

        {!isLoading && error && (
          <div className="flex flex-col items-center justify-center text-center py-16 px-6 rounded-2xl border border-gold-500/10 bg-base-900">
            <HiOutlineExclamationCircle className="w-10 h-10 text-gold-500/60 mb-4" />
            <p className="text-ivory font-medium">Couldn&apos;t load featured vehicles</p>
            <p className="text-mist text-sm mt-1 max-w-sm">{error}</p>
            <Button onClick={refetch} variant="secondary" size="sm" className="mt-6">
              Try Again
            </Button>
          </div>
        )}

        {!isLoading && !error && featuredCars.length === 0 && (
          <div className="flex flex-col items-center justify-center text-center py-16 px-6 rounded-2xl border border-gold-500/10 bg-base-900">
            <p className="text-ivory font-medium">No featured vehicles available right now</p>
            <p className="text-mist text-sm mt-1">Check back soon, or browse the full fleet.</p>
            <Button to="/cars" variant="secondary" size="sm" className="mt-6">
              Browse All Cars
            </Button>
          </div>
        )}

        {!isLoading && !error && featuredCars.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCars.map((car, index) => (
              <CarCard key={car.id} car={car} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default FeaturedCars;
