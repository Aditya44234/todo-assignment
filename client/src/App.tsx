import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignupForm from "./components/Auth/SignupForm";
import LoginForm from "./components/Auth/LoginForm";
import ForgotPasswordForm from "./components/Auth/ForgotPasswordForm";
import ResetPasswordForm from "./components/Auth/ResetPasswordForm";

function App() {
  return (
    <BrowserRouter>
      <main className="min-h-screen bg-gray-100">
        <h1 className="bg-green-400 text-white text-3xl font-bold p-4 mb-8 text-center">
          Todo App Assignment
        </h1>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/forgot-password" element={<ForgotPasswordForm />} />
          <Route
            path="/reset-password/:token"
            element={<ResetPasswordForm />}
          />
          {/* Add more routes later: /todos, etc. */}
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
