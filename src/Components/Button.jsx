const Button = ({ type, buttonText, callback }) => {
  return (
    <button
      className={`btn-sm-${type} w-3/4 h-11 ${
        type === "primary" && "text-white"
      }`}
      onClick={(e) => callback(e)}
    >
      {buttonText}
    </button>
  );
};

export { Button };
