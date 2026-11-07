import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const PasswordInput = ({
  id,
  name,
  value,
  onChange,
  placeholder = "Password",
  autoComplete,
  required = false,
  "aria-invalid": ariaInvalid,
  "aria-describedby": ariaDescribedby,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className={`password-input-wrap ${ariaInvalid ? "has-error" : ""}`}>
      <input
        id={id}
        name={name}
        type={isVisible ? "text" : "password"}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-invalid={ariaInvalid}
        aria-describedby={ariaDescribedby}
        required={required}
      />
      <button
        className="password-visibility"
        type="button"
        onClick={() => setIsVisible((visible) => !visible)}
        aria-label={isVisible ? "Hide password" : "Show password"}
        aria-pressed={isVisible}
      >
        {isVisible ? <FaRegEyeSlash aria-hidden="true" /> : <FaRegEye aria-hidden="true" />}
      </button>
    </div>
  );
};

export default PasswordInput;
