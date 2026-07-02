import { useCallback } from "react";
import { motion } from "framer-motion";
import { HiOutlineHeart, HiOutlineTrash } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { useWishlist } from "../../hooks/useWishlist";
import { getAllCars } from "../../services/carService";
import CarCard from "../../components/cars/CarCard";
import CarCardSkeleton from "../../components/cars/CarCardSkeleton";
import Button from "../../components/common/Button";

function WishlistEmpty() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center text-center py-24 px-6"
    >
      <div className="w-20 h-20 rounded-full bg-gold-500/10 flex items-center justify-center mb-6">
        <HiOutlineHeart className="w-9 h-9 text-gold-400/60" />
      </div>
      <h2 className="font-display text-2xl font-semibold text-ivory">
        Your wishlist is empty
      </h2>
      <p className="text-mist text-sm mt-3 max-w-sm leading-relaxed">
        Browse our fleet and tap the heart icon on any car to save it here for
        later.
      </p>
      <Button to="/cars" variant="primary" size="md" className="mt-8">
        Explore Fleet
      </Button>
    </motion.div>
  );
}

function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();

  const fetcher = useCallback(() => getAllCars(), []);
  const { data: allCars, isLoading } = useFetch(fetcher);

  const wishedCars = (allCars || []).filter((car) =>
    wishlist.includes(car.id)
  );

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-8 sm:px-10 lg:px-12">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
          <div>
            <nav className="text-xs text-smoke mb-3 flex items-center gap-2">
              <Link to="/" className="hover:text-gold-400 transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-mist">Wishlist</span>
            </nav>
            <h1 className="font-display text-3xl sm:text-4xl font-semibold text-ivory">
              My Wishlist
            </h1>
            {!isLoading && (
              <p className="text-mist text-sm mt-2">
                {wishedCars.length === 0
                  ? "No saved vehicles"
                  : `${wishedCars.length} saved vehicle${wishedCars.length !== 1 ? "s" : ""}`}
              </p>
            )}
          </div>

          {wishedCars.length > 0 && (
            <button
              type="button"
              onClick={() => wishedCars.forEach((car) => removeFromWishlist(car.id))}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-gold-500/20 text-sm text-mist hover:text-danger hover:border-danger/40 transition-colors duration-200"
            >
              <HiOutlineTrash className="w-4 h-4" />
              Clear All
            </button>
          )}
        </div>

        {/* Content */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <CarCardSkeleton key={i} />
            ))}
          </div>
        )}

        {!isLoading && wishlist.length === 0 && <WishlistEmpty />}

        {!isLoading && wishlist.length > 0 && wishedCars.length === 0 && (
          <div className="text-center py-20 text-mist">
            <p>Loading your saved cars…</p>
          </div>
        )}

        {!isLoading && wishedCars.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {wishedCars.map((car, index) => (
              <CarCard key={car.id} car={car} index={index} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;
