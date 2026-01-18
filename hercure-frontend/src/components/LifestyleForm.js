import { useState, useEffect } from "react";
import api from "../api/api";

const LifestyleForm = ({ selectedDate, onSuccess }) => {
  const [type, setType] = useState("mood");
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  // Reset data when type changes
  useEffect(() => {
    setData({});
  }, [type]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data || Object.keys(data).length === 0) {
      alert("Please fill the entry before submitting");
      return;
    }

    // Combine selected date + current local time
    const now = new Date();
    const [year, month, day] = selectedDate.split("-").map(Number);

    const localDateTime = new Date(
      year,
      month - 1,
      day,
      now.getHours(),
      now.getMinutes(),
      now.getSeconds()
    );

    const payload = {
      type,
      timestamp: localDateTime.toISOString(),
      data
    };

    setLoading(true);
    try {
      await api.post("/api/lifestyle", payload);
      setData({});
      onSuccess();
    } catch (err) {
      console.error("Failed to save lifestyle entry", err.response?.data || err);
      alert("Error saving entry");
    } finally {
      setLoading(false);
    }
  };

  const renderFields = () => {
    switch (type) {
      case "sleep":
        return (
          <input
            type="number"
            min="0"
            max="24"
            value={data.sleepHours || ""}
            placeholder="Sleep hours"
            onChange={(e) =>
              setData({ sleepHours: Number(e.target.value) })
            }
            required
          />
        );

      case "mood":
        return (
          <select
            value={data.mood || ""}
            onChange={(e) => setData({ mood: e.target.value })}
            required
          >
            <option value="">Select mood</option>
            <option value="bad">Bad</option>
            <option value="okay">Okay</option>
            <option value="good">Good</option>
          </select>
        );

      case "activity":
        return (
          <input
            type="number"
            min="0"
            max="1440"
            value={data.activityMinutes || ""}
            placeholder="Activity minutes"
            onChange={(e) =>
              setData({ activityMinutes: Number(e.target.value) })
            }
            required
          />
        );

      case "symptom":
        return (
          <>
            <input
              type="text"
              value={data.symptom || ""}
              placeholder="Symptom"
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  symptom: e.target.value
                }))
              }
              required
            />
            <input
              type="number"
              min="1"
              max="5"
              value={data.severity || ""}
              placeholder="Severity (1–5)"
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  severity: Number(e.target.value)
                }))
              }
              required
            />
          </>
        );

      case "note":
        return (
          <textarea
            value={data.note || ""}
            placeholder="Write a note..."
            onChange={(e) => setData({ note: e.target.value })}
            required
          />
        );

      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Entry</h3>

      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="sleep">Sleep</option>
        <option value="mood">Mood</option>
        <option value="activity">Activity</option>
        <option value="symptom">Symptom</option>
        <option value="note">Note</option>
      </select>

      <div style={{ margin: "8px 0" }}>
        {renderFields()}
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Add Entry"}
      </button>
    </form>
  );
};

export default LifestyleForm;
