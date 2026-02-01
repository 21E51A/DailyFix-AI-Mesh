import { useEffect, useState } from "react";
import { getTasks, createTask, completeTask } from "../api/task.api";
import { analyzeTask } from "../api/ai.api";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  const add = async () => {
    if (!title.trim()) return;

    await createTask({ title });
    await analyzeTask(title);

    setTitle("");
    load();
  };

  const markDone = async (id) => {
    await completeTask(id);
    load(); // refresh
  };

  return (
    <div className="tasks">
      <h2>Tasks</h2>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New task..."
      />

      <button onClick={add}>Add Task</button>

      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            <span
              style={{
                textDecoration:
                  t.status === "completed" ? "line-through" : "none",
              }}
            >
              {t.title} — {t.status}
            </span>

            {t.status !== "completed" && (
              <button
                onClick={() => markDone(t.id)}
                style={{ marginLeft: "10px" }}
              >
                Complete
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
