import { Link, NavLink } from "react-router-dom";
import logo from "../../../icons/logo.png";
import grid from "../../../icons/grid.png";
import plus from "../../../icons/plus.png";
import edit from "../../../icons/edit.png";

export default function Drawer() {
  const drawerItems = [
    {
      id: 1,
      text: "Manage Books",
      icon: grid,
      link: "/dashboard/manage-books",
    },
    { id: 2, text: "Add Book", icon: plus, link: "/dashboard/add-book" },
    { id: 3, text: "Edit Book", icon: edit, link: "/dashboard/edit-book" },
  ];
  return (
    <div className="bg-indigo-900 text-white fixed top-0 left-0 bottom-0 w-72 pt-8 space-y-5">
        {/* logo */}
        <div className="w-44 mx-auto">
          <Link to="/">
            <img
              src={logo}
              alt="book-shop-logo"
              className="brightness-0 invert"
            />
          </Link>
        </div>

        {/* navigation links in drawer*/}
        <ul>
          {drawerItems.map((drawerItem) => (
            <li key={drawerItem.id}>
              <NavLink to={drawerItem.link} className="border-2 flex h-14 items-center justify-center">
                <span className="block w-11">
                  <img
                    src={drawerItem.icon}
                    alt="icon"
                    className="h-7 w-7 mx-auto"
                  />
                </span>
                <span className="block text-lg">{drawerItem.text}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
  );
}
