import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../Provider/AuthProvider";

const MyDonationRequests = () => {
  const { user, loading, setLoading } = useContext(AuthContext);
  const [donationRequests, setDonationRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  

  useEffect(() => {
    if (!user.email) {
      return;
    }

    const fetchDonationRequests = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/donation-requests/${user.email}`
        );
        setDonationRequests(response.data);
        setFilteredRequests(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching donation requests:", error);
        setLoading(false);
      }
    };

    fetchDonationRequests();
  }, [user.email, setLoading]);

  const handleFilterChange = (e) => {
    const filter = e.target.value;
    setStatusFilter(filter);
    if (filter === "") {
      setFilteredRequests(donationRequests);
    } else {
      const filtered = donationRequests.filter((request) => request.donationStatus === filter);
      setFilteredRequests(filtered);
    }
    setCurrentPage(1);
  };

  const indexOfLastRequest = currentPage * itemsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - itemsPerPage;
  const currentRequests = filteredRequests.slice(indexOfFirstRequest, indexOfLastRequest);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);

  return (
    <div className="p-6 bg-gray-100 ">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-red-600 mb-4">My Donation Requests</h2>

        {/* Filter Section */}
        <div className="mb-4 flex items-center justify-between">
          <label htmlFor="statusFilter" className="font-medium text-gray-700">
            Filter by Status:
          </label>
          <select
            id="statusFilter"
            value={statusFilter}
            onChange={handleFilterChange}
            className="ml-2 px-4 py-2 border rounded-lg focus:ring focus:ring-red-300"
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="inprogress">In Progress</option>
            <option value="done">Done</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>

        {/* Table Section */}
        {donationRequests.length === 0 ? (
          <p className="text-center text-gray-600">No donation requests found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-red-600 text-white">
                  <th className="px-4 py-3 border">Recipient Name</th>
                  <th className="px-4 py-3 border">Blood Group</th>
                  <th className="px-4 py-3 border">Donation Status</th>
                  <th className="px-4 py-3 border">Donation Date</th>
                </tr>
              </thead>
              <tbody>
                {currentRequests.map((request) => (
                  <tr
                    key={request._id}
                    className="even:bg-gray-100 odd:bg-white hover:bg-gray-200"
                  >
                    <td className="px-4 py-3 border">{request.recipientName}</td>
                    <td className="px-4 py-3 border">{request.bloodGroup}</td>
                    <td className="px-4 py-3 border">{request.donationStatus}</td>
                    <td className="px-4 py-3 border">{request.donationDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Section */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-red-600 text-white hover:bg-red-500"
            }`}
          >
            Previous
          </button>
          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-red-600 text-white hover:bg-red-500"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyDonationRequests;
