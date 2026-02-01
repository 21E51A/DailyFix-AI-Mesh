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
      console.error(err);
    }
  };

  // Create task
  const addTask = async () => {

    if (!title.trim()) {
      alert("Enter title");
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
      alert("Failed");
    } finally {
      setLoading(false);
    }
  };

  // Update progress
  const updateProgress = async (id, progress) => {
    await api.put(`/tasks/${id}`, { progress });
    loadTasks();
  };

  // Update status
  const updateStatus = async (id, status) => {
    await api.put(`/tasks/${id}`, { status });
    loadTasks();
  };

  // Delete
  const deleteTask = async (id) => {

    if (!window.confirm("Delete task?")) return;

    await api.delete(`/tasks/${id}`);
    loadTasks();
  };

  return (
    <div style={{ padding: "20px" }}>

      <h2>📋 My Tasks</h2>

      {/* Add Task */}
      <div style={{ marginBottom: "20px" }}>

        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button onClick={addTask} disabled={loading}>
          {loading ? "Adding..." : "Add"}
        </button>

      </div>

      {/* Table */}
      <table border="1" width="100%" cellPadding="8">

        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Progress</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {tasks.map((t) => (

            <tr key={t.id}>

              <td>{t.title}</td>

              <td>
                {t.status === "completed" ? "✅ Completed" : t.status}
              </td>

              <td>

                <input
                  type="range"
                  min="0"
                  max="100"
                  value={t.progress || 0}
                  onChange={(e) =>
                    updateProgress(t.id, Number(e.target.value))
                  }
                />

                {t.progress || 0}%

              </td>

              <td>

                <button
                  onClick={() => updateStatus(t.id, "completed")}
                >
                  Complete
                </button>

                <button
                  onClick={() => updateStatus(t.id, "cancelled")}
                >
                  Cancel
                </button>

                <button
                  onClick={() => deleteTask(t.id)}
                  style={{ color: "red" }}
                >
                  Delete
                </button>

              </td>

            </tr>
          ))}

        </tbody>

      </table>

      {tasks.length === 0 && <p>No tasks yet</p>}

    </div>
  );
}
