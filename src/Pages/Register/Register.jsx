import React, { useState } from 'react';
import icon from "../../assets/logo.jpg";
import { Link } from 'react-router-dom';
import districts from '../../Data/Districts.json';
import upazilas from '../../Data/Upazilas.json';
import image from "../../assets/bandage-with-heart-it.jpg";

const Register = () => {
  const [bloodGroup, setBloodGroup] = useState("");
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);

  const handleDistrictChange = (e) => {
    const selectedDistrict = e.target.value;
    setDistrict(selectedDistrict);

    // Filter upazilas based on the selected district_id
    const relatedUpazilas = upazilas.filter(
      (upazila) => upazila.district_id === selectedDistrict
    );
    setFilteredUpazilas(relatedUpazilas);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const userData = {
      email: formData.get("email"),
      username: formData.get("username"),
      avatar: formData.get("avatar"),
      bloodGroup: formData.get("bloodGroup"),
      district: formData.get("district"),
      upazila: formData.get("upazila"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
      status: "active", // Default status
    };

    console.log(userData); // Replace this with API call to register user
  };

  return (
    <section className="flex w-[1320px] mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-900">
      {/* Left Image */}
      <div
        className="w-1/2 bg-cover bg-center"
        style={{
          backgroundImage: `url(${image})`,
          height: '100vh',
        }}
      ></div>

      {/* Form Area */}
      <div className="flex items-center justify-center px-6 mx-auto lg:w-1/2">
        <form className="w-full max-w-md" onSubmit={handleRegister}>
          <div className="flex justify-center mx-auto">
            <img className="w-auto h-32 sm:h-40" src={icon} alt="Logo" />
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
  <label htmlFor="image" className="block text-sm text-gray-500 dark:text-gray-300 ml-12">Avatar</label>
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
