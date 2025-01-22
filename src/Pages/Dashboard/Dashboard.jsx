import React, { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';

const Dashboard = () => {
    const {user}=useContext(AuthContext)
    return (
        <div className=" max-w-[1320px] mx-auto mt-10 flow-root">
  This is Dashboard
</div>
    );
};

export default Dashboard;