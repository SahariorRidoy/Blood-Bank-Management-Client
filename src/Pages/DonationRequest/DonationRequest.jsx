import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../../components/Loading/Loading";

const DonationRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);  
  const navigate = useNavigate();
  
  useEffect(() => {
    axios
      .get("https://assignment-12-server-azure.vercel.app/donation-requests-pending")
      .then((response) => {
        setRequests(response.data);  
        setLoading(false);  
      })
      
  }, []);
  if (loading) {
    return <Loading></Loading>
  }

  return (
    <div className="container mx-auto p-4 mt-14 bg-red-50">
      <h2 className="text-3xl font-bold text-center mb-6 text-red-700">
        Pending Blood Donation Requests
      </h2>
      
      {requests.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {requests.map((request) => (
            <div
              key={request._id}
              className="p-6 bg-white rounded-lg shadow-lg border border-red-500 hover:border-red-600 transition duration-300"
            >
              <h3 className="text-2xl font-semibold mb-3 text-red-600">{request.recipientName}</h3>
              <p className="text-gray-700">
                <strong className="text-red-600">Location:</strong> {`${request.recipientDistrict}, ${request.recipientUpazila}`}
              </p>
              <p className="text-gray-700">
                <strong className="text-red-600">Blood Group:</strong> {request.bloodGroup}
              </p>
              <p className="text-gray-700">
                <strong className="text-red-600">Date:</strong> {new Date(request.donationDate).toLocaleDateString()}
              </p>
              <p className="text-gray-700">
                <strong className="text-red-600">Time:</strong> {request.donationTime}
              </p>
              <button
                onClick={() => navigate(`/donation-request/${request._id}`)}
                className="mt-4 bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition duration-300"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 text-xl">No pending requests at the moment.</p>
      )}
    </div>
  );
};

export default DonationRequests;
