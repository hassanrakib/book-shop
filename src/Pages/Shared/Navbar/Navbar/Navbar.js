import logo from "../../../../icons/logo.png";
import cartIcon from "../../../../icons/shopping-cart-3.png";

import { Link, NavLink, useLocation } from "react-router-dom";
import LoginBtn from "../LoginBtn/LoginBtn";
import useCart from "../../../../hooks/useCart";

export default function Navbar() {
  const navItems = [
    { id: 1, text: "Home", link: "/" },
    { id: 2, text: "Orders", link: "/orders" },
    { id: 3, text: "Admin", link: "/admin" },
  ];

  // get the total product price through useCart hook
  const { total } = useCart();

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
            {/* checkout link with icon */}
            <li>
              <NavLink to="/checkout" className="block relative p-1">
                <img src={cartIcon} className="h-9 w-9" alt="cart-icon" />
                {/* show the total product price on top of the cart icon*/}
                <div className="absolute bg-blue-custom text-sm bottom-2/4 left-2/4 rounded-full p-1 text-slate-100">
                  ${total}
                </div>
              </NavLink>
            </li>
            {/* renders login button or avatar */}
            <LoginBtn />
          </ul>
        )}
      </div>
    </nav>
  );
}
