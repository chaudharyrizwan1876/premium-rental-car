import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { HiOutlineHeart, HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import { NAV_LINKS, BRAND } from "../../constants";
import { useTheme } from "../../hooks/useTheme";
import { useWishlist } from "../../hooks/useWishlist";
import {
  isAdminAuthenticated,
  adminLogout,
} from "../../utils/adminAuth";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { wishlist } = useWishlist();
  const { isDark, toggleTheme } = useTheme();

  const navigate = useNavigate();

  const [isAdmin, setIsAdmin] = useState(isAdminAuthenticated());

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const syncAuth = () => {
      setIsAdmin(isAdminAuthenticated());
    };

    syncAuth();

    window.addEventListener("admin-auth-changed", syncAuth);

    return () => {
      window.removeEventListener("admin-auth-changed", syncAuth);
    };
  }, []);

  const handleNavLinkClick = () => setIsMenuOpen(false);

  const handleLogout = () => {
    adminLogout();
    setIsAdmin(false);
    navigate("/");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
        ? "bg-base-950/85 backdrop-blur-xl border-b border-gold-500/10 py-3"
        : "bg-gradient-to-b from-base-950/70 to-transparent py-5"
        }`}
    >
      <nav className="max-w-7xl mx-auto px-8 sm:px-10 lg:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-baseline gap-2 group">
          <span className="font-display text-2xl tracking-[0.15em] uppercase text-gold-gradient font-semibold">
            {BRAND.name}
          </span>
          <span className="hidden sm:inline text-[11px] tracking-[0.3em] uppercase text-mist font-light">
            {BRAND.tagline}
          </span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden lg:flex items-center gap-9">
          {NAV_LINKS.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `relative py-2 text-[13px] tracking-[0.08em] uppercase font-medium transition-colors duration-300 ${isActive ? "text-gold-400" : "text-ivory/80 hover:text-gold-300"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right icons */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Theme toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="text-ivory/80 hover:text-gold-400 transition-colors duration-300"
          >
            {isDark ? (
              <HiOutlineSun className="w-[22px] h-[22px]" />
            ) : (
              <HiOutlineMoon className="w-[22px] h-[22px]" />
            )}
          </button>
          <Link
            to="/wishlist"
            className="relative text-ivory/80 hover:text-gold-400 transition-colors duration-300"
            aria-label="Wishlist"
          >
            <HiOutlineHeart className="w-[22px] h-[22px]" />
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-gold-500 text-base-950 text-[10px] font-bold rounded-full w-4.5 h-4.5 flex items-center justify-center leading-none">
                {wishlist.length}
              </span>
            )}
          </Link>

          {isAdmin ? (
            <>
              <Link
                to="/admin"
                className="text-sm uppercase tracking-wide text-gold-400 hover:text-gold-300 transition"
              >
                Dashboard
              </Link>

              <button
                onClick={handleLogout}
                className="text-sm uppercase tracking-wide text-red-400 hover:text-red-300 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/admin/login"
              className="px-4 py-2 rounded-full border border-gold-500 text-gold-400 text-[12px] font-semibold tracking-[0.08em] uppercase hover:bg-gold-500 hover:text-base-950 transition-all duration-300"
            >
              Admin Login
            </Link>
          )}
          <Link
            to="/cars"
            className="px-4 py-2 rounded-full bg-gradient-to-r from-gold-400 to-gold-600 text-base-950 text-[12px] font-semibold tracking-wide uppercase hover:shadow-gold-glow transition-shadow duration-300"
          >
            Book Now
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="lg:hidden text-ivory text-2xl"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <HiOutlineX /> : <HiOutlineMenu />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden bg-base-950/98 backdrop-blur-xl border-t border-gold-500/10 mt-4"
          >
            <ul className="flex flex-col px-8 py-7 gap-5">
              {NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    onClick={handleNavLinkClick}
                    className={({ isActive }) =>
                      `block text-base tracking-wide ${isActive ? "text-gold-400" : "text-ivory/85"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="flex items-center gap-2 text-ivory/85"
                >
                  {isDark ? (
                    <HiOutlineSun className="w-5 h-5" />
                  ) : (
                    <HiOutlineMoon className="w-5 h-5" />
                  )}
                  {isDark ? "Light Mode" : "Dark Mode"}
                </button>
              </li>
              <li>
                <Link to="/wishlist" onClick={handleNavLinkClick} className="flex items-center gap-2 text-ivory/85">
                  <HiOutlineHeart className="w-5 h-5" /> Wishlist ({wishlist.length})
                </Link>
              </li>

              {isAdmin ? (
                <>
                  <li>
                    <Link
                      to="/admin"
                      onClick={handleNavLinkClick}
                      className="block text-base tracking-wide text-gold-400"
                    >
                      Dashboard
                    </Link>
                  </li>

                  <li>
                    <button
                      onClick={() => {
                        handleLogout();
                        handleNavLinkClick();
                      }}
                      className="block text-base tracking-wide text-red-400"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link
                    to="/admin/login"
                    onClick={handleNavLinkClick}
                    className="block text-base tracking-wide text-gold-400"
                  >
                    Admin Login
                  </Link>
                </li>
              )}

              <li>
                <Link
                  to="/cars"
                  onClick={handleNavLinkClick}
                  className="inline-block w-full text-center px-5 py-3 rounded-full bg-gradient-to-r from-gold-400 to-gold-600 text-base-950 font-semibold uppercase tracking-wide text-sm"
                >
                  Book Now
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
