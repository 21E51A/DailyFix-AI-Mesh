import api from "./axios";

// Register user
export const registerUser = async (userData) => {
  const res = await api.post("/users", userData); // ✅ NO trailing slash
  return res.data;
};
