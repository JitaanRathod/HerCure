import { useAuth } from "../auth/AuthContext";
import { Link } from "react-router-dom";


const Dashboard = () => {
  const { logout } = useAuth();

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome to HerCure 👩‍⚕️</p>

      {/* Navigation */}
      <div style={{ margin: "16px 0" }}>
        <Link to="/cycle">Menstrual Cycle</Link>
        <br></br>
        <Link to="/lifestyle">Lifestyle & Symptoms</Link>
      </div>

      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;
