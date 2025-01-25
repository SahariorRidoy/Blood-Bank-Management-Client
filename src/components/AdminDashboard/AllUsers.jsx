import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import Loading from '../Loading/Loading';
import { FaEllipsisV } from 'react-icons/fa';

const AllUsers = () => {
  const { loading, setLoading } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(null); // To manage which user's menu is open

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(8); // Display 8 users per page

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get('http://localhost:5000/users');
      setUsers(response.data);
      setLoading(false);
    };
    fetchUsers();
  }, [setLoading]);

  const toggleMenu = (userId) => {
    setIsMenuOpen(isMenuOpen === userId ? null : userId); // Toggle the menu visibility
  };

  const handleDeleteUser = (userId) => {
    // Logic to delete user
    axios.delete(`http://localhost:5000/users/${userId}`)
      .then(response => {
        // Remove the deleted user from the state
        setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
      })
      .catch(err => console.error(err));
  };

  const handleModifyUser = (userId) => {
    // Logic to modify user
    alert(`Modify user with ID: ${userId}`);
  };

  const handleMakeDonorOrVolunteer = (userId) => {
    // Logic for changing user role
    alert(`Change user role for ID: ${userId}`);
  };

  const handleMakeAdmin = (userId) => {
    // Logic for changing user role to admin
    alert(`Make user with ID: ${userId} an Admin`);
  };

  // Get current users for the current page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle Previous and Next buttons
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < Math.ceil(users.length / usersPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="relative overflow-x-auto">
      <h1 className="text-2xl font-semibold mb-4">All Users</h1>
      <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Avatar</th>
            <th className="px-4 py-2 text-left">Username</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Role</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user._id} className="border-t">
              <td className="px-4 py-2">
                <img src={user?.image} alt={user.username} className="w-10 h-10 rounded-full" />
              </td>
              <td className="px-4 py-2">{user.username}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">{user.role}</td>
              <td className="px-4 py-2">
                <span
                  className={`${
                    user.status === 'active' ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {user.status}
                </span>
              </td>
              <td className="px-4 py-2">
                {/* Action button to trigger menu */}
                <button
                  onClick={() => toggleMenu(user._id)}
                  className="text-gray-600 hover:text-gray-800 focus:outline-none"
                >
                  <FaEllipsisV />
                </button>

                {/* Dropdown menu */}
                {isMenuOpen === user._id && (
                  <div className="absolute right-0 w-40 mt-2 bg-white border rounded-lg shadow-lg z-10">
                    <div className="py-1">
                      <button
                        onClick={() => handleModifyUser(user._id)}
                        className="block w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-gray-100"
                      >
                        Block
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleMakeDonorOrVolunteer(user._id)}
                        className="block w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-gray-100"
                      >
                        Make Volunteer/User
                      </button>
                      <button
                        onClick={() => handleMakeAdmin(user._id)}
                        className="block w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-gray-100"
                      >
                        Make Admin
                      </button>
                    </div>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        {/* Previous Button */}
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300  rounded-md disabled:bg-gray-200  hover:bg-green-500"
        >
          Previous
        </button>

        {/* Page Number Display */}
        <span className="text-gray-700 font-semibold">
          Page {currentPage} of {Math.ceil(users.length / usersPerPage)}
        </span>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={currentPage === Math.ceil(users.length / usersPerPage)}
          className="px-4 py-2  bg-green-500 rounded-md disabled:bg-gray-200 hover:bg-green-400"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllUsers;
