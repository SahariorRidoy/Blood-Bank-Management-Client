import React, { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import Loading from '../../components/Loading/Loading';
import Banner from '../Home/Banner/Banner.jsx'
import ContactUs from './ContactUs/ContactUs.jsx';
const Home = () => {
    const { user,loading } = useContext(AuthContext);
    console.log(user);
    if (loading) {
        return <Loading />
      }
    return (
        <div className='max-w-[1320px] mx-auto'>
            <Banner></Banner>
            <div className='py-16'>
            <ContactUs></ContactUs>
            </div>
        </div>
    );
};

export default Home;