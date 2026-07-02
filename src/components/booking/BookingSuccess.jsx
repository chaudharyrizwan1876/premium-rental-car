import { motion } from "framer-motion";
import { HiCheckCircle } from "react-icons/hi2";
import Button from "../common/Button";

function BookingSuccess({ bookingId, carName }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-col items-center justify-center text-center py-20 px-6 max-w-lg mx-auto"
    >
      <div className="w-20 h-20 rounded-full bg-gold-500/15 flex items-center justify-center mb-6">
        <HiCheckCircle className="w-10 h-10 text-gold-400" />
      </div>

      <h2 className="font-display text-3xl font-semibold text-ivory">
        Booking Confirmed!
      </h2>
      <p className="text-mist text-base mt-3 leading-relaxed">
        Your {carName} has been reserved. A confirmation has been sent to your email.
      </p>

      {bookingId && (
        <div className="mt-6 px-5 py-3 rounded-xl glass-panel">
          <p className="text-xs text-smoke uppercase tracking-wider">Booking Reference</p>
          <p className="font-display text-lg font-semibold text-gold-400 mt-1">
            #{bookingId}
          </p>
        </div>
      )}

      <div className="flex flex-wrap gap-4 justify-center mt-10">
        <Button to="/cars" variant="secondary" size="md">
          Browse More Cars
        </Button>
        <Button to="/" variant="primary" size="md">
          Back to Home
        </Button>
      </div>
    </motion.div>
  );
}

export default BookingSuccess;
