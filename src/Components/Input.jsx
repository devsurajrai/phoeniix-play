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

      {/* This icon will be visible when user is clicked on eye icon to show the pass  */}
      {/* <i className="fa-solid fa-eye-slash" /> */}
    </label>
  );
};

export { Input };
