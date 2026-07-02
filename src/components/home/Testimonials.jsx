import { motion } from "framer-motion";
import { HiStar } from "react-icons/hi2";
import SectionHeading from "../common/SectionHeading";

const TESTIMONIALS = [
  {
    name: "Daniel Whitfield",
    role: "Corporate Client",
    rating: 5,
    quote:
      "Booked a Phantom for a client dinner with two hours' notice. The car arrived spotless, the chauffeur was sharp, and the whole thing felt effortless.",
  },
  {
    name: "Sara Bennett",
    role: "Bride",
    rating: 5,
    quote:
      "Our Rolls-Royce Ghost made the entire wedding day feel like a film. The team handled every detail, down to the ribbon color, without being asked twice.",
  },
  {
    name: "Marcus Lee",
    role: "Frequent Renter",
    rating: 5,
    quote:
      "I've rented from a few luxury services and this is the only one where the car matched the photos exactly. No surprises at pickup, ever.",
  },
];

function Testimonials() {
  return (
    <section className="bg-base-900 border-y border-gold-500/10">
      <div className="max-w-7xl mx-auto px-8 sm:px-10 lg:px-12 py-24 sm:py-28">
        <SectionHeading
          label="Client Stories"
          title="What Our Clients Say"
          description="Real experiences from people who trusted us with the moments that mattered."
          align="center"
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -40px 0px" }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              className="p-7 rounded-2xl border border-gold-500/10 bg-base-950 flex flex-col"
            >
              <div className="flex gap-1 text-gold-400">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <HiStar key={i} className="w-4 h-4" />
                ))}
              </div>
              <p className="mt-5 text-ivory/85 text-sm leading-relaxed flex-1">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3 mt-6 pt-6 border-t border-gold-500/10">
                <span className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-base-950 font-semibold text-sm">
                  {testimonial.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
                <div>
                  <p className="text-sm font-semibold text-ivory">{testimonial.name}</p>
                  <p className="text-xs text-smoke">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
