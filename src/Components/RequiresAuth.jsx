import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { selectAuthInfo } from "../redux/slice/authSlice";

const RequiresAuth = ({ children }) => {
  const { isUserLoggedIn } = useSelector(selectAuthInfo);
  const location = useLocation();
  return isUserLoggedIn ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location.pathname }} />
  );
};

export { RequiresAuth };
