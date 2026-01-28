import api from "./axios";

export const registerUser = async (user) => {
  const res = await api.post("/users", user); // 🔥 trailing slash REQUIRED
  return res.data;
};
