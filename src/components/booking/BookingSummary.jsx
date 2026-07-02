import { Link } from "react-router-dom";
import {
  HiOutlineMapPin,
  HiOutlineCalendarDays,
  HiOutlineClock,
} from "react-icons/hi2";
import { formatPrice, formatDate, calculateDays } from "../../utils/formatters";
import { buildCarDetailsPath } from "../../routes/paths";

function BookingSummary({ car, pickupDate, returnDate }) {
  const days = calculateDays(pickupDate, returnDate);
  const total = car.price * (days || 1);

  return (
    <div className="glass-panel rounded-2xl p-6 space-y-6">
      {/* Car card */}
      <div className="flex gap-4">
        <div className="w-24 h-18 rounded-xl overflow-hidden bg-base-850 shrink-0">
          <img
            src={car.image}
            alt={car.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.opacity = "0";
            }}
          />
        </div>
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-wide text-mist">{car.brand}</p>
          <h3 className="font-display text-lg font-semibold text-ivory mt-0.5 leading-snug">
            {car.name}
          </h3>
          <p className="text-sm text-gold-400 font-medium mt-1">
            {formatPrice(car.price)} / day
          </p>
        </div>
      </div>

      <div className="border-t border-gold-500/10 pt-5 space-y-4">
        {pickupDate && (
          <div className="flex items-start gap-3">
            <HiOutlineMapPin className="w-4.5 h-4.5 text-gold-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-smoke uppercase tracking-wide">Pick-up</p>
              <p className="text-sm text-ivory mt-0.5">{formatDate(pickupDate)}</p>
            </div>
          </div>
        )}
        {returnDate && (
          <div className="flex items-start gap-3">
            <HiOutlineCalendarDays className="w-4.5 h-4.5 text-gold-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-smoke uppercase tracking-wide">Return</p>
              <p className="text-sm text-ivory mt-0.5">{formatDate(returnDate)}</p>
            </div>
          </div>
        )}
        {days > 0 && (
          <div className="flex items-start gap-3">
            <HiOutlineClock className="w-4.5 h-4.5 text-gold-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-smoke uppercase tracking-wide">Duration</p>
              <p className="text-sm text-ivory mt-0.5">
                {days} day{days !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Price breakdown */}
      <div className="border-t border-gold-500/10 pt-5 space-y-2.5">
        <div className="flex justify-between text-sm text-mist">
          <span>
            {formatPrice(car.price)} × {days || 1} day{(days || 1) !== 1 ? "s" : ""}
          </span>
          <span className="text-ivory">{formatPrice(total)}</span>
        </div>
        <div className="flex justify-between text-sm text-mist">
          <span>Service fee</span>
          <span className="text-ivory">{formatPrice(0)}</span>
        </div>
        <div className="flex justify-between items-center pt-3 border-t border-gold-500/10">
          <span className="font-semibold text-ivory">Total</span>
          <span className="font-display text-xl font-semibold text-gold-400">
            {formatPrice(total)}
          </span>
        </div>
      </div>

      <Link
        to={buildCarDetailsPath(car.id)}
        className="text-xs text-mist hover:text-gold-400 transition-colors duration-200 underline underline-offset-2"
      >
        Change vehicle
      </Link>
    </div>
  );
}

export default BookingSummary;
