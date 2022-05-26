import React from "react";

const Input = ({ placeholder, password }) => {
  return (
    <label className="flex items-center border-2 border-[#27AB83]   px-5 w-full ">
      <input
        className="w-full form-input"
        type={password ? "password" : "text"}
        placeholder={placeholder}
      />
      {password && <i className="fa-solid fa-eye" />}

      {/* <i className="fa-solid fa-eye-slash" /> */}
    </label>
  );
};

export { Input };
