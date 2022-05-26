import { Input, Button } from "./components.js";

const LoginMain = () => {
  return (
    <div className="h-[calc(100vh-4rem)] w-screen  flex flex-col justify-center  items-center">
      <h2 className="text-4xl p-3 font-bold tracking-wider">Login</h2>
      <form className="px-20 pt-14 pb-10 flex flex-col justify-between items-center gap-5 bg-white  w-[40vw] h-3/5 shadow-2xl">
        <Input placeholder="Enter Email" />
        <Input placeholder="Enter Password" password />
        <div className="flex flex-col items-center w-full gap-5">
          <Button type="primary" buttonText="Login" />
          <Button type="secondary" buttonText="Login As Guest " />
        </div>
      </form>
    </div>
  );
};

export { LoginMain };
