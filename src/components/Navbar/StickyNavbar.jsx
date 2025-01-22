import React, { useContext, useEffect, useState, useRef } from "react";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";

export function StickyNavbar() {
  const [openNav, setOpenNav] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const profileImageRef = useRef(null);

  const { user, logOut } = useContext(AuthContext);

  //  Dropdown into image
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        profileImageRef.current &&
        !profileImageRef.current.contains(event.target)
      ) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle click on profile image to toggle dropdown
  const handleProfileClick = () => {
    setIsDropdownVisible((prev) => !prev);
  };

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <NavLink to="/" className="flex items-center">
          Home
        </NavLink>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          Donation Request
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          Blog
        </a>
      </Typography>
      {user ? (
        <>
          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-normal"
          >
            <a href="#" className="flex items-center">
              Search
            </a>
          </Typography>
          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-normal"
          >
            <a href="#" className="flex items-center">
              Funding
            </a>
          </Typography>
        </>
      ) : (
        ""
      )}
    </ul>
  );

  return (
    <div className="w-[1320px] mx-auto">
      <Navbar className="sticky top-0 z-50 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography
            as="a"
            href="#"
            className="mr-4 cursor-pointer py-1.5 font-medium"
          >
            Blood Bank
          </Typography>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            <div className="flex items-center gap-x-1">
              {user ? (
                <div className="relative inline-block">
                  {/* User Profile Image */}
                  <div className="border-red-300 border-2 hover:opacity-50 rounded-full">
                    <img
                      ref={profileImageRef}
                      src={user?.photoURL}
                      alt="User Profile"
                      className="w-10 h-10 rounded-full cursor-pointer  transition"
                      onClick={handleProfileClick}
                    />
                  </div>

                  {/* Dropdown Menu */}
                  {isDropdownVisible && (
                    <div
                      ref={dropdownRef}
                      className="absolute right-0 mt-2 w-40 bg-gray-200 border border-gray-500 shadow-2xl rounded-lg opacity-100 pointer-events-auto z-10 transition-all duration-300"
                    >
                      <Link to="/dashboard">
                        <button className="block w-full px-4 py-2 text-left text-gray-700 font-medium text-md hover:bg-green-200 rounded-t-lg">
                          Dashboard
                        </button>
                      </Link>
                      <button
                        onClick={logOut}
                        className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-red-300 font-bold text-md hover:text-white rounded-b-lg"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login">
                  <Button
                    variant="gradient"
                    size="sm"
                    className="hidden bg-red-500 lg:inline-block"
                  >
                    <span>Log In</span>
                  </Button>
                </Link>
              )}
            </div>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <Collapse open={openNav}>{navList}</Collapse>
      </Navbar>
    </div>
  );
}
