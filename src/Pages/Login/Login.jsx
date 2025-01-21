import icon from "../../assets/logo.jpg"
import image from "../../assets/bandage-with-heart-it.jpg"
import { AuthContext } from "../../Provider/AuthProvider";
import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userLogin, user, setUser } = useContext(AuthContext);


  const handleLogin=(e)=>{
    e.preventDefault();
    const email=e.target.email.value;
    const password=e.target.password.value;
    userLogin(email, password)
    .then((result) => {
      const user = result.user;
      setUser(user);
       Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Login successful!",
              showConfirmButton: false,
              timer: 1500,
            });
      setTimeout(() => {
        navigate(location?.state ? location.state : "/");
      }, 500);
    })
    .catch((error) => {
      
       Swal.fire({
              icon: 'error',
              title: 'Invalid email or password!',
              text: 'Please Provide valid information..',
            });
    });
};

    console.log(user);
    
  
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

     
      {/* Divider */}
      <div className="flex items-center justify-between mt-4">
        <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>
        
        <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
      </div>

      {/* Email Input */}
     <form onSubmit={handleLogin}>
     <div className="mt-4">
        <label
          
          className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
        >
          Email Address
        </label>
        <input
          name="email"
          type="email"
          placeholder="Enter email"
          className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      {/* Password Input */}
      <div className="mt-4">
        <div className="flex justify-between">
          <label
            
            className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
          >
            Password
          </label>
         
        </div>
        <input
          name="password"
          placeholder="Enter Password"
          type="password"
          className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      {/* Sign-In Button */}
      <div className="mt-6">
        <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
          Login
        </button>
      </div>

     </form>
      {/* Sign-Up Link */}
      <div className="flex items-center justify-between mt-4">
        <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
        <Link
          to="/register"
          className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
        >
            Dont have an account? Register
        </Link>
        <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
      </div>
    </div>
  </div>
  );
};

export default Login;
