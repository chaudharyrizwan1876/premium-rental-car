import { motion } from "framer-motion";
import Button from "../../components/common/Button";

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gold-500/[0.05] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative text-center max-w-lg">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Large 404 */}
          <p className="font-display text-[140px] sm:text-[180px] font-semibold leading-none text-gold-gradient select-none">
            404
          </p>

          <h1 className="font-display text-2xl sm:text-3xl font-semibold text-ivory -mt-4">
            Page Not Found
          </h1>
          <p className="mt-4 text-mist text-base leading-relaxed">
            Oops! The page you are looking for does not exist. It may have been moved,
            or the link might be incorrect.
          </p>

          {/* Car illustration hint */}
          <div className="my-8 flex items-center justify-center">
            <div className="h-px flex-1 bg-gold-500/10" />
            <p className="mx-4 text-xs uppercase tracking-[0.3em] text-smoke">
              Let&apos;s get you back on the road
            </p>
            <div className="h-px flex-1 bg-gold-500/10" />
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <Button to="/" variant="primary" size="lg">
              Back to Home
            </Button>
            <Button to="/cars" variant="secondary" size="lg">
              Browse Cars
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default NotFound;
