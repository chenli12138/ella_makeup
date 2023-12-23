import logo from "../assets/logo-transparent-png.png"; // make sure the path to your logo is correct

const NaviBar = () => {
  return (
    <>
      {/* Logo container */}
      <div className=" bg-white flex items-center justify-center h-[10vh] min-h-[20rem]">
        <img src={logo} alt="Logo" className="max-h-full" />
      </div>

      {/* Navigation links container */}
      <div className=" bg-white flex justify-between h-[5vh] mx-8">
        <a
          href="/bridal"
          className="text-center text-gray-800 font-thin w-1/4 text-2xl hover:animate-pulse"
        >
          Bridal
        </a>
        <a
          href="/contact"
          className=" text-center text-gray-800 font-thin w-1/4 text-2xl hover:underline"
        >
          Contact
        </a>
        <a
          href="/join-us"
          className="text-center text-gray-800 font-thin w-1/4 text-2xl hover:underline "
        >
          Join Us
        </a>
      </div>
    </>
  );
};

export default NaviBar;
