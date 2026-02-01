import api from "./axios";

export const getTasks = async () => {
  const res = await api.get("/tasks/");
  return res.data;
};

export const createTask = async (task) => {
  const res = await api.post("/tasks/", task);
  return res.data;
};

// ✅ Mark task complete
export const completeTask = async (id) => {
  const res = await api.put(`/tasks/${id}/complete`);
  return res.data;
};
