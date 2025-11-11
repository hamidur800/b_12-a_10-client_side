import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router";
import ThemeToggle from "../../ThemeToggle";
import { AuthContext } from "../../provider/AuthProvider";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  const activeColor =
    "bg-gradient-to-r from-rose-400 via-fuchsia-400 to-sky-400 bg-clip-text text-transparent text-lg";
  const hoverColor =
    "hover:bg-gradient-to-r hover:from-violet-500 hover:via-blue-500 hover:to-cyan-500 hover:bg-clip-text hover:text-transparent";

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
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-100 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? activeColor : ` text-lg  ${hoverColor}`
                    }
                    to="Home"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? activeColor : ` text-lg ${hoverColor}`
                    }
                    to="AllProperties"
                  >
                    All Properties
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? activeColor : ` text-lg ${hoverColor}`
                    }
                    to="AddProperties"
                  >
                    Add Properties
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? activeColor : ` text-lg ${hoverColor}`
                    }
                    to="MyProperties"
                  >
                    My Properties
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? activeColor : ` text-lg ${hoverColor}`
                    }
                    to="MyRatings"
                  >
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
                <NavLink
                  className={({ isActive }) =>
                    isActive ? activeColor : ` text-lg ${hoverColor}`
                  }
                  to="Home"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? activeColor : ` text-lg ${hoverColor}`
                  }
                  to="AllProperties"
                >
                  All Properties
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? activeColor : ` text-lg ${hoverColor}`
                  }
                  to="AddProperties"
                >
                  Add Properties
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? activeColor : ` text-lg ${hoverColor}`
                  }
                  to="MyProperties"
                >
                  My Properties
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? activeColor : ` text-lg ${hoverColor}`
                  }
                  to="MyRatings"
                >
                  My Ratings
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="navbar-end">
            <div className="mr-2">
              <ThemeToggle />
            </div>
            {user ? (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full border border-blue-600">
                    <img src={user?.photoURL} />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[999] mt-3 w-52 p-2 shadow"
                >
                  <li className="px-3 py-2 font-semibold">
                    {user?.displayName}
                  </li>
                  <li>
                    <button
                      onClick={logOut}
                      className="flex justify-center items-center font-medium text-red-500"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/Login" className="btn btn-sm btn-primary ml-4">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
