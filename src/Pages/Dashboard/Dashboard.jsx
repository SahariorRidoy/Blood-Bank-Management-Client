import React, { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import Loading from '../../components/Loading/Loading';

const Dashboard = () => {
    const { user,loading } = useContext(AuthContext);
    if (loading) {
        return <Loading
         />
      }
    return (
        <div className=" max-w-[1320px] mx-auto mt-10 flow-root">
  This is Dashboard
</div>
    );
};

export default Dashboard;