import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { HiOutlineLockClosed, HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";
import { BRAND } from "../../constants";
import { adminLogin } from "../../utils/adminAuth";

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "premium2024";

function AdminLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("admin-auth") === "true") {
      navigate("/admin", { replace: true });
    }
  }, [navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ username, password }) => {
    setIsLoading(true);
    // Simulate network delay for realism
    await new Promise((r) => setTimeout(r, 800));

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      adminLogin();
      toast.success("Welcome back, Admin!");
      navigate("/admin");
    } else {
      toast.error("Invalid credentials. Please try again.");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen pt-28 flex items-center justify-center px-6 relative overflow-hidden bg-base-950">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gold-500/[0.06] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <span className="font-display text-3xl tracking-[0.15em] uppercase text-gold-gradient font-semibold">
            {BRAND.name}
          </span>
          <p className="text-xs tracking-[0.3em] uppercase text-smoke mt-2">
            Admin Panel
          </p>
        </div>

        {/* Card */}
        <div className="glass-panel rounded-2xl p-8">
          <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gold-500/10 mx-auto mb-6">
            <HiOutlineLockClosed className="w-7 h-7 text-gold-400" />
          </div>

          <h1 className="font-display text-2xl font-semibold text-ivory text-center mb-1">
            Admin Login
          </h1>
          <p className="text-sm text-mist text-center mb-8">
            Enter your credentials to access the dashboard
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            {/* Username */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-mist mb-1.5">
                Username <span className="text-gold-400">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter username"
                autoComplete="username"
                className="w-full bg-base-900 border border-gold-500/15 rounded-xl px-4 py-3 text-sm text-ivory placeholder:text-smoke focus:outline-none focus:border-gold-400/50 transition-colors duration-200"
                {...register("username", { required: "Username is required" })}
              />
              {errors.username && (
                <p className="text-xs text-danger mt-1">{errors.username.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-mist mb-1.5">
                Password <span className="text-gold-400">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  autoComplete="current-password"
                  className="w-full bg-base-900 border border-gold-500/15 rounded-xl px-4 py-3 pr-12 text-sm text-ivory placeholder:text-smoke focus:outline-none focus:border-gold-400/50 transition-colors duration-200"
                  {...register("password", { required: "Password is required" })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-mist hover:text-ivory transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <HiOutlineEyeSlash className="w-4.5 h-4.5" />
                  ) : (
                    <HiOutlineEye className="w-4.5 h-4.5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-danger mt-1">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-400 to-gold-600 text-base-950 font-semibold uppercase tracking-wide py-3.5 text-sm hover:shadow-gold-glow transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-base-950/40 border-t-base-950 rounded-full animate-spin" />
                  Verifying...
                </>
              ) : (
                "Login to Dashboard"
              )}
            </button>
          </form>

          <p className="text-xs text-smoke text-center mt-6">
            Demo credentials: <span className="text-gold-400/80">admin / premium2024</span>
          </p>
        </div>

        <p className="text-center text-xs text-smoke mt-6">
          ← <a href="/" className="hover:text-gold-400 transition-colors">Back to main site</a>
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;
