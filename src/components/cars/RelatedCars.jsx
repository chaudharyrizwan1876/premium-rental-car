import { useCallback } from "react";
import SectionHeading from "../common/SectionHeading";
import CarCard from "./CarCard";
import CarCardSkeleton from "./CarCardSkeleton";
import { useFetch } from "../../hooks/useFetch";
import { getRelatedCars } from "../../services/carService";

function RelatedCars({ category, excludeId }) {
  const fetcher = useCallback(
    () => getRelatedCars(category, excludeId),
    [category, excludeId]
  );
  const { data: cars, isLoading } = useFetch(fetcher);

  if (!isLoading && (!cars || cars.length === 0)) return null;

  return (
    <section className="max-w-7xl mx-auto px-8 sm:px-10 lg:px-12 py-20">
      <SectionHeading label="You May Also Like" title="Related Vehicles" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => <CarCardSkeleton key={i} />)
          : cars.map((car, index) => <CarCard key={car.id} car={car} index={index} />)}
      </div>
    </section>
  );
}

export default RelatedCars;
