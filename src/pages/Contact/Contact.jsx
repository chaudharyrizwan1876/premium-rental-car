import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import {
  HiOutlineMapPin,
  HiOutlinePhone,
  HiOutlineEnvelope,
  HiOutlineClock,
} from "react-icons/hi2";
import SectionHeading from "../../components/common/SectionHeading";
import { COMPANY_INFO } from "../../constants";

const INPUT_CLASS =
  "w-full bg-base-900 border border-gold-500/15 rounded-xl px-4 py-3 text-sm text-ivory placeholder:text-smoke focus:outline-none focus:border-gold-400/50 transition-colors duration-200";

const CONTACT_CARDS = [
  {
    icon: HiOutlineMapPin,
    label: "Address",
    value: COMPANY_INFO.address,
  },
  {
    icon: HiOutlinePhone,
    label: "Phone",
    value: COMPANY_INFO.phone,
  },
  {
    icon: HiOutlineEnvelope,
    label: "Email",
    value: COMPANY_INFO.email,
  },
  {
    icon: HiOutlineClock,
    label: "Working Hours",
    value: COMPANY_INFO.hours,
  },
];

function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    console.log("Contact form data:", data);
    toast.success("Message sent! We'll get back to you within 24 hours.");
    reset();
    setIsSubmitting(false);
  };

  return (
    <div className="pt-28 pb-20 min-h-screen">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-8 sm:px-10 lg:px-12 py-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs sm:text-sm tracking-[0.3em] uppercase text-gold-400 font-medium mb-3">
            Get in Touch
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-ivory">
            Contact Us
          </h1>
          <p className="mt-4 text-mist max-w-xl mx-auto text-base leading-relaxed">
            Have a question, need a custom quote, or just want to talk cars?
            Our team is here for you around the clock.
          </p>
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto px-8 sm:px-10 lg:px-12 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
          {/* Left — company info + map */}
          <div className="space-y-10">
            <div>
              <SectionHeading label="Find Us" title="Our Information" />
              <div className="mt-8 space-y-4">
                {CONTACT_CARDS.map((card, i) => (
                  <motion.div
                    key={card.label}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "0px 0px -40px 0px" }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                    className="flex items-start gap-4 p-5 rounded-2xl border border-gold-500/10 bg-base-900"
                  >
                    <span className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center text-gold-400 shrink-0">
                      <card.icon className="w-5 h-5" />
                    </span>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-smoke">
                        {card.label}
                      </p>
                      <p className="text-sm text-ivory mt-1">{card.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden border border-gold-500/10 h-64">
              <iframe
                title="Our Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.0!2d-73.987!3d40.748!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ0JzUyLjgiTiA3M8KwNTknMTMuMiJX!5e0!3m2!1sen!2sus!4v1610000000000"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Right — contact form */}
          <div>
            <SectionHeading label="Write to Us" title="Send Us a Message" />
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-8 space-y-5"
              noValidate
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-mist mb-1.5">
                    Full Name <span className="text-gold-400">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className={INPUT_CLASS}
                    {...register("fullName", { required: "Name is required" })}
                  />
                  {errors.fullName && (
                    <p className="text-xs text-danger mt-1">{errors.fullName.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-mist mb-1.5">
                    Email Address <span className="text-gold-400">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className={INPUT_CLASS}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Enter a valid email",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-xs text-danger mt-1">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-mist mb-1.5">
                  Subject <span className="text-gold-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="How can we help?"
                  className={INPUT_CLASS}
                  {...register("subject", { required: "Subject is required" })}
                />
                {errors.subject && (
                  <p className="text-xs text-danger mt-1">{errors.subject.message}</p>
                )}
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-mist mb-1.5">
                  Message <span className="text-gold-400">*</span>
                </label>
                <textarea
                  rows={6}
                  placeholder="Write your message here..."
                  className={`${INPUT_CLASS} resize-none`}
                  {...register("message", {
                    required: "Message is required",
                    minLength: { value: 10, message: "Message too short (min 10 chars)" },
                  })}
                />
                {errors.message && (
                  <p className="text-xs text-danger mt-1">{errors.message.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-400 to-gold-600 text-base-950 font-semibold uppercase tracking-wide py-4 text-sm hover:shadow-gold-glow transition-shadow duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-base-950/40 border-t-base-950 rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
