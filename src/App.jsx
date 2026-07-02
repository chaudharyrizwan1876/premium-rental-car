import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import { WishlistProvider } from "./context/WishlistContext";
import { CompareProvider } from "./context/CompareContext";
import { ThemeProvider } from "./context/ThemeContext";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Home from "./pages/Home/Home";
import Cars from "./pages/Cars/Cars";
import CarDetails from "./pages/CarDetails/CarDetails";
import Booking from "./pages/Booking/Booking";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import WeddingCars from "./pages/WeddingCars/WeddingCars";
import Wishlist from "./pages/Wishlist/Wishlist";
import Compare from "./pages/Compare/Compare";
import Admin from "./pages/Admin/Admin";
import AdminLogin from "./pages/Admin/AdminLogin";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  return (
    <ThemeProvider>
      <WishlistProvider>
        <CompareProvider>
          <BrowserRouter>
            <Toaster
              position="top-right"
              toastOptions={{
                style: {
                  background: "#181a1f",
                  color: "#f5f3ef",
                  border: "1px solid rgba(212, 175, 106, 0.2)",
                  fontSize: "14px",
                },
                iconTheme: {
                  primary: "#d4af6a",
                  secondary: "#0a0a0c",
                },
              }}
            />
            <Routes>
              {/* Main site */}
              <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/cars" element={<Cars />} />
                <Route path="/cars/:id" element={<CarDetails />} />
                <Route path="/booking/:id" element={<Booking />} />
                <Route path="/wedding-cars" element={<WeddingCars />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/compare" element={<Compare />} />
                <Route path="*" element={<NotFound />} />
              </Route>

              {/* Admin — separate layout, protected */}
              <Route element={<AdminLayout />}>
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <Admin />
                    </ProtectedRoute>
                  }
                />
              </Route>
            </Routes>
          </BrowserRouter>
        </CompareProvider>
      </WishlistProvider>
    </ThemeProvider>
  );
}

export default App;
