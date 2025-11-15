import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import SignupForm from "./components/Auth/SignupForm";
import LoginForm from "./components/Auth/LoginForm";
import ForgotPasswordForm from "./components/Auth/ForgotPasswordForm";
import ResetPasswordForm from "./components/Auth/ResetPasswordForm";
import TodoList from "./components/Todos/TodoList";
import { useAuthStore } from "./features/auth/store";

// Header component only reads token/logout, does NOT hydrate state
function Header() {
  const token = useAuthStore((s) => s.token);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-20 flex justify-between items-center bg-gradient-to-r from-green-400 to-blue-400 shadow text-white px-6 py-4 mb-8 rounded-b-2xl">
      <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight select-none">
        Todo App Assignment
      </h1>
      {token && (
        <button
          className="px-4 py-1 text-sm md:text-base font-bold rounded shadow bg-white/20 hover:bg-white/30 transition"
          onClick={handleLogout}
        >
          Log out
        </button>
      )}
    </header>
  );
}

function App() {
  // Hydrate Zustand store with JWT token on first mount (no infinite updates)
  const hydrateAuth = useAuthStore((s) => s.hydrateAuth);
  useEffect(() => {
    hydrateAuth();
  }, [hydrateAuth]);

  return (
    <BrowserRouter>
      <main className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-gray-200">
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/forgot-password" element={<ForgotPasswordForm />} />
          <Route
            path="/reset-password/:token"
            element={<ResetPasswordForm />}
          />
          <Route path="/todos" element={<TodoList />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
