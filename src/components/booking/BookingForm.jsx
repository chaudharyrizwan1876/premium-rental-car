import { useForm } from "react-hook-form";

const INPUT_CLASS =
  "w-full bg-base-900 border border-gold-500/15 rounded-xl px-4 py-3 text-sm text-ivory placeholder:text-smoke focus:outline-none focus:border-gold-400/50 transition-colors duration-200 disabled:opacity-50";

const ERROR_CLASS = "text-xs text-danger mt-1";

function FormField({ label, error, children, required }) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-wider text-mist mb-1.5">
        {label}
        {required && <span className="text-gold-400 ml-0.5">*</span>}
      </label>
      {children}
      {error && <p className={ERROR_CLASS}>{error}</p>}
    </div>
  );
}

function BookingForm({ onSubmit, isSubmitting, defaultDates }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      pickupDate: defaultDates?.pickupDate || "",
      returnDate: defaultDates?.returnDate || "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>
      {/* Personal Information */}
      <section>
        <h2 className="font-display text-xl font-semibold text-ivory mb-5">
          Personal Information
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Full Name" required error={errors.fullName?.message}>
            <input
              type="text"
              placeholder="Enter your full name"
              className={INPUT_CLASS}
              {...register("fullName", {
                required: "Full name is required",
                minLength: { value: 2, message: "Name must be at least 2 characters" },
              })}
            />
          </FormField>

          <FormField label="Email Address" required error={errors.email?.message}>
            <input
              type="email"
              placeholder="Enter your email"
              className={INPUT_CLASS}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              })}
            />
          </FormField>

          <FormField label="Phone Number" required error={errors.phone?.message}>
            <input
              type="tel"
              placeholder="Enter your phone number"
              className={INPUT_CLASS}
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^\+?[\d\s\-().]{7,}$/,
                  message: "Enter a valid phone number",
                },
              })}
            />
          </FormField>
        </div>
      </section>

      {/* Rental Dates */}
      <section>
        <h2 className="font-display text-xl font-semibold text-ivory mb-5">
          Rental Dates
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Pick-up Date" required error={errors.pickupDate?.message}>
            <input
              type="date"
              className={`${INPUT_CLASS} [color-scheme:dark]`}
              {...register("pickupDate", { required: "Pick-up date is required" })}
            />
          </FormField>

          <FormField label="Return Date" required error={errors.returnDate?.message}>
            <input
              type="date"
              className={`${INPUT_CLASS} [color-scheme:dark]`}
              {...register("returnDate", { required: "Return date is required" })}
            />
          </FormField>

          <FormField label="Pick-up Location" required error={errors.pickupLocation?.message}>
            <select
              className={`${INPUT_CLASS} cursor-pointer [&>option]:bg-base-850`}
              {...register("pickupLocation", { required: "Pick-up location is required" })}
            >
              <option value="">Select location</option>
              {["New York, NY", "Los Angeles, CA", "Miami, FL", "Las Vegas, NV", "Chicago, IL"].map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </FormField>

          <FormField label="Return Location" required error={errors.returnLocation?.message}>
            <select
              className={`${INPUT_CLASS} cursor-pointer [&>option]:bg-base-850`}
              {...register("returnLocation", { required: "Return location is required" })}
            >
              <option value="">Select location</option>
              {["New York, NY", "Los Angeles, CA", "Miami, FL", "Las Vegas, NV", "Chicago, IL"].map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </FormField>
        </div>
      </section>

      {/* Additional Information */}
      <section>
        <h2 className="font-display text-xl font-semibold text-ivory mb-5">
          Additional Information
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Driver License Number" required error={errors.licenseNumber?.message}>
            <input
              type="text"
              placeholder="Enter license number"
              className={INPUT_CLASS}
              {...register("licenseNumber", {
                required: "Driver license number is required",
                minLength: { value: 5, message: "Enter a valid license number" },
              })}
            />
          </FormField>

          <FormField label="Special Requests (Optional)" error={errors.specialRequests?.message}>
            <textarea
              placeholder="Any special requirements..."
              rows={3}
              className={`${INPUT_CLASS} resize-none`}
              {...register("specialRequests")}
            />
          </FormField>
        </div>
      </section>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-400 to-gold-600 text-base-950 font-semibold uppercase tracking-wide py-4 text-base hover:shadow-gold-glow transition-shadow duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <span className="w-4 h-4 border-2 border-base-950/40 border-t-base-950 rounded-full animate-spin" />
            Processing...
          </>
        ) : (
          "Confirm Booking"
        )}
      </button>

      <p className="text-xs text-smoke text-center">
        By confirming, you agree to our Terms of Service and Cancellation Policy.
      </p>
    </form>
  );
}

export default BookingForm;
