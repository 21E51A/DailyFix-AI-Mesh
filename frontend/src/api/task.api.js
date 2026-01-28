// ✅ CORRECT (no trailing slash)
export const getTasks = async () => {
  const res = await api.get("/tasks");
  return res.data;
};

export const createTask = async (task) => {
  const res = await api.post("/tasks", task);
  return res.data;
};
