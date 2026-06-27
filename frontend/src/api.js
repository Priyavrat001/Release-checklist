import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getReleases = () => api.get("/releases");
export const getReleaseById = (id) => api.get(`/releases/${id}`);
export const createRelease = (payload) => api.post("/releases", payload);
export const toggleStep = ({ id, stepIndex }) => api.patch(`/releases/${id}/step/${stepIndex}`);
export const updateReleaseInfo = (id, additionalInfo) =>
  api.patch(`/releases/${id}/info`, { additionalInfo });
export const deleteRelease = (id) => api.delete(`/releases/${id}`);
