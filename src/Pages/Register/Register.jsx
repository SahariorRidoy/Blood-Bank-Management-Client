import React, { useContext, useState } from 'react';
import icon from "../../assets/logo.jpg";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import districts from '../../Data/Districts.json';
import upazilas from '../../Data/Upazilas.json';
import image from "../../assets/bandage-with-heart-it.jpg";
import axios from 'axios';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Provider/AuthProvider';

const Register = () => {
  const [bloodGroup, setBloodGroup] = useState("");
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { createNewUser, setUser, updateUserProfile } = useContext(AuthContext);

  // Upload image at imgBB Key
  const imageUploadKey = import.meta.env.VITE_imgBB_API;
  const imageUploadApi = `https://api.imgbb.com/1/upload?key=${imageUploadKey}`;

  const handleDistrictChange = (e) => {
    const selectedDistrict = e.target.value;
    setDistrict(selectedDistrict);

    // Filter upazila
    const relatedUpazilas = upazilas.filter(
      (upazila) => upazila.district_id === selectedDistrict
    );
    setFilteredUpazilas(relatedUpazilas);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
  
    
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const username = formData.get("username");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");
    const imageFile = formData.get("avatar");

    if (password !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Passwords do not match!',
        text: 'Please confirm your password correctly.',
      });
      return;
    }

    const imageData = new FormData();
    imageData.append("image", imageFile);

    try {
      const response = await axios.post(imageUploadApi, imageData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const imageUrl = response.data.data.url;
     

      const userData = {
        email,
        username,
        image: imageUrl,
        bloodGroup: formData.get("bloodGroup"),
        district: formData.get("district"),
        upazila: formData.get("upazila"),
        status: "active",
        role:"donor"
      };

      // Store user data into firebase
      const { user } = await createNewUser(email, password);
      setUser(user);
      await updateUserProfile({ displayName: username, photoURL: imageUrl });

      await axios.post("http://localhost:5000/users", userData);

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Registration successful!",
        showConfirmButton: false,
        timer: 1500,
      });

      e.target.reset();
      navigate(location?.state ? location.state : "/");
    } catch (error) {
      console.error("Registration error:", error);
      Swal.fire({
        icon: 'error',
        title: 'Registration failed!',
        text: 'Something went wrong. Please try again.',
      });
    }
  };

  return (
    <section className="flex w-[1320px] mx-auto mt-16 overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-900">
      {/* Left Image */}
      <div
        className="w-1/2 bg-cover bg-center"
        style={{
          backgroundImage: `url(${image})`,
          height: '85vh',
        }}
      ></div>

      {/* Form Area */}
      <div className="flex items-center justify-center px-6 mx-auto lg:w-1/2">
        <form className="w-full max-w-md" onSubmit={handleRegister}>
          <div className="flex justify-center mx-auto">
            <img className="w-auto h-24 sm:h-24" src={icon} alt="Logo" />
          </div>

          {/* Email */}
          <div className="flex items-center mt-6">
            <input
              type="email"
              name="email"
              className="block w-full py-3 text-gray-700 bg-white border border-gray-300 rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Email address"
              required
            />
          </div>

          {/* Username */}
          <div className="flex items-center mt-4">
            <input
              type="text"
              name="username"
              className="block w-full py-3 text-gray-700 bg-white border border-gray-300 rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Username"
              required
            />
          </div>

          {/* Profile Photo */}
          <div className="mt-4 ">
  <label  className="block text-sm text-gray-500 dark:text-gray-300 ml-12">Avatar</label>
  <input
    type="file"
    name="avatar"
    className="block w-full px-7 py-2 text-sm text-gray-600 bg-white border border-gray-300 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
  />
</div>

          {/* Blood Group Selector */}
          <div className="mt-4">
            <select
              name="bloodGroup"
              className="block w-full py-3 text-gray-700 bg-white border border-gray-300 rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
              required
            >
              <option value="" disabled>Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>

          {/* District Selector */}
          <div className="mt-4">
            <select
              name="district"
              className="block w-full py-3 text-gray-700 bg-white border border-gray-300 rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              value={district}
              onChange={handleDistrictChange}
              required
            >
              <option value="" disabled>Select District</option>
              {districts.map((district) => (
                <option key={district.id} value={district.id}>
                  {district.name}
                </option>
              ))}
            </select>
          </div>

          {/* Upazila Selector */}
          <div className="mt-4">
            <select
              name="upazila"
              className="block w-full py-3 text-gray-700 bg-white border border-gray-300 rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              value={upazila}
              onChange={(e) => setUpazila(e.target.value)}
              required
            >
              <option value="" disabled>Select Upazila</option>
              {filteredUpazilas.map((upazila) => (
                <option key={upazila.id}>
                  {upazila.name}
                </option>
              ))}
            </select>
          </div>

          {/* Password */}
          <div className="flex items-center mt-4">
            <input
              type="password"
              name="password"
              className="block w-full px-10 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Password"
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="flex items-center mt-4">
            <input
              type="password"
              name="confirmPassword"
              className="block w-full px-10 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Confirm Password"
              required
            />
          </div>

          {/* Register Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
            >
              Register
            </button>

            <div className="mt-6 text-center">
              <Link
                to="/login"
                className="text-sm text-blue-500 hover:underline dark:text-blue-400"
              >
                Already have an account?
              </Link>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Register;
