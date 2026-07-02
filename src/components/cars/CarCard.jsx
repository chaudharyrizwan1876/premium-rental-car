import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HiHeart, HiOutlineHeart, HiOutlineScale, HiStar } from "react-icons/hi";
import { HiOutlineUserGroup, HiOutlineCog } from "react-icons/hi";
import { formatPrice } from "../../utils/formatters";
import { buildCarDetailsPath } from "../../routes/paths";
import { useWishlist } from "../../hooks/useWishlist";
import { useCompare } from "../../hooks/useCompare";

/**
 * Used in Featured Cars, the Cars grid, Wishlist, and Compare picker.
 * Self-contained: reads/writes wishlist + compare state via context hooks,
 * so parent components never need to wire up that logic themselves.
 */
function CarCard({ car, index = 0 }) {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { isComparing, toggleCompare } = useCompare();

  const wishlisted = isWishlisted(car.id);
  const comparing = isComparing(car.id);

  const handleWishlistClick = (e) => {
    e.preventDefault();
    toggleWishlist(car.id);
  };

  const handleCompareClick = (e) => {
    e.preventDefault();
    toggleCompare(car.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -40px 0px" }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: "easeOut" }}
      className="group relative rounded-2xl bg-base-900 border border-gold-500/10 overflow-hidden hover:border-gold-500/30 transition-colors duration-300"
    >
      <Link to={buildCarDetailsPath(car.id)} className="block">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-base-800 to-base-900">
          <img
            src={car.image}
            alt={`${car.brand} ${car.name}`}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src =
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23181a1f'/%3E%3Cpath d='M80 190 L140 130 L180 160 L240 100 L320 190 Z' fill='%232a2d36'/%3E%3Ccircle cx='130' cy='110' r='20' fill='%232a2d36'/%3E%3C/svg%3E";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-base-950/70 via-transparent to-transparent" />

          {/* Category badge */}
          <span className="absolute top-3 left-3 px-3 py-1 rounded-full glass-panel text-[10px] uppercase tracking-wider text-gold-300 font-semibold">
            {car.category}
          </span>

          {/* Wishlist + Compare actions */}
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            <button
              type="button"
              onClick={handleWishlistClick}
              aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
              className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-colors duration-300 ${
                wishlisted
                  ? "bg-gold-500 text-base-950"
                  : "bg-base-950/50 text-ivory hover:bg-base-950/80"
              }`}
            >
              {wishlisted ? (
                <HiHeart className="w-4 h-4" />
              ) : (
                <HiOutlineHeart className="w-4 h-4" />
              )}
            </button>
            <button
              type="button"
              onClick={handleCompareClick}
              aria-label={comparing ? "Remove from compare" : "Add to compare"}
              className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-colors duration-300 ${
                comparing
                  ? "bg-gold-500 text-base-950"
                  : "bg-base-950/50 text-ivory hover:bg-base-950/80"
              }`}
            >
              <HiOutlineScale className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] uppercase tracking-wider text-mist">{car.brand}</p>
              <h3 className="font-display text-lg font-semibold text-ivory mt-0.5 group-hover:text-gold-300 transition-colors duration-300">
                {car.name}
              </h3>
            </div>
            <div className="flex items-center gap-1 text-gold-400 shrink-0 pt-1">
              <HiStar className="w-3.5 h-3.5" />
              <span className="text-xs font-semibold text-ivory">{car.rating}</span>
            </div>
          </div>

          {/* Quick specs */}
          <div className="flex items-center gap-4 mt-4 text-xs text-mist">
            <span className="flex items-center gap-1.5">
              <HiOutlineUserGroup className="w-4 h-4" />
              {car.seats} Seats
            </span>
            <span className="flex items-center gap-1.5">
              <HiOutlineCog className="w-4 h-4" />
              {car.transmission}
            </span>
          </div>

          {/* Price + CTA */}
          <div className="flex items-center justify-between mt-5 pt-4 border-t border-gold-500/10">
            <p>
              <span className="font-display text-xl font-semibold text-ivory">
                {formatPrice(car.price)}
              </span>
              <span className="text-xs text-smoke"> / day</span>
            </p>
            <span className="text-xs font-semibold uppercase tracking-wide text-gold-400 group-hover:translate-x-1 transition-transform duration-300 inline-block">
              View Details →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default CarCard;
