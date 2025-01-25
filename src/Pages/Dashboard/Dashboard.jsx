import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import Loading from '../../components/Loading/Loading';
import { NavLink, Outlet } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const { user, loading,setLoading } = useContext(AuthContext);
  const [userRole, setUserRole] = useState(null);


  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:5000/users/${user.email}`) 
        .then((response) => {
          console.log(response)
          setUserRole(response.data.role); 
          console.log(userRole)
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
          setLoading(false);
        });
    }
  }, [user]);

  if (loading) {
    return <Loading />;
  }

  
  const renderNavLinks = () => {
    if (userRole === 'donor') {
      return (
        <>
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              isActive
                ? 'text-blue-600 font-semibold py-2 md:py-3 px-3 md:px-4 rounded-lg bg-white shadow-md text-sm transition-all duration-300 ease-in-out'
                : 'text-white py-2 md:py-3 px-3 md:px-4 rounded-lg text-sm hover:bg-blue-500 hover:text-white transition-all duration-300 ease-in-out'
            }
          >
            Donor Home 🏠
          </NavLink>
          <NavLink
            to="/my-donation-request"
            className={({ isActive }) =>
              isActive
                ? 'text-blue-600 font-semibold py-2 md:py-3 px-3 md:px-4 rounded-lg bg-white shadow-md text-sm transition-all duration-300 ease-in-out'
                : 'text-white py-2 md:py-3 px-3 md:px-4 rounded-lg text-sm hover:bg-blue-500 hover:text-white transition-all duration-300 ease-in-out'
            }
          >
            My Donation Requests 🩸
          </NavLink>
          <NavLink
            to="/create-donation-request"
            className={({ isActive }) =>
              isActive
                ? 'text-blue-600 font-semibold py-2 md:py-3 px-3 md:px-4 rounded-lg bg-white shadow-md text-sm transition-all duration-300 ease-in-out'
                : 'text-white py-2 md:py-3 px-3 md:px-4 rounded-lg text-sm hover:bg-blue-500 hover:text-white transition-all duration-300 ease-in-out'
            }
          >
            Create Donation Request 🆕
          </NavLink>
        </>
      );
    } else if (userRole === 'admin') {
      return (
        <>
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              isActive
                ? 'text-blue-600 font-semibold py-2 md:py-3 px-3 md:px-4 rounded-lg bg-white shadow-md text-sm transition-all duration-300 ease-in-out'
                : 'text-white py-2 md:py-3 px-3 md:px-4 rounded-lg text-sm hover:bg-blue-500 hover:text-white transition-all duration-300 ease-in-out'
            }
          >
            Admin Home 🏠
          </NavLink>
          <NavLink
            to="/all-users"
            className={({ isActive }) =>
              isActive
                ? 'text-blue-600 font-semibold py-2 md:py-3 px-3 md:px-4 rounded-lg bg-white shadow-md text-sm transition-all duration-300 ease-in-out'
                : 'text-white py-2 md:py-3 px-3 md:px-4 rounded-lg text-sm hover:bg-blue-500 hover:text-white transition-all duration-300 ease-in-out'
            }
          >
            All Users
          </NavLink>
          <NavLink
            to="/all-request"
            className={({ isActive }) =>
              isActive
                ? 'text-blue-600 font-semibold py-2 md:py-3 px-3 md:px-4 rounded-lg bg-white shadow-md text-sm transition-all duration-300 ease-in-out'
                : 'text-white py-2 md:py-3 px-3 md:px-4 rounded-lg text-sm hover:bg-blue-500 hover:text-white transition-all duration-300 ease-in-out'
            }
          >
            All Blood Donation Requests
          </NavLink>
          <NavLink
            to="/content-management"
            className={({ isActive }) =>
              isActive
                ? 'text-blue-600 font-semibold py-2 md:py-3 px-3 md:px-4 rounded-lg bg-white shadow-md text-sm transition-all duration-300 ease-in-out'
                : 'text-white py-2 md:py-3 px-3 md:px-4 rounded-lg text-sm hover:bg-blue-500 hover:text-white transition-all duration-300 ease-in-out'
            }
          >
            Content Management
          </NavLink>
        </>
      );
    } else if (userRole === 'volunteer') {
      return (
        <>
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              isActive
                ? 'text-blue-600 font-semibold py-2 md:py-3 px-3 md:px-4 rounded-lg bg-white shadow-md text-sm transition-all duration-300 ease-in-out'
                : 'text-white py-2 md:py-3 px-3 md:px-4 rounded-lg text-sm hover:bg-blue-500 hover:text-white transition-all duration-300 ease-in-out'
            }
          >
            Volunteer Home 🏠
          </NavLink>
          <NavLink
            to="/all-request"
            className={({ isActive }) =>
              isActive
                ? 'text-blue-600 font-semibold py-2 md:py-3 px-3 md:px-4 rounded-lg bg-white shadow-md text-sm transition-all duration-300 ease-in-out'
                : 'text-white py-2 md:py-3 px-3 md:px-4 rounded-lg text-sm hover:bg-blue-500 hover:text-white transition-all duration-300 ease-in-out'
            }
          >
            All Blood Donation Requests
          </NavLink>
          <NavLink
            to="/content-management"
            className={({ isActive }) =>
              isActive
                ? 'text-blue-600 font-semibold py-2 md:py-3 px-3 md:px-4 rounded-lg bg-white shadow-md text-sm transition-all duration-300 ease-in-out'
                : 'text-white py-2 md:py-3 px-3 md:px-4 rounded-lg text-sm hover:bg-blue-500 hover:text-white transition-all duration-300 ease-in-out'
            }
          >
            Content Management
          </NavLink>
        </>
      );
    }
    return null; 
  };

  return (
    <div className="max-w-[1320px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 p-4 md:p-6">
       {/* Sidebar Navigation * */}
      <div className="col-span-1 md:col-span-4 lg:col-span-3 px-4 py-6 flex flex-col text-white space-y-2 border-2 border-gray-300 bg-red-400 min-h-[400px] md:min-h-[600px] lg:min-h-[800px] rounded-xl shadow-lg">
        <h2 className="text-2xl md:text-3xl font-semibold text-center text-white">
          Dashboard
        </h2>
        {renderNavLinks()}

        <br /><br />
        <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? 'text-blue-600 font-semibold py-2 md:py-3 px-3 md:px-4 rounded-lg bg-white shadow-md text-sm transition-all duration-300 ease-in-out'
                : 'text-white py-2 md:py-3 px-3 md:px-4 rounded-lg text-sm hover:bg-blue-500 hover:text-white transition-all duration-300 ease-in-out'
            }
          >
            HomePage
          </NavLink>
      </div>

      {/* Main Content */}
      <div className="col-span-1 md:col-span-8 lg:col-span-9 bg-gray-50 shadow-xl rounded-xl p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
