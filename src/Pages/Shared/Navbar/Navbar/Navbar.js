import logo from "../../../../icons/logo.png";

import { Link, useLocation } from "react-router-dom";
import LoginBtn from "../LoginBtn/LoginBtn";

export default function Navbar() {
  const navItems = [
    { id: 1, text: "Home", link: "/" },
    { id: 2, text: "Orders", link: "/orders" },
    { id: 3, text: "Admin", link: "/admin" },
    { id: 4, text: "Checkout", link: "/checkout" },
  ];

  // location
  const pathname = useLocation().pathname;

  return (
    <nav className="flex justify-between items-center p-4 shadow-sm">
      {/* book shop logo */}
      <div>
        <Link to="./">
          <img
            className="drop-shadow-sm h-9 w-auto"
            src={logo}
            alt="book-shop-logo"
          />
        </Link>
      </div>
      {/* book shop top nav links */}
      <div className="basis-96">
        {pathname === "/login" || pathname === "/create-account" ? null : (
          <ul className="flex justify-between items-center">
            {navItems.map((navItem) => (
              <li className="text-slate-600" key={navItem.id.toString()}>
                <Link to={navItem.link}>{navItem.text}</Link>
              </li>
            ))}
            {/* renders login button or avatar */}
            <LoginBtn />
          </ul>
        )}
      </div>
    </nav>
  );
}
