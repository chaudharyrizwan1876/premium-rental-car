import { Navigate } from "react-router-dom";
import { isAdminAuthenticated } from "../../utils/adminAuth";

function ProtectedRoute({ children }) {
  if (!isAdminAuthenticated()) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}

export default ProtectedRoute;
