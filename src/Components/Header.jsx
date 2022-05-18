import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex flex-row justify-between items-end pb-4 px-4 h-16  bg-[#334E68] text-white">
      <section>
        <Link to="/home">
          <h1 className="font-[roboto] font-black text-[1.5rem]  tracking-wide">
            PHOENIX <sub>PLAY</sub>
          </h1>
        </Link>
      </section>
      <section className="flex gap-5">
        <Link to="/login">
          <button className="btn-sm-secondary">Login</button>
        </Link>
        <Link to="/signup">
          <button className="btn-sm-primary">Signup</button>
        </Link>
      </section>
    </div>
  );
};

export { Header };
