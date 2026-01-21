import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./auth/AuthContext";
import Cycle from "./pages/Cycle";
import Lifestyle from "./pages/Lifestyle";

function App() {
  return (
    <div className="min-h-screen px-4 py-8 flex justify-center">
    <div className="w-full max-w-6xl">
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cycle"
            element={
              <ProtectedRoute>
                <Cycle />
              </ProtectedRoute>
            }
          />
          <Route
            path="/lifestyle"
            element={
              <ProtectedRoute>
                <Lifestyle />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </div>
    </div>
  );
}

export default App;
