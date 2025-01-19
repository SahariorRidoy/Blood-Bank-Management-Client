import icon from "../../assets/logo.jpg"
import image from "../../assets/bandage-with-heart-it.jpg"
import google from "../../assets/Google__G__logo.svg.png"
import { Link } from "react-router-dom";
const Login = () => {
  return (
   

    <div className="flex w-full max-w-lg mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
    {/* Background Image Section */}
    <div
      className="hidden bg-cover object-fill lg:block lg:w-1/2"
      style={{ backgroundImage: `url('${image}')` }}
    ></div>

    {/* Form Section */}
    <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
      {/* Logo */}
      <div className="flex justify-center mx-auto">
        <img
          className="w-auto h-32 sm:h-40"
          src={icon}
          alt="Logo"
        />
      </div>

      {/* Welcome Message */}
      <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
        Welcome back!
      </p>

      {/* Google Sign-In Button */}
      <Link
        to='/'        
        className="flex items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 "
      >
        <div className="px-4 py-2 flex items-center border border-gray-400 rounded hover:bg-gray-300 dark:hover:bg-gray-600">
          <div>
          <img className="w-6" src={google} alt="" />
          </div>
        <span className="px-4 py-3 font-bold text-center">
          Sign in with Google
        </span>
        </div>
      </Link>

      {/* Divider */}
      <div className="flex items-center justify-between mt-4">
        <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>
        <a
          href="#"
          className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline"
        >
          or login with email
        </a>
        <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
      </div>

      {/* Email Input */}
      <div className="mt-4">
        <label
          htmlFor="LoggingEmailAddress"
          className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
        >
          Email Address
        </label>
        <input
          id="LoggingEmailAddress"
          type="email"
          className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      {/* Password Input */}
      <div className="mt-4">
        <div className="flex justify-between">
          <label
            htmlFor="loggingPassword"
            className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
          >
            Password
          </label>
          <a
            href="#"
            className="text-xs text-gray-500 dark:text-gray-300 hover:underline"
          >
            Forget Password?
          </a>
        </div>
        <input
          id="loggingPassword"
          type="password"
          className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      {/* Sign-In Button */}
      <div className="mt-6">
        <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
          Sign In
        </button>
      </div>

      {/* Sign-Up Link */}
      <div className="flex items-center justify-between mt-4">
        <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
        <a
          href="#"
          className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
        >
          or sign up
        </a>
        <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
      </div>
    </div>
  </div>
  );
};

export default Login;
