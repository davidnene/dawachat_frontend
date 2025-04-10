// src/services/doctorStressLogsService.js
import api from "./api";

export const getTodayDoctorStressLogs = async () => {
  const response = await api.get("/api/stress-logs-today/");
  return response.data;
};
