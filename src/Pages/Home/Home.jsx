import React, { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';

const Home = () => {
    const { user } = useContext(AuthContext);
    console.log(user);
    
    return (
        <div className='w-[1320px] mx-auto'>
            {
                user?<div>
                    <p>welcome,{user.displayName || user.email}</p>
                    <img className='w-20' src={user.photoURL} alt="" />
                </div>:
                <p>Please log in</p>
            }
        </div>
    );
};

export default Home;