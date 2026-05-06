import { useState } from "react";
import ProfileInfo from "../Cards/ProfileInfo";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../SearchBar/SearchBar";

const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery);
    }
  };

  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch();
  };

  return (
    <div className="bg-white/90 backdrop-blur-md sticky top-0 z-50 flex items-center justify-between px-8 py-3 drop-shadow-sm border-b border-slate-100">
      {/* Branding/Logo Section */}
      <div 
        className="flex items-center gap-3 cursor-pointer group" 
        onClick={() => navigate("/dashboard")}
      >
        <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-blue-600 text-white font-bold text-xl shadow-md transition-transform group-hover:scale-105">
          N
        </div>
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight hidden sm:block">
          Notes<span className="text-blue-600">App</span>
        </h2>
      </div>

      {/* Search Section - Centered and Constrained */}
      <div className="flex-1 max-w-lg mx-6">
        <SearchBar
          value={searchQuery}
          onChange={({ target }) => {
            setSearchQuery(target.value);
          }}
          handleSearch={handleSearch}
          onClearSearch={onClearSearch}
        />
      </div>

      {/* User Actions Section */}
      <div className="flex items-center gap-4">
        <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
      </div>
    </div>
  );
};

export default Navbar;