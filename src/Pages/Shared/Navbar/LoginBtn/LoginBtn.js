import useAuth from "../../../../hooks/useAuth";
import avatar from "../../../../icons/avatar.png";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loading from "../../Loading/Loading";

export default function LoginBtn() {
  const location = useLocation();
  const navigate = useNavigate();

  //   get the user from the context
  const { user, isLoading, signOutTheUser } = useAuth();

  // functionality to close the dropdown on avatar
  const [isDropdownActive, setIsDropdownActive] = useState(false);

  const dropdown = useRef();

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (
        isDropdownActive &&
        dropdown.current &&
        !dropdown.current.contains(e.target)
      ) {
        setIsDropdownActive(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);

    // remove event listener when the component is unmounted
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isDropdownActive]);

  return (
    <li>
      {user.email ? (
        // dropdown with avatar (container)
        <div ref={dropdown} className="relative">
          <button
            className="p-0.5 rounded-full bg-slate-300 outline-none"
            onClick={() => setIsDropdownActive((oldState) => !oldState)}
          >
            <img
              src={user.photoURL ? user.photoURL : avatar}
              className="h-9 w-9 rounded-full hover:scale-95 transition-transform"
              alt="avatar"
            />
          </button>
          {/* dropdown content */}
          {isDropdownActive && (
            <div className="absolute bg-white right-0 shadow rounded-md z-10">
              {[
                { to: "#", text: "Profile" },
                { to: "#", text: "Dashboard" },
              ].map((link) => {
                return (
                  <Link
                    key={Math.random().toString()}
                    className="block first:rounded-t-md py-2 px-4 hover:bg-slate-50"
                    to={link.to}
                  >
                    {link.text}
                  </Link>
                );
              })}
              {/* logout button */}
              <button
                onClick={signOutTheUser}
                className="block w-full text-left py-2 px-4 hover:bg-slate-50"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <div>
          {isLoading ? (
            <Loading className="w-10 h-auto" />
          ) : (
            <button
              onClick={() => navigate("/login", { state: location.pathname })}
              className="rounded bg-slate-100 text-blue-custom px-5 py-2 hover:bg-white focus:outline-none ring-1 ring-blue-custom shadow"
            >
              Login
            </button>
          )}
        </div>
      )}
    </li>
  );
}
