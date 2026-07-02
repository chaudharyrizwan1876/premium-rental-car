import { motion } from "framer-motion";
import { HiArrowRight } from "react-icons/hi";
import Button from "../common/Button";
import SearchBar from "./SearchBar";

const STATS = [
  { value: "240+", label: "Premium Vehicles" },
  { value: "18", label: "Cities Covered" },
  { value: "4.9", label: "Average Rating" },
];

function Hero() {
  return (
    <section className="relative">
      {/* Background + content */}
      <div className="relative min-h-[88vh] flex items-center overflow-hidden pt-32 pb-20 sm:pt-36">
        <div className="absolute inset-0 bg-gradient-to-br from-base-900 via-base-950 to-black">
          <img
            src="https://images.unsplash.com/photo-1671572123661-c462bd06253e?w=1920&q=80&fm=jpg&fit=crop&auto=format"
            alt=""
            className="w-full h-full object-cover opacity-90"
            fetchPriority="high"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-base-950 via-base-950/75 to-base-950/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-base-950 via-base-950/5 to-base-950/20" />
        </div>

        {/* Ambient gold glow, top right */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative w-full max-w-7xl mx-auto px-8 sm:px-10 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <p className="text-xs sm:text-sm tracking-[0.35em] uppercase text-gold-400 font-medium mb-5">
              The Art of Arrival
            </p>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold text-ivory leading-[1.05] max-w-3xl">
              Drive Luxury,
              <br />
              <span className="text-gold-gradient">Live The Experience</span>
            </h1>
            <p className="mt-6 text-mist text-base sm:text-lg max-w-xl leading-relaxed">
              Premium cars for every occasion. Reserve your next vehicle
              in minutes and travel the way you were always meant to.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Button to="/cars" variant="primary" size="lg" icon={HiArrowRight}>
                Explore Fleet
              </Button>
              <Button to="/wedding-cars" variant="secondary" size="lg">
                Wedding Collection
              </Button>
            </div>

            {/* Trust stats */}
            <div className="mt-11 flex flex-wrap items-center gap-x-8 gap-y-4">
              {STATS.map((stat, i) => (
                <div key={stat.label} className={i > 0 ? "border-l border-gold-500/15 pl-8" : ""}>
                  <p className="font-display text-2xl sm:text-3xl font-semibold text-ivory">
                    {stat.value}
                  </p>
                  <p className="text-xs text-smoke mt-1 uppercase tracking-wide">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Search bar — sits in normal flow, pulled up to overlap the hero's bottom edge */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
        className="relative z-10 max-w-7xl mx-auto px-8 sm:px-10 lg:px-12 -mt-10 sm:-mt-9"
      >
        <SearchBar />
      </motion.div>
    </section>
  );
}

export default Hero;
