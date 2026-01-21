import { useAuth } from "../auth/AuthContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { logout } = useAuth();

  return (
    <div className="py-10 px-4">
      
      {/* 🌈 BRAND TITLE - Instagram-style gradient */}
      <h1 className="text-center text-5xl md:text-6xl font-extrabold mb-12 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
        HerCure
      </h1>

      {/* 📌 PAGE HEADING - Navy Blue */}
      <h2 className="text-center text-3xl font-semibold text-[#0F172A] mb-10">
        Your Health Overview
      </h2>

      {/* 🧩 DASHBOARD GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">

        {/* 🌸 CARD — CYCLE */}
        <div className="hercure-card p-6">
          <h3 className="text-lg font-semibold mb-4 text-[#0F172A]">
            Cycle Summary
          </h3>
          <p className="text-[#0F172A] opacity-80">
            {/* Your existing cycle content goes here */}
            Track your menstrual health and patterns
          </p>
        </div>

        {/* 🌿 CARD — LIFESTYLE */}
        <div className="hercure-card p-6">
          <h3 className="text-lg font-semibold mb-4 text-[#0F172A]">
            Lifestyle Insights
          </h3>

          <p className="mb-4 text-[#0F172A] opacity-80">
            Welcome to HerCure 👩‍⚕️
          </p>

          <div className="space-y-2 mb-6">
            <Link
              to="/cycle"
              className="block font-medium text-purple-700 hover:text-pink-600 hover:underline transition-colors"
            >
              → Menstrual Cycle
            </Link>

            <Link
              to="/lifestyle"
              className="block font-medium text-purple-700 hover:text-pink-600 hover:underline transition-colors"
            >
              → Lifestyle & Symptoms
            </Link>
          </div>

          <button
            onClick={logout}
            className="w-full mt-2 font-semibold py-2.5 rounded-xl hover:opacity-90 transition-opacity"
          >
            Logout
          </button>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
