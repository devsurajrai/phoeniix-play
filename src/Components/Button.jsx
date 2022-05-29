const Button = ({ btnType, buttonText, callback, type }) => {
  return (
    <button
      className={`btn-sm-${btnType} w-3/4 h-11 ${
        btnType === "primary" && "text-white cursor-pointer"
      }`}
      onClick={(e) => callback(e)}
      type={type}
    >
      {buttonText}
    </button>
  );
};

export { Button };
