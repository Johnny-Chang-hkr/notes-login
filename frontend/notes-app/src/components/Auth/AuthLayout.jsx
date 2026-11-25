import { Link } from "react-router-dom";
import {
  MdArrowOutward,
  MdCheck,
  MdDarkMode,
  MdLightMode,
  MdOutlineLightbulb,
  MdOutlineNotes,
  MdOutlinePushPin,
} from "react-icons/md";
import { useTheme } from "../Theme/ThemeContext";

const AuthLayout = ({ variant, children }) => {
  const { theme, toggleTheme } = useTheme();

    return (
      <main className={`auth-layout auth-layout--${variant}`}>
        <aside className="auth-story">
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
            <MdOutlineNotes />
            <span>A clear space for your ideas</span>
          </div>
          <h1>
            Make space for
            <br />
            what <span>matters.</span>
          </h1>
          <p className="auth-story-description">
            Keep the small details and big ideas that deserve a place of their own.
          </p>

          <div className="auth-note-preview" aria-label="Example note">
            <div className="preview-topline">
              <span className="preview-dot" />
              <span>IN YOUR NOTES</span>
              <MdOutlinePushPin />
            </div>
            <h2>Make time for<br />the good ideas.</h2>
            <p>A considered space for plans, reminders, and everything in between.</p>
            <div className="preview-bottom">
              <span><MdOutlineLightbulb /> saved for later</span>
              <span className="preview-spark">↗</span>
            </div>
          </div>

          <div className="auth-story-points">
            <span><MdCheck /> Capture ideas quickly</span>
            <span><MdCheck /> Find them when you need them</span>
          </div>
        </div>

        <div className="auth-story-footer">
          <span>A little more room to think.</span>
          <span className="auth-story-footer-mark"><MdArrowOutward /></span>
        </div>
        </aside>

        <section className="auth-panel">
        <div className="auth-panel-inner">{children}</div>
        <p className="auth-privacy-note">
          <span className="privacy-indicator" />
          Your notes, all in one place.
        </p>
        </section>
      </main>
    );
};

export default AuthLayout;
