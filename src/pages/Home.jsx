import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex justify-center items-center h-[calc(100vh-5rem)] bg-[#F0F4F8]">
      <section className=" antialiased flex flex-col gap-5 items-center">
        <h1 className="font-[roboto] font-black text-[3rem] ">
          Welcome To Phoenix Video Library
        </h1>
        <p className="font-[roboto] font-black text-[1.5rem] ">
          We provide you all the content to watch and learn Badminton.
        </p>
        <Link to="/videos">
          <button className="btn-md-primary">GET STARTED</button>
        </Link>
      </section>
    </div>
  );
};

export { Home };
