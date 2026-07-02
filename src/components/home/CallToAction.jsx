import { motion } from "framer-motion";
import { HiArrowRight, HiOutlinePhone } from "react-icons/hi2";
import Button from "../common/Button";
import { COMPANY_INFO } from "../../constants";

function CallToAction() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-28">
      {/* Gradient backdrop */}
      <div className="absolute inset-0 bg-gradient-to-br from-base-900 via-base-950 to-black" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gold-500/[0.06] rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-8 sm:px-10 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -40px 0px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="text-xs sm:text-sm tracking-[0.3em] uppercase text-gold-400 font-medium mb-5">
            Ready When You Are
          </p>
          <h2 className="font-display text-3xl sm:text-5xl font-semibold text-ivory leading-tight">
            Your Next Drive Starts <span className="text-gold-gradient">Here</span>
          </h2>
          <p className="mt-6 text-mist text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Browse the full fleet and reserve in minutes, or call our concierge
            team for a tailored recommendation.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Button to="/cars" variant="primary" size="lg" icon={HiArrowRight}>
              Explore Fleet
            </Button>
            <Button
              href={`tel:${COMPANY_INFO.phone.replace(/[^+\d]/g, "")}`}
              variant="secondary"
              size="lg"
              icon={HiOutlinePhone}
              iconPosition="left"
            >
              {COMPANY_INFO.phone}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default CallToAction;
