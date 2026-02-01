import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadStats = async () => {
    try {
      const res = await api.get("/dashboard");
      setStats(res.data);
    } catch (err) {
      console.error("Failed to load dashboard", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!stats) return <p>No data</p>;

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
