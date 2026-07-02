const ADMIN_AUTH_KEY = "admin-auth";

export const isAdminAuthenticated = () =>
  sessionStorage.getItem(ADMIN_AUTH_KEY) === "true";

export const adminLogin = () => {
  sessionStorage.setItem(ADMIN_AUTH_KEY, "true");
  window.dispatchEvent(new Event("admin-auth-changed"));
};

export const adminLogout = () => {
  sessionStorage.removeItem(ADMIN_AUTH_KEY);
  window.dispatchEvent(new Event("admin-auth-changed"));
};