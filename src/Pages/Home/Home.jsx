import React, { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import Loading from '../../components/Loading/Loading';
import Banner from '../Home/Banner/Banner.jsx'
const Home = () => {
    const { user,loading } = useContext(AuthContext);
    console.log(user);
    if (loading) {
        return <Loading />
      }
    return (
        <div className='w-[1320px] mx-auto'>
            <Banner></Banner>
        </div>
    );
};

export default Home;