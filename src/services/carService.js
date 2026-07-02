import apiClient from "./apiClient";

export const getAllCars = async () => {
  const { data } = await apiClient.get("/cars");
  return data;
};

export const getCarById = async (id) => {
  const { data } = await apiClient.get(`/cars/${id}`);
  return data;
};

export const getFeaturedCars = async () => {
  const { data } = await apiClient.get("/cars", {
    params: { featured: true },
  });
  return data;
};

export const getCarsByCategory = async (category) => {
  const { data } = await apiClient.get("/cars", {
    params: { category },
  });
  return data;
};

export const getWeddingCars = () => getCarsByCategory("Wedding Cars");

export const getRelatedCars = async (category, excludeId) => {
  const { data } = await apiClient.get("/cars", {
    params: { category },
  });
  return data.filter((car) => car.id !== excludeId).slice(0, 4);
};
