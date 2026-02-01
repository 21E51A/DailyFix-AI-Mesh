import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadTasks();
  }, []);

  // Load tasks
  const loadTasks = async () => {
    try {
      const res = await api.get("/tasks/");
      setTasks(res.data);
    } catch (err) {
      console.error("Error loading tasks", err);
    }
  };

  // Add task
  const addTask = async () => {
    if (!title.trim()) {
      alert("Enter task title");
      return;
    }

    try {
      setLoading(true);

      await api.post("/tasks/", {
        title,
        description,
      });

      setTitle("");
      setDescription("");

      loadTasks();
    } catch (err) {
      alert("Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  // Update status
  const updateStatus = async (id, status) => {
    try {
      await api.put(`/tasks/${id}`, { status });
      loadTasks();
    } catch (err) {
      alert("Update failed");
    }
  };

  // Update progress
  const updateProgress = async (id, progress) => {
    try {
      await api.put(`/tasks/${id}`, { progress });
      loadTasks();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete
  const deleteTask = async (id) => {
    if (!window.confirm("Delete this task?")) return;

    try {
      await api.delete(`/tasks/${id}`);
      loadTasks();
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>

      <h2>📋 My Tasks</h2>

      {/* Add Task */}
      <div style={{ marginBottom: "20px" }}>

        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "250px", marginRight: "10px" }}
        />

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ width: "250px", marginRight: "10px" }}
        />

        <button onClick={addTask} disabled={loading}>
          {loading ? "Adding..." : "Add Task"}
        </button>

      </div>

      {/* Task Table */}
      <table border="1" cellPadding="10" width="100%">

        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Progress</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {tasks.map((task) => {

            const isDone =
              task.status === "completed" ||
              task.status === "cancelled";

            return (
              <tr key={task.id}>

                <td>{task.title}</td>

                {/* Status */}
                <td>
                  {task.status === "completed" && "✅ Completed"}
                  {task.status === "cancelled" && "❌ Cancelled"}
                  {task.status === "pending" && "⏳ Pending"}
                  {task.status === "in_progress" && "🚧 In Progress"}
                </td>

                {/* Progress */}
                <td>

                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={task.progress || 0}
                    disabled={isDone}
                    onChange={(e) =>
                      updateProgress(
                        task.id,
                        Number(e.target.value)
                      )
                    }
                  />

                  <span> {task.progress || 0}%</span>

                </td>

                {/* Actions */}
                <td>

                  <button
                    disabled={isDone}
                    onClick={() =>
                      updateStatus(task.id, "completed")
                    }
                  >
                    ✅ Complete
                  </button>

                  <button
                    disabled={isDone}
                    onClick={() =>
                      updateStatus(task.id, "cancelled")
                    }
                    style={{ marginLeft: "5px" }}
                  >
                    ❌ Cancel
                  </button>

                  <button
                    onClick={() => deleteTask(task.id)}
                    style={{
                      marginLeft: "5px",
                      color: "red"
                    }}
                  >
                    🗑 Delete
                  </button>

                </td>

              </tr>
            );
          })}

        </tbody>

      </table>

      {tasks.length === 0 && (
        <p>No tasks yet. Add one ☝️</p>
      )}

    </div>
  );
}
