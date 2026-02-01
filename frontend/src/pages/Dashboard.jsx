import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  const load = async () => {
    const res = await api.get("/dashboard");
    setStats(res.data);
  };

  useEffect(() => {
    load();

    // Auto refresh every 5 sec
    const interval = setInterval(load, 5000);

    return () => clearInterval(interval);
  }, []);

  if (!stats) return <p>Loading...</p>;

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      <div className="cards">
        <div className="card">
          Total Tasks: {stats.total_tasks}
        </div>

        <div className="card">
          Completed: {stats.completed}
        </div>

        <div className="card">
          Pending: {stats.pending}
        </div>
      </div>
    </div>
  );
}
