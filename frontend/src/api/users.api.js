import api from "./axios";

export const registerUser = async (user) => {
  const res = await api.post("/users", user); // ❌ NO trailing slash
  return res.data;
};
