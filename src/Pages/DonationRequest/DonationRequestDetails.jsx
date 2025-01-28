import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import Loading from "../../components/Loading/Loading";

const DonationRequestDetails = () => {
  const { user, loading, setLoading } = useContext(AuthContext);
  const { id } = useParams();
  const [request, setRequest] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate=useNavigate()
  const [donorInfo, setDonorInfo] = useState({
    name: user.displayName,
    email: user.email,
  });

  useEffect(() => {
    axios
      .get(`https://assignment-12-server-azure.vercel.app/donation-requests-pending/${id}`)
      .then((response) => {
        const data = response.data;
        if (data && data.donationStatus === "pending") {
          setRequest(data);
        }
        setLoading(false);
      });
  }, [id]);

  const handleDonate = () => {
    axios
      .put(`https://assignment-12-server-azure.vercel.app/donation-requests/${id}`, {
        donationStatus: "inprogress",
        donorName: donorInfo.name,
        donorEmail: donorInfo.email,
      })
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Donate successful!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate('/donation-request')
        setModalOpen(false);
        setRequest((prev) => ({
          ...prev,
          donationStatus: "inprogress",
        }));
      });
  };

  if (loading) {
    return <Loading></Loading>;
  }

  if (!request) {
    return <Loading></Loading>;
  }

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-xl border border-gray-200 max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-red-600 pb-6 border border-b-gray-400">
        <span className="font-semibold text-red-600">Recipient Name:</span>
          {request.recipientName}
          
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 text-gray-800">
          <p className="text-lg">
            <span className="font-semibold text-red-600">Location:</span> {`${request.recipientDistrict}, ${request.recipientUpazila}`}
          </p>
          <p className="text-lg">
            <span className="font-semibold text-red-600">Blood Group:</span> {request.bloodGroup}
          </p>
          <p className="text-lg">
            <span className="font-semibold text-red-600">Donation Date:</span> {new Date(request.donationDate).toLocaleDateString()}
          </p>
          <p className="text-lg">
            <span className="font-semibold text-red-600">Donation Time:</span> {request.donationTime}
          </p>
          <p className="text-lg">
            <span className="font-semibold text-red-600">Hospital:</span> {request.hospitalName}
          </p>
          <p className="text-lg">
            <span className="font-semibold text-red-600">Full Address:</span> {request.fullAddress}
          </p>
          
          <p className="text-lg ">
            <span className="font-semibold text-red-600">Request Message:</span> {request.requestMessage}
          </p>
          <p className="text-lg ">
            <span className="font-semibold text-red-600">Donation Status:</span> {request.donationStatus}
          </p>
          <p className="text-lg">
            <span className="font-semibold text-red-600">Requester Name:</span> {request.requesterName}
          </p>
          <p className="text-lg">
            <span className="font-semibold text-red-600">Requester Email:</span> {request.requesterEmail}
          </p>
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => setModalOpen(true)}
            className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 shadow-lg transition duration-300"
          >
            Donate Now
          </button>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-2xl font-bold text-red-600 mb-6 text-center">
              Confirm Donation
            </h3>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Donor Name
                </label>
                <input
                  type="text"
                  value={donorInfo.name}
                  readOnly
                  className="w-full p-3 rounded-lg border border-gray-300 bg-gray-100"
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700">
                  Donor Email
                </label>
                <input
                  type="email"
                  value={donorInfo.email}
                  readOnly
                  className="w-full p-3 rounded-lg border border-gray-300 bg-gray-100"
                />
              </div>
            </form>
            <div className="flex justify-between">
              <button
                onClick={() => setModalOpen(false)}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDonate}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition duration-300"
              >
                Confirm Donation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationRequestDetails;