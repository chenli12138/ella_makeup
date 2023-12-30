import logo from "../assets/logo-transparent-png.png"; // make sure the path to your logo is correct
import { NavLink } from "react-router-dom";
const NaviBar: React.FC = () => {
  return (
    <>
      {/* Logo container */}
      <div className=" bg-white flex items-center justify-center h-[10vh] min-h-[20rem]">
        <img src={logo} alt="Logo" className="max-h-full" />
      </div>

      {/* Navigation links container */}
      <div className=" bg-white flex justify-between h-[5vh] mx-8">
        <NavLink
          to="/"
          className="text-center text-gray-800 font-thin w-1/4 text-2xl hover:animate-pulse"
        >
          Bridal
        </NavLink>
        <NavLink
          to="/contact"
          className=" text-center text-gray-800 font-thin w-1/4 text-2xl hover:underline"
        >
          Contact
        </NavLink>
        <NavLink
          to="/join-us"
          className="text-center text-gray-800 font-thin w-1/4 text-2xl hover:underline "
        >
          Join Us
        </NavLink>
      </div>
    </>
  );
};

export default NaviBar;
