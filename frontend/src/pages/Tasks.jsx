import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  // Load tasks
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const res = await api.get("/tasks/");
      setTasks(res.data);
    } catch (err) {
      console.error("Error loading tasks", err);
    }
  };

  // Create task
  const addTask = async () => {
    if (!title.trim()) return alert("Enter task title");

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
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Update status
  const updateStatus = async (id, status) => {
    try {
      await api.put(`/tasks/${id}`, {
        status,
      });

      loadTasks();
    } catch (err) {
      alert("Failed to update task");
      console.error(err);
    }
  };

  // Update progress
  const updateProgress = async (id, progress) => {
    try {
      await api.put(`/tasks/${id}`, {
        progress,
      });

      loadTasks();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    if (!window.confirm("Delete this task?")) return;

    try {
      await api.delete(`/tasks/${id}`);
      loadTasks();
    } catch (err) {
      alert("Failed to delete task");
    }
  };

  return (
    <div style={{ padding: "20px" }}>

      <h2>📋 My Tasks</h2>

      {/* Create Task */}
      <div style={{ marginBottom: "20px" }}>

        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "300px", marginRight: "10px" }}
        />

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ width: "300px", marginRight: "10px" }}
        />

        <button onClick={addTask} disabled={loading}>
          {loading ? "Adding..." : "Add Task"}
        </button>

      </div>

      {/* Task List */}
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

          {tasks.map((task) => (
            <tr key={task.id}>

              <td>{task.title}</td>

              {/* Status */}
              <td>{task.status}</td>

              {/* Progress */}
              <td>

                <input
                  type="range"
                  min="0"
                  max="100"
                  value={task.progress || 0}
                  onChange={(e) =>
                    updateProgress(task.id, Number(e.target.value))
                  }
                />

                <span> {task.progress || 0}%</span>

              </td>

              {/* Actions */}
              <td>

                <button
                  onClick={() => updateStatus(task.id, "completed")}
                  style={{ marginRight: "5px" }}
                >
                  ✅ Complete
                </button>

                <button
                  onClick={() => updateStatus(task.id, "cancelled")}
                  style={{ marginRight: "5px" }}
                >
                  ❌ Cancel
                </button>

                <button
                  onClick={() => deleteTask(task.id)}
                  style={{ color: "red" }}
                >
                  🗑 Delete
                </button>

              </td>

            </tr>
          ))}

        </tbody>

      </table>

      {tasks.length === 0 && (
        <p>No tasks yet. Add one ☝️</p>
      )}

    </div>
  );
}
