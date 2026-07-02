import { motion } from "framer-motion";
import {
  HiOutlinePaperAirplane,
  HiOutlineUserGroup,
  HiOutlineCalendarDays,
  HiOutlineMapPin,
} from "react-icons/hi2";
import SectionHeading from "../common/SectionHeading";

const SERVICES = [
  {
    icon: HiOutlinePaperAirplane,
    title: "Airport Transfers",
    description:
      "Meet-and-greet service at every major terminal. Flight tracked, so we're there even when your plans change.",
  },
  {
    icon: HiOutlineUserGroup,
    title: "Chauffeur Service",
    description:
      "Professional, background-checked chauffeurs for when you'd rather arrive than drive.",
  },
  {
    icon: HiOutlineCalendarDays,
    title: "Long-Term Leasing",
    description:
      "Weekly and monthly rates for extended stays, relocations, or corporate accounts.",
  },
  {
    icon: HiOutlineMapPin,
    title: "Multi-City Pickup",
    description:
      "Reserve in one city, return in another. Available across all 18 of our coverage locations.",
  },
];

function PremiumServices() {
  return (
    <section className="max-w-7xl mx-auto px-8 sm:px-10 lg:px-12 py-24 sm:py-28">
      <SectionHeading
        label="Beyond The Rental"
        title="Premium Services"
        description="A rental is just the start. Our concierge-level services are built for people who don't have time to manage logistics."
      />

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        {SERVICES.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "0px 0px -40px 0px" }}
            transition={{ duration: 0.5, delay: (index % 2) * 0.1, ease: "easeOut" }}
            className="flex gap-5 p-7 rounded-2xl glass-panel hover:bg-base-850 transition-colors duration-300"
          >
            <span className="shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-gold-400/15 to-gold-600/15 flex items-center justify-center text-gold-400">
              <service.icon className="w-6 h-6" />
            </span>
            <div>
              <h3 className="font-display text-lg font-semibold text-ivory">
                {service.title}
              </h3>
              <p className="mt-2 text-sm text-mist leading-relaxed">
                {service.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default PremiumServices;
