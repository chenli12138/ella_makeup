import React, { useState, useEffect } from "react";
import logo from "../assets/logo-transparent-png.png";
import { NavLink, useMatch, useResolvedPath } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi"; // Import icons for menu and close
import { Link } from "react-router-dom";

const NaviBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const getNavLinkClass = (path: string) => {
    const resolvedHome = useResolvedPath("/");
    const matchHome = useMatch({ path: resolvedHome.pathname, end: true });

    const resolvedPath = useResolvedPath(path);
    const matchPath = useMatch({ path: resolvedPath.pathname, end: true });

    // Base styles
    let baseStyle = "text-center font-thin w-full text-lg lg:text-2xl";

    // Style for active link
    let activeStyle = "font-normal underline underline-offset-8";

    // When on the home page, make all links white
    if (matchHome) {
      return `${baseStyle} text-white ${matchPath ? activeStyle : ""}`;
    }

    // When on other pages, make the active link black and others gray
    return `${baseStyle} ${
      matchPath ? `text-black ${activeStyle}` : "text-gray-600"
    }`;
  };

  return (
    <>
      <div className="absolute top-0 left-0 right-0 flex items-center justify-center md:justify-around h-[10vh] sm:min-h-[10rem] z-40 md:mx-4 lg:mx-16 w-screen">
        <div className="h-[10vh] md:h-[9vh] md:hidden ">
          <Link to="/">
            <img
              src={logo}
              alt="Ella Makeup, Sydney Best asian wedding makeup artist"
              className="max-h-full  min-h-[3rem] cursor-pointer"
            />
          </Link>
        </div>
        <div className="hidden md:block text-center text-white">
          <span className="text-3xl">ELLA MAKEUP</span>
          <p className="text-[10px] italic">ASIAN BRIDAL MAKEUP SYDNEY</p>
        </div>
        <div className="md:flex justify-between hidden whitespace-nowrap gap-6">
          <NavLink to="/" className={getNavLinkClass("/")}>
            BRIDAL
          </NavLink>
          <NavLink to="/contact" className={getNavLinkClass("/contact")}>
            CONTACT
          </NavLink>
          <NavLink to="/about-us" className={getNavLinkClass("/about-us")}>
            ABOUT US
          </NavLink>
          <NavLink to="/price" className={getNavLinkClass("/price")}>
            PRICING
          </NavLink>
        </div>
        <div
          className="md:hidden absolute sm:top-[6vh] top-[4vh] left-4"
          onClick={toggleMenu}
        >
          <div className="relative bg-white cursor-pointer">
            <HiMenu
              size={24}
              className={`absolute top-0 transition-all duration-500 ease-in-out transform ${
                isMenuOpen
                  ? "opacity-0 rotate-[-45deg]"
                  : "opacity-100 rotate-0"
              }`}
            />
            <HiX
              size={24}
              className={`absolute top-0 transition-all duration-500 ease-in-out transform ${
                isMenuOpen ? "opacity-100 rotate-45deg" : "opacity-0 rotate-0"
              }`}
            />
          </div>
        </div>
      </div>

      <div>
        <div
          className={`md:hidden fixed inset-0 z-30 left-0 bg-white transition-all duration-700 ease-in-out ${
            isMenuOpen ? "opacity-100 h-screen" : "opacity-0 h-0"
          }`}
        >
          <div
            className={`flex flex-col items-center justify-center  gap-6 ${
              isMenuOpen ? "h-[80vh]" : " h-0"
            }`}
          >
            <NavLink
              to="/"
              className="cursor-pointer hover:scale-125 transition ease-in-out duration-300"
              onClick={toggleMenu}
            >
              BRIDAL
            </NavLink>
            <NavLink
              to="/contact"
              className="cursor-pointer hover:scale-125 transition ease-in-out duration-300"
              onClick={toggleMenu}
            >
              CONTACT
            </NavLink>
            <NavLink
              to="/about-us"
              className="cursor-pointer hover:scale-125 transition ease-in-out duration-300"
              onClick={toggleMenu}
            >
              ABOUT US
            </NavLink>
            <NavLink
              to="/price"
              className="cursor-pointer hover:scale-125 transition ease-in-out duration-300"
              onClick={toggleMenu}
            >
              SERVICE & PRICING
            </NavLink>
          </div>
        </div>

        {/* Existing Navigation Links for larger screens
        <div className="sm:flex justify-between h-[5vh] mx-8 hidden">
          <NavLink to="/" className={getNavLinkClass("/")}>
            Bridal
          </NavLink>
          <NavLink to="/contact" className={getNavLinkClass("/contact")}>
            Contact
          </NavLink>
          <NavLink to="/about-us" className={getNavLinkClass("/about-us")}>
            About Us
          </NavLink>
          <NavLink to="/price" className={getNavLinkClass("/price")}>
            Services & Pricing
          </NavLink>
        </div> */}
      </div>
    </>
  );
};

export default NaviBar;
