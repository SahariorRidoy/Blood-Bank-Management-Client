import React, { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import Loading from '../../components/Loading/Loading';
import Banner from '../Home/Banner/Banner.jsx'
import ContactUs from './ContactUs/ContactUs.jsx';
import FeaturedBloodTypes from './FeaturedSection/FeaturedBloodTypes.jsx';
const Home = () => {
    const { user,loading } = useContext(AuthContext);
    if (loading) {
        return <Loading />
      }
    return (
        <div className='max-w-[1320px] mx-auto'>
            <div>
            <Banner></Banner>
            </div>
            <div className='pt-12'>
                <FeaturedBloodTypes></FeaturedBloodTypes>
            </div>
            <div className='py-12'>
            <ContactUs></ContactUs>
            </div>
        </div>
    );
};

export default Home;