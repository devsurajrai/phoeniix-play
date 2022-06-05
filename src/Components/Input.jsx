/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/interactive-supports-focus */
const Input = ({
  placeholder,
  password,
  type,
  required,
  callback,
  setPassTypeHandler,
}) => {
  return (
    <label className="flex items-center border-2 border-[#27AB83]   px-5 w-full ">
      <input
        className="w-full form-input"
        type={type}
        placeholder={placeholder}
        required={required}
        onBlur={(e) => callback(e)}
      />
      {password && (
        <i
          className="fa-solid fa-eye"
          onClick={() => setPassTypeHandler()}
          role="button"
        />
      )}
    </label>
  );
};

export { Input };
