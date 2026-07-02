import { useCallback, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { HiArrowLeft } from "react-icons/hi2";
import { useFetch } from "../../hooks/useFetch";
import { getCarById } from "../../services/carService";
import { createBooking } from "../../services/bookingService";
import BookingSummary from "../../components/booking/BookingSummary";
import BookingForm from "../../components/booking/BookingForm";
import BookingSuccess from "../../components/booking/BookingSuccess";
import Button from "../../components/common/Button";

function BookingPageSkeleton() {
  return (
    <div className="pt-28 pb-20 min-h-screen animate-pulse">
      <div className="max-w-7xl mx-auto px-8 sm:px-10 lg:px-12">
        <div className="h-4 w-32 bg-base-800 rounded mb-10" />
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10">
          <div className="space-y-5">
            <div className="h-8 w-48 bg-base-800 rounded" />
            <div className="h-48 bg-base-800 rounded-2xl" />
            <div className="h-48 bg-base-800 rounded-2xl" />
          </div>
          <div className="h-80 bg-base-800 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}

function Booking() {
  const { id } = useParams();
  const { state } = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingResult, setBookingResult] = useState(null);

  const fetcher = useCallback(() => getCarById(id), [id]);
  const { data: car, isLoading, error } = useFetch(fetcher);

  if (isLoading) return <BookingPageSkeleton />;

  if (error || !car) {
    return (
      <div className="pt-28 pb-20 min-h-[70vh] flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-ivory font-medium">Vehicle not found</p>
          <Button to="/cars" variant="secondary" size="md" className="mt-6">
            Back to Cars
          </Button>
        </div>
      </div>
    );
  }

  if (bookingResult) {
    return (
      <div className="pt-28 pb-20 min-h-screen">
        <BookingSuccess
          bookingId={bookingResult.id}
          carName={`${car.brand} ${car.name}`}
        />
      </div>
    );
  }

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      const booking = await createBooking({
        carId: car.id,
        carName: `${car.brand} ${car.name}`,
        carImage: car.image,
        pricePerDay: car.price,
        ...formData,
      });
      toast.success("Booking confirmed! Check your email for details.");
      setBookingResult(booking);
    } catch (err) {
      toast.error(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-8 sm:px-10 lg:px-12">
        {/* Back link */}
        <Link
          to={`/cars/${id}`}
          className="inline-flex items-center gap-2 text-sm text-mist hover:text-gold-400 transition-colors duration-200 mb-8"
        >
          <HiArrowLeft className="w-4 h-4" />
          Back to Car Details
        </Link>

        {/* Page header */}
        <div className="mb-10">
          <p className="text-xs sm:text-sm tracking-[0.3em] uppercase text-gold-400 font-medium mb-2">
            Final Step
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-ivory">
            Book Your Car
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 items-start">
          {/* Form — left column */}
          <BookingForm
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            defaultDates={{
              pickupDate: state?.pickupDate || "",
              returnDate: state?.returnDate || "",
            }}
          />

          {/* Summary — right column sticky */}
          <div className="lg:sticky lg:top-28">
            <BookingSummary
              car={car}
              pickupDate={state?.pickupDate || ""}
              returnDate={state?.returnDate || ""}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Booking;
