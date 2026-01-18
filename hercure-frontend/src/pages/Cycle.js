import { useEffect, useState } from "react";
import api from "../api/api";
import CycleForm from "../components/CycleForm";

const Cycle = () => {
  const [cycle, setCycle] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchLatestCycle = async () => {
    try {
      const res = await api.get("/api/cycle/latest");
      setCycle(res.data);
    } catch (err) {
      console.error("Error fetching cycle", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestCycle();
  }, []);

  return (
    <div style={{ maxWidth: "500px", margin: "auto" }}>
      <h2>Menstrual Cycle</h2>

      {loading ? (
        <p>Loading...</p>
      ) : cycle ? (
        <div style={{ border: "1px solid #ccc", padding: "12px", marginBottom: "16px" }}>
          <p><b>Last Period:</b> {cycle.lastPeriodDate.slice(0, 10)}</p>
          <p><b>Cycle Length:</b> {cycle.cycleLength} days</p>
          <p><b>Period Duration:</b> {cycle.periodDuration} days</p>
        </div>
      ) : (
        <p>No cycle data found</p>
      )}

      <CycleForm existingCycle={cycle} onSuccess={fetchLatestCycle} />
    </div>
  );
};

export default Cycle;
