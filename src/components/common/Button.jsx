import { Link } from "react-router-dom";

const VARIANT_STYLES = {
  primary:
    "bg-gradient-to-r from-gold-400 to-gold-600 text-base-950 hover:shadow-gold-glow",
  secondary:
    "border border-gold-500/40 text-ivory hover:bg-gold-500/10 hover:border-gold-400",
  ghost: "text-ivory/80 hover:text-gold-400",
};

const SIZE_STYLES = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

/**
 * Renders as a <Link> when `to` is provided, otherwise as a <button>.
 * Keeps a single consistent set of styles for every CTA in the app.
 */
function Button({
  children,
  to,
  href,
  variant = "primary",
  size = "md",
  icon: Icon,
  iconPosition = "right",
  className = "",
  ...rest
}) {
  const baseStyles = `inline-flex items-center justify-center gap-2 rounded-full font-semibold uppercase tracking-wide transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${VARIANT_STYLES[variant]} ${SIZE_STYLES[size]} ${className}`;

  const content = (
    <>
      {Icon && iconPosition === "left" && <Icon className="w-4 h-4" />}
      {children}
      {Icon && iconPosition === "right" && <Icon className="w-4 h-4" />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={baseStyles} {...rest}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={baseStyles} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <button className={baseStyles} {...rest}>
      {content}
    </button>
  );
}

export default Button;
