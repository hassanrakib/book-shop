import useAuth from "../../../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../Loading/Loading";

export default function RequireAuth({ children }) {
  const { user, isLoading } = useAuth();

  // get the current location
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loading className="h-24 w-24" />
      </div>
    );
  }

  // if user not signed in, send the user to the login page by preserving the location where the user wanted to go
  // location preserving done by the state prop of Navigate component
  // the login page will get the location in location.state

  // add replace to navigate
  if (!user.email) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
}
