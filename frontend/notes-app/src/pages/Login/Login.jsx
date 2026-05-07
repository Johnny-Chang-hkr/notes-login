import { useState } from "react";
import PasswordInput from "../../components/Input/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // New loading state

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");
    setIsLoading(true); // Start loading

    try {
      const response = await axiosInstance.post("/users/login", {
        email: email,
        password: password,
      });

      // Handle successful login
      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard");
      }
    } catch (error) {
      // Handle login error
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="w-full flex justify-center pt-6">
        <div
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-blue-600 text-white font-bold text-xl shadow-md transition-transform group-hover:scale-105">
            N
          </div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight hidden sm:block">
            Notes<span className="text-blue-600">App</span>
          </h2>
        </div>
      </div>

      <div className="flex items-center justify-center mt-28 px-4">
        <div className="w-full max-w-md border rounded-2xl bg-white px-8 py-12 shadow-sm">
          <form onSubmit={handleLogin}>
            <h4 className="text-3xl font-semibold mb-2 text-slate-800">
              Welcome Back
            </h4>
            <p className="text-sm text-slate-500 mb-8">
              Please enter your details to log in.
            </p>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-slate-600 uppercase tracking-wider ml-1">
                  Email Address
                </label>
                <input
                  type="text"
                  placeholder="name@example.com"
                  className="input-box mt-1 w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-600 uppercase tracking-wider ml-1">
                  Password
                </label>
                <PasswordInput
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-sm mt-4 bg-red-50 p-2 rounded border border-red-100 text-center">
                {error}
              </p>
            )}

            <button
              type="submit"
              className={`btn-primary mt-6 w-full py-3 rounded-lg font-semibold transition-all shadow-md active:scale-[0.98] ${
                isLoading
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:bg-blue-700"
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>

            <p className="text-sm text-center mt-6 text-slate-600">
              New here?{" "}
              <Link
                to="/signup"
                className="font-bold text-blue-600 hover:underline"
              >
                Create an Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
