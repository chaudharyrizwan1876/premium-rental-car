import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  HiOutlineSparkles,
  HiOutlineBolt,
  HiOutlineTruck,
  HiOutlineUserGroup,
} from "react-icons/hi2";
import { GiSteeringWheel, GiCarKey } from "react-icons/gi";
import { FaCarSide, FaRing, FaShuttleVan } from "react-icons/fa";
import SectionHeading from "../common/SectionHeading";
import { CATEGORIES } from "../../constants";

const ICON_MAP = {
  wedding: FaRing,
  luxury: HiOutlineSparkles,
  sports: GiSteeringWheel,
  suv: HiOutlineTruck,
  sedan: FaCarSide,
  economy: GiCarKey,
  ev: HiOutlineBolt,
  limo: HiOutlineUserGroup,
  van: FaShuttleVan,
};

function Categories() {
  return (
    <section className="bg-base-900 border-y border-gold-500/10">
      <div className="max-w-7xl mx-auto px-8 sm:px-10 lg:px-12 py-24 sm:py-28">
        <SectionHeading
          label="Browse by Type"
          title="Explore Our Categories"
          description="Whatever the occasion calls for, there's a category built for it."
          align="center"
        />

        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-4">
          {CATEGORIES.map((category, index) => {
            const Icon = ICON_MAP[category.icon] || HiOutlineSparkles;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -40px 0px" }}
                transition={{ duration: 0.4, delay: index * 0.04, ease: "easeOut" }}
              >
                <Link
                  to={`/cars?category=${encodeURIComponent(category.slug)}`}
                  className="group flex flex-col items-center gap-3 p-5 rounded-2xl border border-gold-500/10 bg-base-950 hover:border-gold-400/40 hover:bg-base-850 transition-colors duration-300 text-center h-full"
                >
                  <span className="w-12 h-12 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-400 group-hover:bg-gold-500/20 transition-colors duration-300">
                    <Icon className="w-5.5 h-5.5" />
                  </span>
                  <span className="text-xs font-medium text-ivory/85 leading-snug">
                    {category.label}
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Categories;
