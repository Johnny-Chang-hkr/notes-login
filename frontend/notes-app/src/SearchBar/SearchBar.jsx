import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const SearchBar = ({ value, onChange, onClearSearch, inputRef }) => (
  <div className="search-field">
    <FaMagnifyingGlass className="search-icon" aria-hidden="true" />
    <input
      type="search"
      placeholder="Search your notes..."
      aria-label="Search your notes"
      ref={inputRef}
      value={value}
      onChange={onChange}
    />
    {value && (
      <button
        type="button"
        className="clear-search"
        onClick={onClearSearch}
        aria-label="Clear search"
      >
        <IoMdClose />
      </button>
    )}
    <kbd>Ctrl K</kbd>
  </div>
);

export default SearchBar;
