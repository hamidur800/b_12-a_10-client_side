import React from "react";
import { Link, NavLink } from "react-router";
import ThemeToggle from "../../ThemeToggle";

const Header = () => {
  return (
    <>
      <div className="w-11/12 mx-auto">
        <div className="navbar">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />{" "}
                </svg>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <NavLink className="transition" to="Home">
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink className="transition" to="AllProperties">
                    All Properties
                  </NavLink>
                </li>
                <li>
                  <NavLink className="transition" to="AddProperties">
                    Add Properties
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="MyProperties"
                    className={({ isActive }) =>
                      `relative transition duration-300 pb-1 ${
                        isActive ? "active-link" : "hover-link"
                      }`
                    }
                  >
                    My Properties
                  </NavLink>
                </li>
                <li>
                  <NavLink className="transition" to="MyRatings">
                    My Ratings
                  </NavLink>
                </li>
              </ul>
            </div>
            <Link
              className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-rose-400 via-fuchsia-400 to-sky-400 bg-clip-text text-transparent drop-shadow-md"
              to="Home"
            >
              HOME-NEST
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li>
                <NavLink className="transition" to="Home">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink className="transition" to="AllProperties">
                  All Properties
                </NavLink>
              </li>
              <li>
                <NavLink className="transition" to="AddProperties">
                  Add Properties
                </NavLink>
              </li>
              <li>
                <NavLink className="transition" to="MyProperties">
                  My Properties
                </NavLink>
              </li>
              <li>
                <NavLink className="transition" to="MyRatings">
                  My Ratings
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="navbar-end">
            <div className="">
              <ThemeToggle />
            </div>
            <a className="btn ml-2">Button</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
