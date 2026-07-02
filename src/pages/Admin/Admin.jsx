import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  HiOutlineSquares2X2,
  HiOutlineTruck,
  HiOutlineClipboardDocument,
  HiOutlinePlus,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineXMark,
  HiOutlineArrowRightOnRectangle,
  HiStar,
} from "react-icons/hi2";
import { useFetch } from "../../hooks/useFetch";
import { getAllCars } from "../../services/carService";
import { getAllBookings } from "../../services/bookingService";
import apiClient from "../../services/apiClient";
import { formatPrice, formatDate } from "../../utils/formatters";
import { CATEGORIES } from "../../constants";
import { adminLogout } from "../../utils/adminAuth";

const INPUT_CLASS =
  "w-full bg-base-950 border border-gold-500/15 rounded-xl px-4 py-3 text-sm text-ivory placeholder:text-smoke focus:outline-none focus:border-gold-400/50 transition-colors";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: HiOutlineSquares2X2 },
  { id: "cars", label: "Cars", icon: HiOutlineTruck },
  { id: "bookings", label: "Bookings", icon: HiOutlineClipboardDocument },
];

/* ─── Car Form Modal ─── */
function CarFormModal({ car, onClose, onSaved }) {
  const isEdit = Boolean(car);
  const [saving, setSaving] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: car || {
      name: "", brand: "", category: "Luxury Cars",
      price: "", year: new Date().getFullYear(),
      seats: 4, transmission: "Automatic", fuelType: "Petrol",
      engine: "", topSpeed: "", mileage: "",
      description: "", rating: 4.5, reviews: 0,
      featured: false, available: true,
      image: "https://picsum.photos/seed/new/800/600",
      gallery: [],
    },
  });

  const onSubmit = async (data) => {
    setSaving(true);
    try {
      const payload = {
        ...data,
        price: Number(data.price),
        year: Number(data.year),
        seats: Number(data.seats),
        rating: Number(data.rating),
        reviews: Number(data.reviews),
        featured: Boolean(data.featured),
        available: Boolean(data.available),
        gallery: data.gallery || [data.image],
        features: data.features
          ? String(data.features).split(",").map((f) => f.trim()).filter(Boolean)
          : (car?.features || []),
      };
      if (isEdit) {
        await apiClient.put(`/cars/${car.id}`, payload);
        toast.success("Car updated successfully");
      } else {
        await apiClient.post("/cars", payload);
        toast.success("Car added successfully");
      }
      onSaved();
    } catch {
      toast.error("Failed to save car");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-base-900 border border-gold-500/15 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto z-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-xl font-semibold text-ivory">
            {isEdit ? "Edit Car" : "Add New Car"}
          </h2>
          <button type="button" onClick={onClose} className="text-mist hover:text-ivory">
            <HiOutlineXMark className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-smoke uppercase tracking-wide mb-1 block">Brand *</label>
              <input className={INPUT_CLASS} placeholder="Rolls-Royce"
                {...register("brand", { required: true })} />
              {errors.brand && <p className="text-xs text-danger mt-1">Required</p>}
            </div>
            <div>
              <label className="text-xs text-smoke uppercase tracking-wide mb-1 block">Name *</label>
              <input className={INPUT_CLASS} placeholder="Phantom Series II"
                {...register("name", { required: true })} />
              {errors.name && <p className="text-xs text-danger mt-1">Required</p>}
            </div>
            <div>
              <label className="text-xs text-smoke uppercase tracking-wide mb-1 block">Category *</label>
              <select className={`${INPUT_CLASS} cursor-pointer [&>option]:bg-base-900`}
                {...register("category")}>
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.slug}>{c.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-smoke uppercase tracking-wide mb-1 block">Price / Day ($) *</label>
              <input type="number" className={INPUT_CLASS} placeholder="1200"
                {...register("price", { required: true, min: 1 })} />
            </div>
            <div>
              <label className="text-xs text-smoke uppercase tracking-wide mb-1 block">Year</label>
              <input type="number" className={INPUT_CLASS}
                {...register("year")} />
            </div>
            <div>
              <label className="text-xs text-smoke uppercase tracking-wide mb-1 block">Seats</label>
              <input type="number" className={INPUT_CLASS}
                {...register("seats")} />
            </div>
            <div>
              <label className="text-xs text-smoke uppercase tracking-wide mb-1 block">Transmission</label>
              <select className={`${INPUT_CLASS} cursor-pointer [&>option]:bg-base-900`}
                {...register("transmission")}>
                <option>Automatic</option>
                <option>Manual</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-smoke uppercase tracking-wide mb-1 block">Fuel Type</label>
              <select className={`${INPUT_CLASS} cursor-pointer [&>option]:bg-base-900`}
                {...register("fuelType")}>
                {["Petrol", "Diesel", "Electric", "Hybrid"].map((f) => (
                  <option key={f}>{f}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-smoke uppercase tracking-wide mb-1 block">Engine</label>
              <input className={INPUT_CLASS} placeholder="6.75L V12"
                {...register("engine")} />
            </div>
            <div>
              <label className="text-xs text-smoke uppercase tracking-wide mb-1 block">Top Speed</label>
              <input className={INPUT_CLASS} placeholder="250 km/h"
                {...register("topSpeed")} />
            </div>
          </div>
          <div>
            <label className="text-xs text-smoke uppercase tracking-wide mb-1 block">Image URL</label>
            <input className={INPUT_CLASS} placeholder="https://..."
              {...register("image")} />
          </div>
          <div>
            <label className="text-xs text-smoke uppercase tracking-wide mb-1 block">Description</label>
            <textarea rows={3} className={`${INPUT_CLASS} resize-none`}
              placeholder="A brief description of the car..."
              {...register("description")} />
          </div>
          <div>
            <label className="text-xs text-smoke uppercase tracking-wide mb-1 block">
              Features (comma-separated)
            </label>
            <input className={INPUT_CLASS}
              placeholder="Leather Seats, GPS Navigation, Sunroof"
              defaultValue={car?.features?.join(", ") || ""}
              {...register("features")} />
          </div>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 text-sm text-ivory cursor-pointer">
              <input type="checkbox" className="accent-gold-500" {...register("featured")} />
              Featured
            </label>
            <label className="flex items-center gap-2 text-sm text-ivory cursor-pointer">
              <input type="checkbox" className="accent-gold-500" {...register("available")} />
              Available
            </label>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 py-3 rounded-xl border border-gold-500/20 text-sm text-ivory hover:bg-base-850 transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={saving}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-gold-400 to-gold-600 text-base-950 font-semibold text-sm disabled:opacity-60">
              {saving ? "Saving..." : isEdit ? "Update Car" : "Add Car"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ─── Cars Tab ─── */
function CarsTab({ cars, isLoading, refetch }) {
  const [modal, setModal] = useState(null); // null | "add" | car object

  const handleDelete = async (car) => {
    if (!window.confirm(`Delete "${car.brand} ${car.name}"?`)) return;
    try {
      await apiClient.delete(`/cars/${car.id}`);
      toast.success("Car deleted");
      refetch();
    } catch {
      toast.error("Failed to delete");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-xl font-semibold text-ivory">Cars List</h2>
        <button
          type="button"
          onClick={() => setModal("add")}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-gold-400 to-gold-600 text-base-950 text-sm font-semibold hover:shadow-gold-glow transition-shadow duration-300"
        >
          <HiOutlinePlus className="w-4 h-4" />
          Add New Car
        </button>
      </div>

      <div className="rounded-2xl border border-gold-500/10 overflow-hidden">
        <div className="grid grid-cols-[48px_1fr_140px_100px_80px] gap-0 bg-base-900 px-4 py-3 text-xs uppercase tracking-wider text-smoke font-medium">
          <span>Img</span>
          <span>Name</span>
          <span>Category</span>
          <span>Price</span>
          <span className="text-right">Actions</span>
        </div>

        {isLoading && (
          <div className="px-4 py-8 text-center text-mist text-sm animate-pulse">
            Loading cars...
          </div>
        )}

        {!isLoading && (cars || []).map((car, i) => (
          <div
            key={car.id}
            className={`grid grid-cols-[48px_1fr_140px_100px_80px] gap-0 px-4 py-3 items-center border-t border-gold-500/10 ${
              i % 2 === 0 ? "bg-base-950" : "bg-base-900"
            }`}
          >
            <div className="w-10 h-10 rounded-lg overflow-hidden bg-base-800 shrink-0">
              <img
                src={car.image}
                alt=""
                className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.style.opacity = "0.3"; }}
              />
            </div>
            <div className="min-w-0 pr-4">
              <p className="text-xs text-smoke">{car.brand}</p>
              <p className="text-sm font-medium text-ivory truncate">{car.name}</p>
            </div>
            <p className="text-xs text-mist truncate">{car.category}</p>
            <p className="text-sm text-ivory">{formatPrice(car.price)}</p>
            <div className="flex items-center gap-2 justify-end">
              <button
                type="button"
                onClick={() => setModal(car)}
                className="text-mist hover:text-gold-400 transition-colors"
                aria-label="Edit"
              >
                <HiOutlinePencil className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleDelete(car)}
                className="text-mist hover:text-danger transition-colors"
                aria-label="Delete"
              >
                <HiOutlineTrash className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {modal && (
        <CarFormModal
          car={modal === "add" ? null : modal}
          onClose={() => setModal(null)}
          onSaved={() => { setModal(null); refetch(); }}
        />
      )}
    </div>
  );
}

/* ─── Bookings Tab ─── */
function BookingsTab() {
  const fetcher = useCallback(() => getAllBookings(), []);
  const { data: bookings, isLoading } = useFetch(fetcher);

  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-ivory mb-6">Bookings</h2>
      <div className="rounded-2xl border border-gold-500/10 overflow-hidden">
        <div className="grid grid-cols-[1fr_160px_120px_120px] gap-0 bg-base-900 px-4 py-3 text-xs uppercase tracking-wider text-smoke font-medium">
          <span>Customer</span>
          <span>Car</span>
          <span>Pick-up</span>
          <span>Total</span>
        </div>
        {isLoading && (
          <div className="px-4 py-8 text-center text-mist text-sm animate-pulse">
            Loading bookings...
          </div>
        )}
        {!isLoading && (!bookings || bookings.length === 0) && (
          <div className="px-4 py-12 text-center text-mist text-sm">
            No bookings yet.
          </div>
        )}
        {!isLoading && (bookings || []).map((booking, i) => (
          <div
            key={booking.id}
            className={`grid grid-cols-[1fr_160px_120px_120px] gap-0 px-4 py-3 items-center border-t border-gold-500/10 ${
              i % 2 === 0 ? "bg-base-950" : "bg-base-900"
            }`}
          >
            <div>
              <p className="text-sm font-medium text-ivory">{booking.fullName}</p>
              <p className="text-xs text-smoke">{booking.email}</p>
            </div>
            <p className="text-xs text-mist truncate">{booking.carName}</p>
            <p className="text-xs text-mist">
              {booking.pickupDate ? formatDate(booking.pickupDate) : "—"}
            </p>
            <p className="text-sm font-medium text-ivory">
              {booking.pricePerDay ? formatPrice(booking.pricePerDay) : "—"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Dashboard Overview Tab ─── */
function DashboardTab({ cars }) {
  const total = cars?.length || 0;
  const featured = cars?.filter((c) => c.featured).length || 0;
  const available = cars?.filter((c) => c.available).length || 0;
  const avgRating = cars?.length
    ? (cars.reduce((s, c) => s + c.rating, 0) / cars.length).toFixed(1)
    : "—";

  const statCards = [
    { label: "Total Cars", value: total },
    { label: "Featured", value: featured },
    { label: "Available", value: available },
    { label: "Avg Rating", value: avgRating, icon: HiStar },
  ];

  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-ivory mb-6">Overview</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {statCards.map((s) => (
          <div key={s.label} className="p-6 rounded-2xl border border-gold-500/10 bg-base-900">
            <p className="text-xs uppercase tracking-wider text-smoke">{s.label}</p>
            <p className="font-display text-3xl font-semibold text-ivory mt-2 flex items-center gap-1">
              {s.value}
              {s.icon && <s.icon className="w-5 h-5 text-gold-400" />}
            </p>
          </div>
        ))}
      </div>
      <div className="p-6 rounded-2xl border border-gold-500/10 bg-base-900">
        <h3 className="font-display text-lg font-semibold text-ivory mb-4">
          Category Breakdown
        </h3>
        <div className="space-y-3">
          {CATEGORIES.map((cat) => {
            const count = (cars || []).filter((c) => c.category === cat.slug).length;
            const pct = total > 0 ? Math.round((count / total) * 100) : 0;
            return (
              <div key={cat.id}>
                <div className="flex justify-between text-xs text-mist mb-1">
                  <span>{cat.label}</span>
                  <span>{count} cars</span>
                </div>
                <div className="h-1.5 rounded-full bg-base-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-gold-400 to-gold-600"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ─── Main Admin Page ─── */
function Admin() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();

  const fetcher = useCallback(() => getAllCars(), []);
  const { data: cars, isLoading, refetch } = useFetch(fetcher);

  const handleLogout = () => {
    adminLogout();
    toast.success("Logged out successfully");
    navigate("/admin/login");
  };

  return (
    <div className="pt-20 min-h-screen bg-base-950">
      <div className="flex min-h-[calc(100vh-80px)]">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-56 shrink-0 border-r border-gold-500/10 bg-base-900 pt-6 pb-10">
          <div className="px-6 mb-8">
            <p className="text-xs uppercase tracking-[0.2em] text-gold-400 font-semibold">
              Admin Panel
            </p>
          </div>
          <nav className="flex-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-6 py-3.5 text-sm font-medium transition-colors duration-200 ${
                  activeTab === item.id
                    ? "text-gold-400 bg-gold-500/10 border-r-2 border-gold-400"
                    : "text-mist hover:text-ivory"
                }`}
              >
                <item.icon className="w-4.5 h-4.5" />
                {item.label}
              </button>
            ))}
          </nav>
          <div className="px-4 pb-6">
            <button
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-mist hover:text-danger hover:bg-danger/10 transition-colors duration-200"
            >
              <HiOutlineArrowRightOnRectangle className="w-4.5 h-4.5" />
              Logout
            </button>
          </div>
        </aside>

        {/* Mobile tabs */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-base-900 border-t border-gold-500/10 flex">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id)}
              className={`flex-1 flex flex-col items-center gap-1 py-3 text-xs transition-colors duration-200 ${
                activeTab === item.id ? "text-gold-400" : "text-smoke"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <main className="flex-1 p-6 lg:p-10 pb-24 lg:pb-10 overflow-auto">
          {activeTab === "dashboard" && <DashboardTab cars={cars} />}
          {activeTab === "cars" && (
            <CarsTab cars={cars} isLoading={isLoading} refetch={refetch} />
          )}
          {activeTab === "bookings" && <BookingsTab />}
        </main>
      </div>
    </div>
  );
}

export default Admin;
