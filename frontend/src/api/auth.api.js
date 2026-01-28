/* import api from "./axios";

export const loginUser = async (email, password) => {
  const form = new URLSearchParams();
  form.append("username", email);
  form.append("password", password);

  const res = await api.post("/auth/login", form);
  return res.data;
}; */
import api from "./axios";

export const loginUser = async (email, password) => {
  const form = new URLSearchParams();
  form.append("username", email);
  form.append("password", password);

  const res = await api.post("/auth/login"); // ✅ no trailing slash
  return res.data;
};
