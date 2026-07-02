import { motion } from "framer-motion";
import {
  HiOutlineCheckBadge,
  HiOutlineGlobeAlt,
  HiOutlineHeart,
  HiOutlineStar,
} from "react-icons/hi2";
import Button from "../../components/common/Button";
import SectionHeading from "../../components/common/SectionHeading";

const STATS = [
  { value: "12+", label: "Years of Service" },
  { value: "240+", label: "Premium Vehicles" },
  { value: "18", label: "Cities Covered" },
  { value: "15k+", label: "Happy Clients" },
];

const VALUES = [
  {
    icon: HiOutlineCheckBadge,
    title: "Uncompromising Quality",
    description:
      "Every vehicle in our fleet is selected, inspected, and maintained to a standard that earns the word premium.",
  },
  {
    icon: HiOutlineHeart,
    title: "Client-First Culture",
    description:
      "From first enquiry to final return, every touchpoint is designed around making your experience frictionless.",
  },
  {
    icon: HiOutlineGlobeAlt,
    title: "Wide Reach",
    description:
      "18 coverage cities and growing — whether it's a corporate visit or a weekend escape, we're there.",
  },
  {
    icon: HiOutlineStar,
    title: "Trusted Reputation",
    description:
      "Over a decade of reviews, referrals, and repeat clients. Our reputation is built on the details others miss.",
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "0px 0px -40px 0px" },
  transition: { duration: 0.5, delay, ease: "easeOut" },
});

function About() {
  return (
    <div className="pt-28 pb-20 min-h-screen">
      {/* Hero banner */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-base-900 via-base-950 to-black" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gold-500/[0.05] rounded-full blur-[120px] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-8 sm:px-10 lg:px-12 text-center">
          <motion.div {...fadeUp()}>
            <p className="text-xs sm:text-sm tracking-[0.3em] uppercase text-gold-400 font-medium mb-4">
              Our Story
            </p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-ivory leading-tight max-w-3xl mx-auto">
              Automobiles &amp; Comfort
            </h1>
            <p className="mt-6 text-mist text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              At Premium Rental Car, we believe that every journey should be exceptional.
              We offer a wide range of luxury vehicles for any occasion, ensuring your
              travel is always in style.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-gold-500/10 bg-base-900">
        <div className="max-w-7xl mx-auto px-8 sm:px-10 lg:px-12 py-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <motion.div key={stat.label} {...fadeUp(i * 0.08)} className="text-center">
                <p className="font-display text-4xl sm:text-5xl font-semibold text-ivory">
                  {stat.value}
                </p>
                <p className="text-sm text-smoke mt-2 uppercase tracking-wide">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission + Vision */}
      <section className="max-w-7xl mx-auto px-8 sm:px-10 lg:px-12 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeUp()}>
            <SectionHeading label="Who We Are" title="Our Mission &amp; Vision" />
            <div className="mt-8 space-y-5 text-mist text-sm leading-relaxed">
              <p>
                Founded over a decade ago, Premium Rental Car started with a simple
                belief — that access to a truly exceptional vehicle should not be
                limited to ownership. We set out to build a fleet that rivals any
                private collection, backed by service that anticipates rather than reacts.
              </p>
              <p>
                Our vision is to become the most trusted name in premium mobility —
                not just in the cities we operate in today, but across every market
                where discerning travelers expect more than a car.
              </p>
              <p>
                ✔ Premium Quality Cars &nbsp;&nbsp;
                ✔ Affordable Prices &nbsp;&nbsp;
                ✔ 24/7 Customer Support &nbsp;&nbsp;
                ✔ Easy Booking Process
              </p>
            </div>
            <div className="mt-8">
              <Button to="/cars" variant="primary" size="md">
                Learn More About Us
              </Button>
            </div>
          </motion.div>

          <motion.div {...fadeUp(0.15)}>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-base-900 border border-gold-500/10">
              <img
                src="https://images.unsplash.com/photo-1619221496652-7ee3d7406203?auto=format&fit=crop&w=800&q=80"
                alt="Premium luxury car"
                className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.style.opacity = "0.3"; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-base-950/60 to-transparent" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-base-900 border-y border-gold-500/10">
        <div className="max-w-7xl mx-auto px-8 sm:px-10 lg:px-12 py-24">
          <SectionHeading
            label="What Drives Us"
            title="Our Core Values"
            align="center"
          />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((value, i) => (
              <motion.div
                key={value.title}
                {...fadeUp(i * 0.08)}
                className="p-7 rounded-2xl border border-gold-500/10 bg-base-950 hover:border-gold-400/30 transition-colors duration-300"
              >
                <span className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center text-gold-400">
                  <value.icon className="w-6 h-6" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-ivory">
                  {value.title}
                </h3>
                <p className="mt-2.5 text-sm text-mist leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-8 sm:px-10 lg:px-12 py-24 text-center">
        <motion.div {...fadeUp()}>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-ivory">
            Ready to Experience the Difference?
          </h2>
          <p className="mt-4 text-mist max-w-xl mx-auto">
            Browse our full fleet and reserve in minutes.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <Button to="/cars" variant="primary" size="lg">
              Explore Fleet
            </Button>
            <Button to="/contact" variant="secondary" size="lg">
              Get in Touch
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

export default About;
