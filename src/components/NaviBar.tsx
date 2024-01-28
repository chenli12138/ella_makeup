import React, { useState } from "react";
import logo from "../assets/logo-transparent-png.png";
import { NavLink, useMatch, useResolvedPath } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi"; // Import icons for menu and close
import { Link } from "react-router-dom";

const NaviBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      // When opening the menu
      document.body.style.overflow = "hidden";
    } else {
      // When closing the menu
      document.body.style.overflow = "auto";
    }
  };
  const getNavLinkClass = (path: string) => {
    const resolved = useResolvedPath(path);
    const match = useMatch({ path: resolved.pathname, end: true });

    return match
      ? "text-center text-gray-800 font-bold w-full text-2xl relative after:content-[''] after:block after:w-full after:h-[2px] after:bg-black after:absolute after:top-0 after:left-0 hover:font-bold mx-2"
      : "text-center text-gray-500 font-thin w-full text-2xl relative after:content-[''] after:block after:w-0 after:h-[2px] after:bg-black after:absolute after:top-0 after:left-0 hover:font-bold hover:after:w-full transition-all duration-300";
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bg-white sm:relative flex sm:items-center justify-center h-[10vh] sm:h-[15vh] sm:min-h-[10rem] z-40">
        <div className="h-[10vh] ">
          <Link to="/">
            <img
              src={logo}
              alt="Ella Makeup, Sydney Best asian wedding makeup artist"
              className="max-h-full  min-h-[3rem] cursor-pointer"
            />
          </Link>
        </div>
        <div
          className="sm:hidden absolute top-[4vh] left-4"
          onClick={toggleMenu}
        >
          <div className="relative bg-white">
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
          className={`sm:hidden fixed inset-0 top-[10vh] z-30 left-0 bg-white transition-all duration-700 ease-in-out ${
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
      </div>

      {/* Existing Navigation Links for larger screens */}
      <div className="bg-white sm:flex justify-between h-[5vh] mx-8 hidden font-play">
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
      </div>
    </>
  );
};

export default NaviBar;
