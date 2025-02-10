import api from "./api";

export const createDoctor = async (doctorData) => {
  return await api.post("/api/create-doctor/", doctorData);
};

export const getDoctors = async () => {
  const response = await api.get("/api/doctors/");
  return response.data;
};

export const updateDoctor = async (doctorId, doctorData) => {
  return await api.put(`/api/update-doctor/${doctorId}`, doctorData);
};

export const deleteDoctor = async (doctorId, doctorData) => {
  return await api.delete(`/api/delete-doctor/${doctorId}`, doctorData);
};
