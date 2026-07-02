export const ROUTES = {
  HOME: "/",
  CARS: "/cars",
  CAR_DETAILS: "/cars/:id",
  WEDDING_CARS: "/wedding-cars",
  BOOKING: "/booking/:id",
  ABOUT: "/about",
  CONTACT: "/contact",
  WISHLIST: "/wishlist",
  COMPARE: "/compare",
  NOT_FOUND: "*",
};

export const buildCarDetailsPath = (id) => `/cars/${id}`;
export const buildBookingPath = (id) => `/booking/${id}`;
