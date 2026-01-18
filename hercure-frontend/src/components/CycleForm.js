import { useEffect, useState } from "react";
import api from "../api/api";

const CycleForm = ({ existingCycle, onSuccess }) => {
  const [lastPeriodDate, setLastPeriodDate] = useState("");
  const [cycleLength, setCycleLength] = useState(28);
  const [periodDuration, setPeriodDuration] = useState(5);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (existingCycle) {
      setLastPeriodDate(existingCycle.lastPeriodDate.slice(0, 10));
      setCycleLength(existingCycle.cycleLength);
      setPeriodDuration(existingCycle.periodDuration);
    }
  }, [existingCycle]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/api/cycle", {
        lastPeriodDate,
        cycleLength,
        periodDuration,
      });
      onSuccess();
      alert("Cycle saved successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to save cycle");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{existingCycle ? "Update Cycle" : "Add Cycle"}</h3>

      <label>Last Period Date</label>
      <input
        type="date"
        value={lastPeriodDate}
        onChange={(e) => setLastPeriodDate(e.target.value)}
        required
      />

      <label>Cycle Length (days)</label>
      <input
        type="number"
        value={cycleLength}
        onChange={(e) => setCycleLength(e.target.value)}
        min="20"
        max="40"
        required
      />

      <label>Period Duration (days)</label>
      <input
        type="number"
        value={periodDuration}
        onChange={(e) => setPeriodDuration(e.target.value)}
        min="1"
        max="10"
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save Cycle"}
      </button>
    </form>
  );
};

export default CycleForm;
