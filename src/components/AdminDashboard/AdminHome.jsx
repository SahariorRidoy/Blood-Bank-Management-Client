import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import axios from 'axios';
import Loading from '../Loading/Loading';
import { FaUser, FaHeartbeat, FaClipboardList } from 'react-icons/fa';

const AdminHome = () => {
  const { user, loading, setLoading } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get('http://localhost:5000/users');
      setUsers(response.data);
      setLoading(false);
    };
    fetchUsers();
  }, [setLoading]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="bg-red-50 text-red-700 p-6 rounded-xl shadow-lg">
      <h1 className="text-4xl font-bold mb-4 text-center">Welcome, Admin!</h1>
      <p className="text-lg mb-6 text-center">
        From this dashboard, you can manage users, monitor blood donation requests, and oversee approvals efficiently.
      </p>

      {/* Statistics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <div className="bg-white text-red-700 p-6 rounded-lg shadow-md flex items-center">
          <div className="p-4 bg-red-100 rounded-full">
            <FaUser className="text-4xl text-red-700" />
          </div>
          <div className="ml-4">
            <h3 className="text-xl font-semibold">Total Users</h3>
            <p className="text-3xl font-bold">{users.length}</p>
          </div>
        </div>

        <div className="bg-white text-red-700 p-6 rounded-lg shadow-md flex items-center">
          <div className="p-4 bg-red-100 rounded-full">
            <FaHeartbeat className="text-4xl text-red-700" />
          </div>
          <div className="ml-4">
            <h3 className="text-xl font-semibold">Active Requests</h3>
            <p className="text-3xl font-bold">45</p>
          </div>
        </div>

        <div className="bg-white text-red-700 p-6 rounded-lg shadow-md flex items-center">
          <div className="p-4 bg-red-100 rounded-full">
            <FaClipboardList className="text-4xl text-red-700" />
          </div>
          <div className="ml-4">
            <h3 className="text-xl font-semibold">Pending Approvals</h3>
            <p className="text-3xl font-bold">5</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
