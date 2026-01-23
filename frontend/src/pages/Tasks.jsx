import { useEffect, useState } from "react";
import { getTasks, createTask } from "../api/task.api";
import { analyzeTask } from "../api/ai.api";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    setTasks(await getTasks());
  };

  const add = async () => {
    await createTask({ title });
    await analyzeTask(title);
    setTitle("");
    load();
  };

  return (
    <>
      <h2>Tasks</h2>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <button onClick={add}>Add Task</button>

      <ul>
        {tasks.map((t) => (
          <li key={t.id}>{t.title} — {t.status}</li>
        ))}
      </ul>
    </>
  );
}
