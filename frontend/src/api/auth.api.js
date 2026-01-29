import api from "./axios";

export const loginUser = async (email, password) => {
  const form = new URLSearchParams();
  form.append("username", email);
  form.append("password", password);
  const res = await api.post("/auth/login/", form); // ✅ trailing slash
  // #const res = await api.post("/auth/login", form);
  return res.data;
};
