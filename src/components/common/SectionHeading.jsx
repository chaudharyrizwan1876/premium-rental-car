import { motion } from "framer-motion";
import { Link } from "react-router-dom";

/**
 * Consistent section header: small gold label, large display heading,
 * optional description, and an optional "View All" link aligned right
 * on larger screens.
 */
function SectionHeading({ label, title, description, ctaText, ctaTo, align = "left" }) {
  const isCentered = align === "center";

  return (
    <div
      className={`flex flex-col gap-5 ${
        isCentered ? "items-center text-center" : "sm:flex-row sm:items-end sm:justify-between"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -40px 0px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={isCentered ? "max-w-2xl" : "max-w-xl"}
      >
        {label && (
          <p className="text-xs sm:text-sm tracking-[0.3em] uppercase text-gold-400 font-medium mb-3">
            {label}
          </p>
        )}
        <h2 className="font-display text-3xl sm:text-4xl font-semibold text-ivory leading-tight">
          {title}
        </h2>
        {description && (
          <p className="mt-4 text-mist text-base leading-relaxed">{description}</p>
        )}
      </motion.div>

      {ctaText && ctaTo && !isCentered && (
        <Link
          to={ctaTo}
          className="text-sm font-semibold uppercase tracking-wide text-gold-400 hover:text-gold-300 transition-colors duration-300 shrink-0 inline-flex items-center gap-2"
        >
          {ctaText} <span aria-hidden="true">→</span>
        </Link>
      )}
    </div>
  );
}

export default SectionHeading;
