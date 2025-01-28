import api from "./api";

export const recordAlert = async (disease, frequency) => {
  await api.post("/api/record-alert", { disease, frequency });
};
