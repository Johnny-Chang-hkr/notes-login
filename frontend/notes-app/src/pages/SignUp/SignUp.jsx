import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MdArrowForward,
  MdMailOutline,
  MdPersonOutline,
  MdWarningAmber,
} from "react-icons/md";
import PasswordInput from "../../components/Input/PasswordInput";
import AuthLayout from "../../components/Auth/AuthLayout";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const passwordStrength = useMemo(() => {
    if (!password) return { score: 0, label: "Add a password" };

    const score = [
      password.length >= 8,
      /[a-z]/.test(password) && /[A-Z]/.test(password),
      /\d/.test(password),
      /[^A-Za-z0-9]/.test(password),
    ].filter(Boolean).length;

    return {
      score,
      label: score <= 1 ? "A little more variety helps" : score <= 2 ? "Getting stronger" : score === 3 ? "Looking good" : "Strong password",
    };
  }, [password]);

  const handleSignUp = async (event) => {
    event.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName) {
      setError("What should we call you?");
      return;
    }

    if (!validateEmail(trimmedEmail)) {
      setError("Enter a valid email address and try again.");
      return;
    }

    if (!password) {
      setError("Choose a password to secure your space.");
      return;
    }

    setError("");
    setIsLoading(true);
    try {
      const response = await axiosInstance.post("/users/create-account", {
        fullName: trimmedName,
        email: trimmedEmail,
        password,
      });

      if (response.data?.error) {
        setError(response.data.message || "We couldn't create your account. Please try again.");
        return;
      }

      if (response.data?.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard");
      } else {
        setError(response.data?.message || "We couldn't create your account. Please try again.");
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
    <AuthLayout variant="signup">
      <div className="auth-form-heading">
        <span className="auth-form-eyebrow">A FRESH PAGE, JUST FOR YOU</span>
        <h2>Your ideas need <span>a home.</span></h2>
        <p>Make a little room for everything on your mind.</p>
      </div>

      <form className="auth-form auth-form--signup" onSubmit={handleSignUp} noValidate>
        <div className="auth-field">
          <label htmlFor="signup-name">Your name</label>
          <div className="auth-input-wrap">
            <MdPersonOutline className="auth-field-icon" aria-hidden="true" />
            <input
              id="signup-name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="What do your friends call you?"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                if (error) setError("");
              }}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? "signup-error" : undefined}
              required
            />
          </div>
        </div>

        <div className="auth-field">
          <label htmlFor="signup-email">Email address</label>
          <div className="auth-input-wrap">
            <MdMailOutline className="auth-field-icon" aria-hidden="true" />
            <input
              id="signup-email"
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
              aria-describedby={error ? "signup-error" : undefined}
              required
            />
          </div>
        </div>

        <div className="auth-field">
          <label htmlFor="signup-password">Create a password</label>
          <PasswordInput
            id="signup-password"
            name="new-password"
            autoComplete="new-password"
            placeholder="Make it yours"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              if (error) setError("");
            }}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? "signup-error" : "password-strength"}
            required
          />
          <div className="password-strength" id="password-strength" aria-live="polite">
            <div className="password-strength-meter" aria-hidden="true">
              {[1, 2, 3, 4].map((step) => (
                <span
                  key={step}
                  className={passwordStrength.score >= step ? `strength-${passwordStrength.score}` : ""}
                />
              ))}
            </div>
            <span>{passwordStrength.label}</span>
          </div>
          <p className="password-hint">A longer password with a mix of characters is easier to keep safe.</p>
        </div>

        {error && (
          <p className="auth-error" id="signup-error" role="alert">
            <MdWarningAmber aria-hidden="true" />
            <span>{error}</span>
          </p>
        )}

        <button className="auth-submit" type="submit" disabled={isLoading}>
          <span>{isLoading ? "Making your space..." : "Create my account"}</span>
          {isLoading ? <span className="auth-spinner" /> : <MdArrowForward />}
        </button>
        <p className="auth-consent">By joining, you get a little more room for your ideas.</p>
      </form>

      <p className="auth-switch">
        Already have a space? <Link to="/login">Sign in instead <MdArrowForward /></Link>
      </p>
    </AuthLayout>
  );
};

export default SignUp;
