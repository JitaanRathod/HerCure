const LifestyleTimeline = ({ entries }) => {
  if (!entries.length) return <p>No entries for this day</p>;

  return (
    <div>
      <h3>Daily Timeline</h3>

      {entries.map((entry) => (
        <div
          key={entry._id}
          style={{
            border: "1px solid #ccc",
            padding: "8px",
            marginBottom: "8px",
          }}
        >
          <p>
            <b>{entry.type.toUpperCase()}</b> —{" "}
            {new Date(entry.timestamp).toLocaleTimeString(
              "en-IN",
              {
                timeZone: "Asia/Kolkata",
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              }
            )}
          </p>

          <pre>{JSON.stringify(entry.data, null, 2)}</pre>
        </div>
      ))}
    </div>
  );
};

export default LifestyleTimeline;
