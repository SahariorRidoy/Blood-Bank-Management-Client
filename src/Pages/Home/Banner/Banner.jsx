import { Link } from 'react-router-dom';
import bannerImg from "../../../assets/banner-high.jpg"
const Header = () => {
  return (
    <header className="bg-red-50 dark:bg-gray-900 md:mt-20">
    <div className="lg:flex">
      <div className="flex items-center justify-center w-full px-6 py-8 lg:h-[32rem] lg:w-1/2">
        <div className="max-w-">
          <h2 className="text-3xl font-semibold text-red-700 dark:text-red-400 lg:text-4xl">
            Be a Hero: <span className="text-red-600 dark:text-red-500">Donate Blood, Save Lives</span>
          </h2>

          <p className="mt-4 text-sm text-gray-700 dark:text-gray-300 lg:text-base">
            Every drop counts. Join our mission to connect life-saving donors with those in need. Together, we can make a lasting impact and save countless lives.
          </p>

          <div className="flex flex-col mt-6 space-y-3 lg:space-y-0 lg:flex-row">
            <Link
              to="/register"
              className="block px-5 py-2 text-sm font-medium text-center text-white transition-colors duration-300 bg-red-600 rounded-md hover:bg-red-900"
            >
              Join as a Donor
            </Link>
            <Link
              to="/search"
              className="block px-5 py-2 text-sm font-medium text-center transition-colors duration-300 text-white  bg-gray-600 rounded-md lg:mx-4 hover:bg-red-900"
            >
              Search Donors
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full h-64 lg:w-1/2 lg:h-auto">
        <div
          className="w-full h-full bg-cover"
          style={{
            backgroundImage:
              `url(${bannerImg})`,
          }}
        >
          <div className="w-full h-full bg-black bg-opacity-0"></div>
        </div>
      </div>
    </div>
  </header>


  );
};

export default Header;
