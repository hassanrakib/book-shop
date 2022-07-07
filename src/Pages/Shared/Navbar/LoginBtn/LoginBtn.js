import useAuth from "../../../../hooks/useAuth";
import avatar from "../../../../icons/avatar.png";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function LoginBtn() {

  const location = useLocation();
  const navigate = useNavigate();

  //   get the user from the context
  const { user, signOutTheUser } = useAuth();

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
            className="p-px rounded-full bg-blue-200 outline-none"
            onClick={() => setIsDropdownActive((oldState) => !oldState)}
          >
            <img
              src={avatar}
              className="h-10 w-auto hover:scale-95 transition-transform"
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
                    className="block py-2 px-4 hover:bg-slate-50"
                    to={link.to}
                  >
                    {link.text}
                  </Link>
                );
              })}
              {/* logout button */}
              <button
                onClick={signOutTheUser}
                className="block py-2 px-4 hover:bg-slate-50"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <button onClick={() => navigate('/login', {state: location.pathname})} className="rounded bg-blue-custom text-white px-5 py-2 hover:bg-violet-500 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-100 shadow-md">
          Login
        </button>
      )}
    </li>
  );
}
