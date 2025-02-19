import { Link } from "react-router-dom";
import bannerImg from "../../../assets/Banner-Home.jpg";

const Header = () => {
  return (
    <header
      className="relative w-full h-[800px] bg-cover bg-center bg-no-repeat bg-fixed flex items-center justify-center"
      style={{
        backgroundImage: `url(${bannerImg})`,
      }}
    >
      {/* Dark Overlay for Better Contrast */}
      <div className="absolute inset-0 bg-black bg-opacity-5 backdrop-blur-[4px]"></div>

      {/* Content Container */}
      <div className="relative z-10 max-w-[1200px] px-6 text-center text-white">
        <h2 className="text-4xl font-extrabold text-red-600 lg:text-6xl drop-shadow-md">
          Be a <span >Hero</span>: Donate Blood, Save Lives
        </h2>

        <p className="mt-4 text-base text-gray-900 sm:text-lg lg:text-xl font-medium drop-shadow-md">
          Every drop counts. Join our mission to connect life-saving donors with those in need.
          Together, we can make a lasting impact and save countless lives.
        </p>

        {/* Button Section */}
        <div className="flex flex-col items-center justify-center mt-8 space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6">
          <Link
            to="/register"
            className="px-6 py-3 text-lg font-semibold text-white bg-red-600 rounded-lg shadow-lg transition duration-300 hover:bg-red-800"
          >
            Join as a Donor
          </Link>
          <Link
            to="/search"
            className="px-6 py-3 text-lg font-semibold text-white bg-gray-700 rounded-lg shadow-lg transition duration-300 hover:bg-gray-900"
          >
            Search Donors
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
