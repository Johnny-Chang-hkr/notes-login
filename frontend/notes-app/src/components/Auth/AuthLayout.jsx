import { Link } from "react-router-dom";
import {
  MdArrowOutward,
  MdCheck,
  MdDarkMode,
  MdLightMode,
  MdLocalFlorist,
  MdOutlineLightbulb,
  MdOutlinePushPin,
} from "react-icons/md";
import { useTheme } from "../Theme/ThemeContext";

const AuthLayout = ({ variant, children }) => {
  const { theme, toggleTheme } = useTheme();

  return (
  <main className={`auth-layout auth-layout--${variant}`}>
    <aside className="auth-story">
      <div className="auth-story-glow auth-story-glow--one" />
      <div className="auth-story-glow auth-story-glow--two" />
      <svg
        className="auth-meadow-art"
        viewBox="0 0 760 300"
        preserveAspectRatio="xMidYMax slice"
        aria-hidden="true"
      >
        <path className="meadow-hill meadow-hill-back" d="M0 166C112 104 194 176 305 142s205-61 313-4 108 43 142 30v132H0Z" />
        <path className="meadow-hill meadow-hill-front" d="M0 217c131-71 217-39 329-14s244-63 431-7v104H0Z" />
        <g className="meadow-flowers meadow-flowers-back">
          <path d="M65 300c4-48 1-76-9-112m10 81c-15-19-24-23-37-25m39 6c10-20 21-27 35-30" />
          <path d="M186 300c-1-42 6-74 17-100m-14 73c-13-17-25-20-39-19m43-9c13-18 25-22 39-22" />
          <path d="M641 300c-5-51 1-89 16-125m-13 88c-17-18-28-21-44-19m50-12c14-22 27-27 44-28" />
        </g>
        <g className="meadow-flowers meadow-flowers-front">
          <path d="M119 300c0-49 10-88 27-117m-18 83c-16-16-28-18-43-15m48-16c15-19 28-23 45-22" />
          <path d="M335 300c-3-54 4-92 19-128m-16 91c-17-18-31-21-48-18m54-15c15-21 29-25 46-25" />
          <path d="M528 300c-2-45 5-80 17-108m-14 76c-15-17-27-19-42-17m47-12c13-19 26-23 41-23" />
          <path d="M714 300c1-39 9-68 21-92m-18 65c-12-14-23-16-36-14" />
        </g>
        <g className="meadow-blooms">
          <g transform="translate(56 187)"><circle r="4" /><circle cy="-7" r="5" /><circle cx="7" r="5" /><circle cy="7" r="5" /><circle cx="-7" r="5" /></g>
          <g transform="translate(360 172)"><circle r="4" /><circle cy="-7" r="5" /><circle cx="7" r="5" /><circle cy="7" r="5" /><circle cx="-7" r="5" /></g>
          <g transform="translate(657 168)"><circle r="4" /><circle cy="-7" r="5" /><circle cx="7" r="5" /><circle cy="7" r="5" /><circle cx="-7" r="5" /></g>
          <g transform="translate(146 181)"><circle r="4" /><circle cy="-6" r="4.5" /><circle cx="6" r="4.5" /><circle cy="6" r="4.5" /><circle cx="-6" r="4.5" /></g>
          <g transform="translate(546 187)"><circle r="4" /><circle cy="-6" r="4.5" /><circle cx="6" r="4.5" /><circle cy="6" r="4.5" /><circle cx="-6" r="4.5" /></g>
        </g>
      </svg>

      <Link to="/login" className="auth-brand" aria-label="Notely home">
        <span className="brand-mark">n.</span>
        <span className="brand-name">notely<span>.</span></span>
      </Link>
      <button
        className="auth-theme-toggle"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
        title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      >
        {theme === "dark" ? <MdLightMode /> : <MdDarkMode />}
        <span>{theme === "dark" ? "Light" : "Dark"}</span>
      </button>

      <div className="auth-story-content">
        <div className="auth-story-kicker">
          <MdLocalFlorist />
          <span>A little meadow for your mind</span>
        </div>
        <h1>
          Make room for
          <br />
          what <span>matters.</span>
        </h1>
        <p className="auth-story-description">
          Little reminders, big ideas, half-formed thoughts. Give them all a
          place to live.
        </p>

        <div className="auth-note-preview" aria-label="Example of a colorful note">
          <div className="preview-topline">
            <span className="preview-dot" />
            <span>JUST A THOUGHT</span>
            <MdOutlinePushPin />
          </div>
          <h2>Make something<br />you believe in.</h2>
          <p>Start small. Keep going. See where the idea takes you.</p>
          <div className="preview-bottom">
            <span><MdOutlineLightbulb /> an idea worth keeping</span>
            <span className="preview-spark">✳</span>
          </div>
        </div>

        <div className="auth-story-points">
          <span><MdCheck /> A home for every thought</span>
          <span><MdCheck /> Room to let ideas grow</span>
        </div>
      </div>

      <div className="auth-story-footer">
        <span>Small thoughts. Big possibilities.</span>
        <span className="auth-story-footer-mark"><MdArrowOutward /></span>
      </div>
    </aside>

    <section className="auth-panel">
      <div className="auth-panel-inner">{children}</div>
      <p className="auth-privacy-note">
        <span className="privacy-indicator" />
        A little more room for what matters.
      </p>
    </section>
  </main>
  );
};

export default AuthLayout;
