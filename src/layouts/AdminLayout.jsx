import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";

function AdminLayout() {
  return (
    <div className="min-h-screen bg-base-950">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default AdminLayout;
