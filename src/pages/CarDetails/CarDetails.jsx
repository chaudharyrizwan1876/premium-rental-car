import { useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HiArrowLeft, HiStar, HiOutlineScale } from "react-icons/hi2";
import { useFetch } from "../../hooks/useFetch";
import { getCarById } from "../../services/carService";
import { useCompare } from "../../hooks/useCompare";
import ImageGallery from "../../components/cars/ImageGallery";
import SpecsGrid from "../../components/cars/SpecsGrid";
import FeaturesList from "../../components/cars/FeaturesList";
import RelatedCars from "../../components/cars/RelatedCars";
import BookingCard from "../../components/booking/BookingCard";
import Button from "../../components/common/Button";

function CarDetailsSkeleton() {
  return (
    <div className="pt-28 pb-20 min-h-screen animate-pulse">
      <div className="max-w-7xl mx-auto px-8 sm:px-10 lg:px-12">
        <div className="h-4 w-32 bg-base-800 rounded mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10">
          <div>
            <div className="aspect-[16/10] rounded-2xl bg-base-800" />
            <div className="h-8 w-2/3 bg-base-800 rounded mt-8" />
            <div className="h-4 w-full bg-base-800 rounded mt-4" />
          </div>
          <div className="h-80 rounded-2xl bg-base-800" />
        </div>
      </div>
    </div>
  );
}

function CarDetails() {
  const { id } = useParams();
  const { isComparing, toggleCompare } = useCompare();

  const fetcher = useCallback(() => getCarById(id), [id]);
  const { data: car, isLoading, error } = useFetch(fetcher);

  if (isLoading) return <CarDetailsSkeleton />;

  if (error || !car) {
    return (
      <div className="pt-28 pb-20 min-h-[70vh] flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <p className="text-ivory font-medium text-lg">Vehicle not found</p>
          <p className="text-mist text-sm mt-2">
            This car may have been removed from the fleet, or the link is incorrect.
          </p>
          <Button to="/cars" variant="secondary" size="md" className="mt-6">
            Back to Cars
          </Button>
        </div>
      </div>
    );
  }

  const comparing = isComparing(car.id);

  return (
    <div className="pt-28 pb-10 min-h-screen">
      <div className="max-w-7xl mx-auto px-8 sm:px-10 lg:px-12">
        {/* Breadcrumb */}
        <Link
          to="/cars"
          className="inline-flex items-center gap-2 text-sm text-mist hover:text-gold-400 transition-colors duration-200 mb-8"
        >
          <HiArrowLeft className="w-4 h-4" />
          Back to Cars
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10">
          {/* Left column */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ImageGallery images={car.gallery} alt={`${car.brand} ${car.name}`} />
            </motion.div>

            {/* Title + meta */}
            <div className="mt-8 flex items-start justify-between gap-4 flex-wrap">
              <div>
                <p className="text-xs uppercase tracking-wider text-gold-400 font-medium mb-2">
                  {car.brand} · {car.category}
                </p>
                <h1 className="font-display text-3xl sm:text-4xl font-semibold text-ivory">
                  {car.name}
                </h1>
                <div className="flex items-center gap-2 mt-3">
                  <div className="flex items-center gap-1 text-gold-400">
                    <HiStar className="w-4 h-4" />
                    <span className="text-sm font-semibold text-ivory">{car.rating}</span>
                  </div>
                  <span className="text-sm text-smoke">
                    ({car.reviews} review{car.reviews === 1 ? "" : "s"})
                  </span>
                  {car.available && (
                    <span className="ml-1 px-2.5 py-0.5 rounded-full bg-success/10 text-success text-xs font-medium">
                      Available
                    </span>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={() => toggleCompare(car.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-sm font-medium transition-colors duration-200 ${
                  comparing
                    ? "bg-gold-500 border-gold-500 text-base-950"
                    : "border-gold-500/30 text-ivory/80 hover:border-gold-400/60"
                }`}
              >
                <HiOutlineScale className="w-4 h-4" />
                {comparing ? "Added to Compare" : "Add to Compare"}
              </button>
            </div>

            {/* Description */}
            <div className="mt-8">
              <h2 className="font-display text-lg font-semibold text-ivory mb-3">
                About This Car
              </h2>
              <p className="text-mist text-sm leading-relaxed">{car.description}</p>
            </div>

            {/* Specs */}
            <div className="mt-10">
              <h2 className="font-display text-lg font-semibold text-ivory mb-4">
                Specifications
              </h2>
              <SpecsGrid car={car} />
            </div>

            {/* Features */}
            <div className="mt-10">
              <h2 className="font-display text-lg font-semibold text-ivory mb-4">
                Features
              </h2>
              <FeaturesList features={car.features} />
            </div>
          </div>

          {/* Right column - booking card */}
          <div>
            <BookingCard car={car} />
          </div>
        </div>
      </div>

      <RelatedCars category={car.category} excludeId={car.id} />
    </div>
  );
}

export default CarDetails;
