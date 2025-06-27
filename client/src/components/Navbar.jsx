import { BiMoon, BiSun } from "react-icons/bi";
import { Link, NavLink } from "react-router-dom";
import useTheme, { themItem } from "../hooks/useTheme";
import useAuth from "../hooks/useAuth";
import ProfileDropDown from "./ProfileDropDown";

const Navbar = () => {
  const { handleToggleTheme, theme } = useTheme();
  const { user, logoutUser } = useAuth();

  const handleLogout = async () => {
    await logoutUser();
  };

  const navItems = (
    <>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "border-b border-purple-600" : ""
          }
          to={"/"}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "border-b border-purple-600" : ""
          }
          to={"/tasks"}
        >
          Tasks
        </NavLink>
      </li>
    </>
  );

  return (
    <>
      <div className="navbar bg-base-100 dark:bg-black px-4 sm:px-8 shadow-md dark:border-b dark:border-purple-600">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {navItems}
            </ul>
          </div>
          <Link
            to={"/"}
            className="btn btn-ghost text-2xl gap-0 dark:text-white"
          >
            To<span className="font-bold text-purple-600">Do</span>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 dark:gap-1 dark:text-white">
            {navItems}
          </ul>
        </div>

        <div className="navbar-end">
          <div className="flex items-center justify-center gap-2">
            <button
              className="text-2xl dark:text-white"
              onClick={handleToggleTheme}
            >
              {theme === themItem.Light ? <BiMoon /> : <BiSun />}
            </button>
            {!user && (
              <Link to={"/login"} className="btn">
                Login
              </Link>
            )}

            {user && (
              <ProfileDropDown handleLogout={handleLogout} user={user} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
