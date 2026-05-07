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
    <div className="
  bg-white/90 backdrop-blur-md
  sticky top-0 z-50
  border-b border-slate-100
  shadow-sm
">
  <div className="
    max-w-7xl mx-auto
    flex items-center justify-between
    gap-3
    px-4 sm:px-6 lg:px-8
    py-3
  ">

    {/* Logo */}
    <div
      className="flex items-center gap-2 cursor-pointer shrink-0 group"
      onClick={() => navigate("/dashboard")}
    >
      <div className="
        w-9 h-9 sm:w-10 sm:h-10
        flex items-center justify-center
        rounded-xl
        bg-blue-600
        text-white
        font-bold
        text-lg sm:text-xl
        shadow-md
        transition-transform
        group-hover:scale-105
      ">
        N
      </div>

      <h2 className="
        text-lg sm:text-2xl
        font-bold
        text-slate-800
        tracking-tight
        hidden xs:block
      ">
        Notes<span className="text-blue-600">App</span>
      </h2>
    </div>

    {/* Search */}
    <div className="
      flex-1
      min-w-0
      max-w-md lg:max-w-lg
    ">
      <SearchBar
        value={searchQuery}
        onChange={({ target }) => {
          setSearchQuery(target.value);
        }}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
      />
    </div>

    {/* User Section */}
    <div className="shrink-0">
      <ProfileInfo
        userInfo={userInfo}
        onLogout={onLogout}
      />
    </div>

  </div>
</div>
  );
};

export default Navbar;



/*     <div className="bg-white/90 backdrop-blur-md sticky top-0 z-50 flex items-center justify-between px-8 py-3 drop-shadow-sm border-b border-slate-100">
     
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

     
      <div className="flex items-center gap-4">
        <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
      </div>
    </div> */