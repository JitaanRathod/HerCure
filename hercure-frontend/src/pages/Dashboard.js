import { useAuth } from "../auth/AuthContext";

const Dashboard = () => {
  const { logout } = useAuth();

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome to HerCure 👩‍⚕️</p>

      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;
