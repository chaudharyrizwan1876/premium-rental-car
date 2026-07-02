import { motion } from "framer-motion";

const BRANDS = [
  "Rolls-Royce",
  "Bentley",
  "Mercedes-Benz",
  "BMW",
  "Audi",
  "Porsche",
  "Lamborghini",
  "Tesla",
];

function LuxuryBrands() {
  return (
    <section className="border-y border-gold-500/10 bg-base-900">
      <div className="max-w-7xl mx-auto px-8 sm:px-10 lg:px-12 py-12">
        <p className="text-center text-xs tracking-[0.3em] uppercase text-smoke mb-8">
          Featuring Vehicles From The World&apos;s Finest Marques
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {BRANDS.map((brand, index) => (
            <motion.span
              key={brand}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "0px 0px -40px 0px" }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="font-display text-lg sm:text-xl text-ivory/40 hover:text-gold-400 transition-colors duration-300 tracking-wide cursor-default"
            >
              {brand}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default LuxuryBrands;
