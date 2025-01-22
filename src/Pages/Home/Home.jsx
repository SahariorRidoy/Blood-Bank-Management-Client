import React, { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import Loading from '../../components/Loading/Loading';

const Home = () => {
    const { user,loading } = useContext(AuthContext);
    console.log(user);
    if (loading) {
        return <Loading />
      }
    return (
        <div className='w-[1320px] mx-auto'>
            
        </div>
    );
};

export default Home;