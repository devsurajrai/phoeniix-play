import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toggleSidebar } from "../redux/slice/sideBarSlice";
import { selectToastData, setToastData } from "../redux/slice/toastSlice";
import { selectAuthInfo, setAuthToDefault } from "../redux/slice/authSlice";
import { logOut } from "../utils/utils.js";
const Header = () => {
  const dispatch = useDispatch();
  const toastData = useSelector(selectToastData);
  const { isUserLoggedIn } = useSelector(selectAuthInfo);
  const navigate = useNavigate();
  return (
    <div className="flex flex-row justify-between items-end pb-4 px-4 h-16  bg-[#334E68] text-white">
      <section className="flex flex-row  items-end">
        <button
          className="btn-sm-secondary border-none text-[2rem] px-4   rounded-sm hover:bg-[#334E68] hover:text-[#d9dde0]"
          onClick={() => dispatch(toggleSidebar())}
        >
          <i className="fa-solid fa-bars" />
        </button>
        <Link to="/">
          <h1 className="font-[roboto] font-black text-[1.5rem]  tracking-wide">
            PHOENIX <sub>PLAY</sub>
          </h1>
        </Link>
      </section>
      <section className="flex gap-5">
        <Link to="/build-components">
          <button className="btn-sm-secondary">Build Components</button>
        </Link>
        {!isUserLoggedIn ? (
          <>
            <Link to="/login">
              <button className="btn-sm-secondary">Login</button>
            </Link>
            <Link to="/signup">
              <button className="btn-sm-primary">Signup</button>
            </Link>
          </>
        ) : (
          <button
            className="btn-sm-primary"
            onClick={() =>
              logOut(
                navigate,
                dispatch,
                setAuthToDefault,
                setToastData,
                toastData
              )
            }
          >
            Logout
          </button>
        )}
      </section>
    </div>
  );
};

export { Header };
