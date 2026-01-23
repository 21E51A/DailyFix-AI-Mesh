import api from "./axios";

export const analyzeTask = async (title) => {
  const res = await api.post("/ai/analyze-task", { title });
  return res.data;
};
