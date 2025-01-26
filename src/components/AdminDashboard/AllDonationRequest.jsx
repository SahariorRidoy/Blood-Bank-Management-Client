import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FaEllipsisV } from "react-icons/fa";

const AllDonationRequest = () => {
  const { user, loading, setLoading } = useContext(AuthContext);
  const [donationRequests, setDonationRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(7);
  const [isMenuOpen, setIsMenuOpen] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.email) {
      return;
    }

    const fetchDonationRequests = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/donation-requests`
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
      const filtered = donationRequests.filter(
        (request) => request.donationStatus === filter
      );
      setFilteredRequests(filtered);
    }
    setCurrentPage(1);
  };

  const handleDelete = async (id) => {
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmDelete.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/donation-requests/${id}`);
        setDonationRequests((prev) => prev.filter((request) => request._id !== id));
        setFilteredRequests((prev) => prev.filter((request) => request._id !== id));
        Swal.fire("Deleted!", "Your donation request has been deleted.", "success");
      } catch (error) {
        console.error("Error deleting donation request:", error);
      }
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const updatedRequest = await axios.put(
        `http://localhost:5000/donation-requests/${id}`,
        { donationStatus: status }
      );
      setDonationRequests((prev) =>
        prev.map((request) =>
          request._id === id ? { ...request, ...updatedRequest.data } : request
        )
      );
      setFilteredRequests((prev) =>
        prev.map((request) =>
          request._id === id ? { ...request, ...updatedRequest.data } : request
        )
      );
    } catch (error) {
      console.error("Error updating donation status:", error);
    }
  };

  const indexOfLastRequest = currentPage * itemsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - itemsPerPage;
  const currentRequests = filteredRequests.slice(
    indexOfFirstRequest,
    indexOfLastRequest
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);

  const toggleMenu = (id) => {
    setIsMenuOpen(isMenuOpen === id ? null : id); // Toggle the menu visibility
  };

  return (
    <div className="px-6 bg-gray-100">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-red-600 mb-4">All Blood Donation Requests</h2>

        {/* Filter Section */}
        <div className="mb-4 ">
          <label htmlFor="statusFilter" className="font-medium text-gray-700">
            Filter by Status:
          </label>
          <select
            id="statusFilter"
            value={statusFilter}
            onChange={handleFilterChange}
            className="ml-2 px-4 py-2 border border-red-400 rounded-lg focus:ring focus:ring-red-300"
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
                  <th className="px-4 py-3 border">Recipient Location</th>
                  <th className="px-4 py-3 border">Blood Group</th>
                  <th className="px-4 py-3 border">Donation Date</th>
                  <th className="px-4 py-3 border">Donation Time</th>
                  <th className="px-4 py-3 border">Donation Status</th>
                  <th className="px-4 py-3 border">Donor Info</th>
                  <th className="px-4 py-3 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentRequests.map((request) => (
                  <tr
                    key={request._id}
                    className="even:bg-gray-100 odd:bg-white hover:bg-gray-200"
                  >
                    <td className="px-4 py-3 border">{request.recipientName}</td>
                    <td className="px-4 py-3 border">{`${request.recipientDistrict}, ${request.recipientUpazila}`}</td>
                    <td className="px-4 py-3 border">{request.bloodGroup}</td>
                    <td className="px-4 py-3 border">{request.donationDate}</td>
                    <td className="px-4 py-3 border">{request.donationTime}</td>
                    <td className="px-4 py-3 border">{request.donationStatus}</td>
                    <td className="px-4 py-3 border">
                      {request.donationStatus === "inprogress" && request.donorInfo
                        ? `${request.donorInfo.name} (${request.donorInfo.email})`
                        : "N/A"}
                    </td>
                    <td className="px-4 py-3 border flex gap-2 relative">
                      {/* Ellipsis Button to Show Dropdown */}
                      <button
                        onClick={() => toggleMenu(request._id)}
                        className="text-gray-600 hover:text-gray-800 focus:outline-none"
                      >
                        <FaEllipsisV />
                      </button>

                      {/* Dropdown Menu */}
                      {isMenuOpen === request._id && (
                        <div className="absolute top-7 right-0 w-40 mt-2 bg-gray-300 hover border rounded-lg shadow-lg z-10">
                          <button
                            onClick={() => navigate(`/edit-donation/${request._id}`)}
                            className="block w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-gray-600"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(request._id)}
                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-600"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => navigate(`/donation-details/${request._id}`)}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-600"
                          >
                            View
                          </button>

                          {/* Show "Done" and "Canceled" buttons only if status is "inprogress" */}
                          {request.donationStatus === "inprogress" && (
                            <>
                              <button
                                onClick={() => handleStatusChange(request._id, "done")}
                                className="block w-full text-left px-4 py-2 text-sm text-green-600 hover:bg-gray-600"
                              >
                                Done
                              </button>
                              <button
                                onClick={() => handleStatusChange(request._id, "canceled")}
                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-600"
                              >
                                Canceled
                              </button>
                            </>
                          )}
                        </div>
                      )}
                    </td>
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
            className={`px-4 py-2 rounded-lg ${currentPage === 1
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
            className={`px-4 py-2 rounded-lg ${currentPage === totalPages
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

export default AllDonationRequest;
