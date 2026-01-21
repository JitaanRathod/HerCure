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
    <div className="py-8">

      <h1 className="text-3xl font-semibold mb-8">
        Menstrual Cycle
      </h1>

      <div className="space-y-6">

        {/* 🔽 CURRENT CYCLE CARD 🔽 */}
        <div className="hercure-card p-6">
          <h2 className="text-lg font-semibold mb-4">
            Current Cycle Status
          </h2>

          {/* existing cycle details */}
        </div>

        {/* 🔽 PREDICTIONS CARD 🔽 */}
        <div className="hercure-card p-6">
          <h2 className="text-lg font-semibold mb-4">
            Upcoming Phases
          </h2>
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
    </div>

    </div>
    </div>
  );
};

export default Cycle;
