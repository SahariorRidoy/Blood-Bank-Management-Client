import React, { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import districts from '../../Data/Districts.json';
import upazilas from '../../Data/Upazilas.json';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CreateDonationRequest = () => {
  const { user } = useContext(AuthContext);
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  
  const navigate = useNavigate();

  const handleDistrictChange = (e) => {
    const selectedDistrict = e.target.value;
    setDistrict(selectedDistrict);

    // Filter upazila
    const relatedUpazilas = upazilas.filter(
      (upazila) => upazila.district_id === selectedDistrict
    );
    setFilteredUpazilas(relatedUpazilas);
  };
  const [formData, setFormData] = useState({
    recipientName: "",
    recipientDistrict: "",
    recipientUpazila: "",
    hospitalName: "",
    fullAddress: "",
    bloodGroup: "",
    donationDate: "",
    donationTime: "",
    requestMessage: "",
  });

 
  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const donationRequest = {
      ...formData,
      requesterName: user?.displayName || "Unknown User",
      requesterEmail: user?.email || "No Email",
      donationStatus: "pending", // Default status
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/donation-requests",
        donationRequest
      );
      
        Swal.fire({
          icon: "success",
          title: "Donation Request Created!",
          text: "Your blood donation request has been successfully created.",
        });
        navigate("/dashboard/my-donation-request"); 
      
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Failed to Create Request",
        text: "An error occurred while creating your request. Please try again.",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white border border-gray-400 shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-center text-red-700 mb-6">
        Create Donation Request
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Two-column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Requester Name (Read-Only) */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Requester Name
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-100"
              value={user?.displayName || "Unknown User"}
              readOnly
            />
          </div>

          {/* Requester Email (Read-Only) */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Requester Email
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-100"
              value={user?.email || "No Email"}
              readOnly
            />
          </div>

          {/* Recipient Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Recipient Name
            </label>
            <input
              type="text"
              name="recipientName"
              className="w-full border border-gray-400 rounded-lg px-4 py-2"
              placeholder="Enter recipient's name"
              value={formData.recipientName}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* District Selector */}
          <div>
          <label className="block text-gray-700 font-medium mb-1">
              Recipient District
            </label>
            <select
              name="district"
              className="block w-full py-3 text-gray-700 bg-white border border-gray-400 rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
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
          <div>
          <label className="block text-gray-700 font-medium mb-1">
             Recipient Upazila
            </label>
            <select
              name="upazila"
              className="block w-full py-3 text-gray-700 bg-white border border-gray-400 rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
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

          {/* Hospital Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Hospital Name
            </label>
            <input
              type="text"
              name="hospitalName"
              className="w-full border border-gray-400 rounded-lg px-4 py-2"
              placeholder="Enter hospital name"
              value={formData.hospitalName}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Full Address */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Full Address
            </label>
            <input
              type="text"
              name="fullAddress"
              className="w-full border border-gray-400 rounded-lg px-4 py-2"
              placeholder="Enter full address"
              value={formData.fullAddress}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Blood Group */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Blood Group
            </label>
            <select
              name="bloodGroup"
              className="w-full border border-gray-400 rounded-lg px-4 py-2"
              value={formData.bloodGroup}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>
                Select blood group
              </option>
              {bloodGroups.map((group, index) => (
                <option key={index} value={group}>
                  {group}
                </option>
              ))}
            </select>
          </div>

          {/* Donation Date */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Donation Date
            </label>
            <input
              type="date"
              name="donationDate"
              className="w-full border border-gray-400 rounded-lg px-4 py-2"
              value={formData.donationDate}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Donation Time */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Donation Time
            </label>
            <input
              type="time"
              name="donationTime"
              className="w-full border border-gray-400 rounded-lg px-4 py-2"
              value={formData.donationTime}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        {/* Request Message */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Request Message
          </label>
          <textarea
            name="requestMessage"
            className="w-full border border-gray-400 rounded-lg px-4 py-2"
            placeholder="Explain why blood donation is needed"
            value={formData.requestMessage}
            onChange={handleInputChange}
            rows="4"
            required
          />
        </div>

        {/* Request Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-block px-3 bg-red-600 text-white font-semibold py-2 rounded-lg hover:bg-red-900 transition duration-200"
          >
            Submit Request
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateDonationRequest;
