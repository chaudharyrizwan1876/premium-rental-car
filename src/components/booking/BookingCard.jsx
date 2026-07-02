import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { HiOutlineCalendar, HiHeart, HiOutlineHeart } from "react-icons/hi2";
import Button from "../common/Button";
import { formatPrice } from "../../utils/formatters";
import { calculateDays, calculateTotalPrice } from "../../utils/formatters";
import { buildBookingPath } from "../../routes/paths";
import { useWishlist } from "../../hooks/useWishlist";

function BookingCard({ car }) {
  const navigate = useNavigate();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const wishlisted = isWishlisted(car.id);
  const days = calculateDays(pickupDate, returnDate);
  const total = calculateTotalPrice(car.price, pickupDate, returnDate);

  const handleBookNow = () => {
    if (!pickupDate || !returnDate) {
      toast.error("Please select pick-up and return dates");
      return;
    }
    if (new Date(returnDate) <= new Date(pickupDate)) {
      toast.error("Return date must be after pick-up date");
      return;
    }
    navigate(buildBookingPath(car.id), {
      state: { pickupDate, returnDate },
    });
  };

  return (
    <div className="glass-panel rounded-2xl p-6 sticky top-28">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-mist uppercase tracking-wide">Starting at</p>
          <p className="font-display text-3xl font-semibold text-ivory mt-1">
            {formatPrice(car.price)}
            <span className="text-sm text-smoke font-normal"> / day</span>
          </p>
        </div>
        <button
          type="button"
          onClick={() => toggleWishlist(car.id)}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200 ${
            wishlisted ? "bg-gold-500 text-base-950" : "bg-base-900 text-ivory/70 hover:text-gold-400"
          }`}
        >
          {wishlisted ? <HiHeart className="w-5 h-5" /> : <HiOutlineHeart className="w-5 h-5" />}
        </button>
      </div>

      <div className="mt-6 space-y-4">
        <label className="block">
          <span className="text-[11px] uppercase tracking-wider text-mist flex items-center gap-1.5 mb-1.5">
            <HiOutlineCalendar className="w-3.5 h-3.5" />
            Pick-up Date
          </span>
          <input
            type="date"
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
            className="w-full bg-base-900 border border-gold-500/15 rounded-xl px-4 py-2.5 text-sm text-ivory focus:outline-none focus:border-gold-400/50 transition-colors duration-200 [color-scheme:dark]"
          />
        </label>

        <label className="block">
          <span className="text-[11px] uppercase tracking-wider text-mist flex items-center gap-1.5 mb-1.5">
            <HiOutlineCalendar className="w-3.5 h-3.5" />
            Return Date
          </span>
          <input
            type="date"
            value={returnDate}
            min={pickupDate || undefined}
            onChange={(e) => setReturnDate(e.target.value)}
            className="w-full bg-base-900 border border-gold-500/15 rounded-xl px-4 py-2.5 text-sm text-ivory focus:outline-none focus:border-gold-400/50 transition-colors duration-200 [color-scheme:dark]"
          />
        </label>
      </div>

      {days > 0 && pickupDate && returnDate && (
        <div className="mt-5 pt-5 border-t border-gold-500/10 space-y-2">
          <div className="flex justify-between text-sm text-mist">
            <span>
              {formatPrice(car.price)} × {days} day{days > 1 ? "s" : ""}
            </span>
            <span className="text-ivory">{formatPrice(total)}</span>
          </div>
          <div className="flex justify-between text-base font-semibold pt-2 border-t border-gold-500/10">
            <span className="text-ivory">Total</span>
            <span className="text-gold-400">{formatPrice(total)}</span>
          </div>
        </div>
      )}

      <Button onClick={handleBookNow} variant="primary" size="lg" className="w-full mt-6">
        Book Now
      </Button>

      <p className="text-xs text-smoke text-center mt-4">
        You won&apos;t be charged yet
      </p>
    </div>
  );
}

export default BookingCard;
