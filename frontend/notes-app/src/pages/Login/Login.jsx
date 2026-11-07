import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdArrowForward, MdMailOutline, MdWarningAmber } from "react-icons/md";
import PasswordInput from "../../components/Input/PasswordInput";
import AuthLayout from "../../components/Auth/AuthLayout";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    const trimmedEmail = email.trim();

    if (!validateEmail(trimmedEmail)) {
      setError("Enter a valid email address and try again.");
      return;
    }

    if (!password) {
      setError("Enter your password to continue.");
      return;
    }

    setError("");
    setIsLoading(true);
    try {
      const response = await axiosInstance.post("/users/login", {
        email: trimmedEmail,
        password,
      });

      if (response.data?.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard");
      } else {
        setError(response.data?.message || "We couldn't sign you in. Please try again.");
      }
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "Something went wrong. Check your connection and try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout variant="login">
      <div className="auth-form-heading">
        <span className="auth-form-eyebrow">YOUR SPACE IS WAITING</span>
        <h2>Welcome <span>back.</span></h2>
        <p>Pick up right where your thoughts left off.</p>
      </div>

      <form className="auth-form" onSubmit={handleLogin} noValidate>
        <div className="auth-field">
          <label htmlFor="login-email">Email address</label>
          <div className="auth-input-wrap">
            <MdMailOutline className="auth-field-icon" aria-hidden="true" />
            <input
              id="login-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                if (error) setError("");
              }}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? "login-error" : undefined}
              required
            />
          </div>
        </div>

        <div className="auth-field">
          <div className="auth-label-row">
            <label htmlFor="login-password">Password</label>
          </div>
          <PasswordInput
            id="login-password"
            name="password"
            autoComplete="current-password"
            placeholder="Your password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              if (error) setError("");
            }}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? "login-error" : undefined}
            required
          />
        </div>

        {error && (
          <p className="auth-error" id="login-error" role="alert">
            <MdWarningAmber aria-hidden="true" />
            <span>{error}</span>
          </p>
        )}

        <button className="auth-submit" type="submit" disabled={isLoading}>
          <span>{isLoading ? "Finding your space..." : "Sign in"}</span>
          {isLoading ? <span className="auth-spinner" /> : <MdArrowForward />}
        </button>
      </form>

      <p className="auth-switch">
        New to Notely? <Link to="/signup">Create your free account <MdArrowForward /></Link>
      </p>
    </AuthLayout>
  );
};

export default Login;
