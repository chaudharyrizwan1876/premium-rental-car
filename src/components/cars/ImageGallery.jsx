import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function ImageGallery({ images, alt }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const gallery = images && images.length > 0 ? images : [];

  return (
    <div>
      {/* Main image */}
      <div className="relative aspect-[4/3] sm:aspect-[16/10] rounded-2xl overflow-hidden bg-gradient-to-br from-base-800 to-base-900 border border-gold-500/10">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeIndex}
            src={gallery[activeIndex]}
            alt={alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src =
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23181a1f'/%3E%3Cpath d='M80 190 L140 130 L180 160 L240 100 L320 190 Z' fill='%232a2d36'/%3E%3Ccircle cx='130' cy='110' r='20' fill='%232a2d36'/%3E%3C/svg%3E";
            }}
          />
        </AnimatePresence>
      </div>

      {/* Thumbnails */}
      {gallery.length > 1 && (
        <div className="flex gap-3 mt-4">
          {gallery.map((img, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`View image ${index + 1}`}
              className={`relative w-20 h-16 sm:w-24 sm:h-18 rounded-lg overflow-hidden shrink-0 transition-all duration-200 ${
                activeIndex === index
                  ? "ring-2 ring-gold-400"
                  : "opacity-60 hover:opacity-90 ring-1 ring-gold-500/10"
              }`}
            >
              <img
                src={img}
                alt=""
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.opacity = "0.3";
                }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ImageGallery;
