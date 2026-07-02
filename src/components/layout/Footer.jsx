import { Link } from "react-router-dom";
import { HiOutlineLocationMarker, HiOutlinePhone, HiOutlineMail } from "react-icons/hi";
import { FaInstagram, FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { BRAND, NAV_LINKS, COMPANY_INFO } from "../../constants";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-base-900 border-t border-gold-500/10 pt-24 pb-10 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gold-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-8 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14 pb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="font-display text-2xl tracking-[0.15em] uppercase text-gold-gradient font-semibold">
              {BRAND.name}
            </Link>
            <p className="mt-4 text-sm text-mist leading-relaxed max-w-xs">
              Curated luxury vehicles for those who refuse to travel ordinarily. Every journey, elevated.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {[FaInstagram, FaFacebookF, FaTwitter, FaLinkedinIn].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="w-9 h-9 rounded-full border border-gold-500/20 flex items-center justify-center text-mist hover:text-gold-400 hover:border-gold-400/50 transition-colors duration-300"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-gold-400 font-semibold mb-5">
              Explore
            </h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-mist hover:text-ivory transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-gold-400 font-semibold mb-5">
              Categories
            </h4>
            <ul className="space-y-3">
              {["Luxury Cars", "Sports Cars", "SUVs", "Wedding Cars"].map((cat) => (
                <li key={cat}>
                  <Link
                    to="/cars"
                    className="text-sm text-mist hover:text-ivory transition-colors duration-300"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-gold-400 font-semibold mb-5">
              Get in Touch
            </h4>
            <ul className="space-y-4 text-sm text-mist">
              <li className="flex gap-3">
                <HiOutlineLocationMarker className="w-4.5 h-4.5 text-gold-500 shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.address}</span>
              </li>
              <li className="flex gap-3">
                <HiOutlinePhone className="w-4.5 h-4.5 text-gold-500 shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.phone}</span>
              </li>
              <li className="flex gap-3">
                <HiOutlineMail className="w-4.5 h-4.5 text-gold-500 shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.email}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gold-500/10 pt-7 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-smoke">
            © {year} {BRAND.fullName}. All rights reserved.
          </p>
          <p className="text-xs text-smoke">
            Crafted for those who arrive differently.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
