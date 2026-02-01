import api from "./axios";

// Get all tasks
export const getTasks = async () => {
  const res = await api.get("/tasks/");
  return res.data;
};

// Create new task
export const createTask = async (task) => {
  const res = await api.post("/tasks/", task);
  return res.data;
};

// Update task (status / progress)
export const updateTask = async (id, data) => {
  const res = await api.put(`/tasks/${id}`, data);
  return res.data;
};

// Delete task (Terminate)
export const deleteTask = async (id) => {
  const res = await api.delete(`/tasks/${id}`);
  return res.data;
};
