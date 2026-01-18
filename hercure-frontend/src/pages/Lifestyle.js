import { useEffect, useState, useCallback } from "react";
import api from "../api/api";
import LifestyleForm from "../components/LifestyleForm";
import LifestyleTimeline from "../components/LifestyleTimeline";

const Lifestyle = () => {
  const [date, setDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchEntries = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get(
        `/api/lifestyle/day?date=${date}`
      );
      setEntries(res.data);
    } catch (err) {
      console.error("Failed to fetch lifestyle entries", err);
    } finally {
      setLoading(false);
    }
  }, [date]);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <h2>Lifestyle & Symptoms</h2>

      <label>Select Date</label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <LifestyleForm
        selectedDate={date}
        onSuccess={fetchEntries}
      />

      {loading ? (
        <p>Loading timeline...</p>
      ) : (
        <LifestyleTimeline entries={entries} />
      )}
    </div>
  );
};

export default Lifestyle;
