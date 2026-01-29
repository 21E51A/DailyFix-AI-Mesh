import api from "./axios";

export const registerUser = async (data) => {
  const res = await api.post("/users/", data); // ✅ trailing slash
  return res.data;
};
