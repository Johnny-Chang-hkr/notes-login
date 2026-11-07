import { useNavigate } from "react-router-dom";
import { MdDarkMode, MdLightMode, MdLogout } from "react-icons/md";
import ProfileInfo from "../Cards/ProfileInfo";
import SearchBar from "../../SearchBar/SearchBar";
import { useTheme } from "../Theme/ThemeContext";

const Navbar = ({
  userInfo,
  searchQuery,
  searchInputRef,
  onSearchNote,
  handleClearSearch,
}) => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const onLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="topbar">
      <button
        className="brand"
        onClick={() => navigate("/dashboard")}
        aria-label="Go to your notes"
      >
        <span className="brand-mark">n.</span>
        <span className="brand-name">notely<span>.</span></span>
      </button>
      <div className="topbar-search">
        <SearchBar
          value={searchQuery}
          inputRef={searchInputRef}
          onChange={(event) => onSearchNote(event.target.value)}
          handleSearch={() => {}}
          onClearSearch={handleClearSearch}
        />
      </div>
      <div className="topbar-user">
        <ProfileInfo userInfo={userInfo} />
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
        >
          {theme === "dark" ? <MdLightMode /> : <MdDarkMode />}
        </button>
        <button className="logout-button" onClick={onLogout} aria-label="Log out" title="Log out">
          <MdLogout />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
