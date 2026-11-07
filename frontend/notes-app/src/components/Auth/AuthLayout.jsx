import { Link } from "react-router-dom";
import {
  MdArrowOutward,
  MdAutoAwesome,
  MdCheck,
  MdDarkMode,
  MdLightMode,
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
          <MdAutoAwesome />
          <span>A softer place to land your ideas</span>
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
          <span><MdCheck /> A space organized around you</span>
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
