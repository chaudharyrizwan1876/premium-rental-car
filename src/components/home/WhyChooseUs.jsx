import { motion } from "framer-motion";
import {
  HiOutlineShieldCheck,
  HiOutlineClock,
  HiOutlineSparkles,
  HiOutlineCurrencyDollar,
} from "react-icons/hi2";
import SectionHeading from "../common/SectionHeading";

const FEATURES = [
  {
    icon: HiOutlineShieldCheck,
    title: "Fully Insured Fleet",
    description:
      "Every vehicle is comprehensively insured and inspected before each rental, so you drive with complete peace of mind.",
  },
  {
    icon: HiOutlineClock,
    title: "24/7 Availability",
    description:
      "Round-the-clock booking, support, and roadside assistance. Your schedule never has to wait on ours.",
  },
  {
    icon: HiOutlineSparkles,
    title: "Pristine Condition",
    description:
      "Each car is detailed to showroom standard before every handover. No exceptions, no shortcuts.",
  },
  {
    icon: HiOutlineCurrencyDollar,
    title: "Transparent Pricing",
    description:
      "The price you see is the price you pay. No hidden fees, no last-minute surprises at pickup.",
  },
];

function WhyChooseUs() {
  return (
    <section className="bg-base-900 border-y border-gold-500/10">
      <div className="max-w-7xl mx-auto px-8 sm:px-10 lg:px-12 py-24 sm:py-28">
        <SectionHeading
          label="The Premium Standard"
          title="Why Choose Us"
          description="We built our service around the details that matter most when you're trusting someone else's vehicle with your plans."
          align="center"
        />

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -40px 0px" }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
              className="group p-7 rounded-2xl border border-gold-500/10 bg-base-950 hover:border-gold-400/30 transition-colors duration-300"
            >
              <span className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center text-gold-400 group-hover:bg-gold-500/20 group-hover:scale-105 transition-all duration-300">
                <feature.icon className="w-6 h-6" />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold text-ivory">
                {feature.title}
              </h3>
              <p className="mt-2.5 text-sm text-mist leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
