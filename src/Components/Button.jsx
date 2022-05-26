const Button = ({ type, buttonText }) => {
  return (
    <button
      className={`btn-sm-${type} w-3/4 h-11 ${
        type === "primary" && "text-white"
      }`}
    >
      {buttonText}
    </button>
  );
};

export { Button };
