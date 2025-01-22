import React, { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import Loading from '../../components/Loading/Loading';

const SearchPage = () => {
    const { user,loading } = useContext(AuthContext);
    if (loading) {
        return <Loading />
      }
    return (
        <div>
            This is search page
        </div>
    );
};

export default SearchPage;