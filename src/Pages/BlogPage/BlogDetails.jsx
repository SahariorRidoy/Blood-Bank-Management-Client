import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../../components/Loading/Loading";

const BlogDetails = () => {
  const { id } = useParams(); 
  const [blog, setBlog] = useState(null);
const [loading,setLoading]=useState(true)
  useEffect(() => {
    axios
      .get(`https://assignment-12-server-azure.vercel.app/blogs/${id}`)
      .then((response) => {
        setBlog(response.data);
        setLoading(false)
      })
      
  }, [id]);

  if (loading) {
    return <div><Loading/></div>;
  }

  return (
    <div className="container mt-10 mx-auto p-4">
      <div className="relative bg-gray-100 rounded-lg shadow-md overflow-hidden">
        <img
          src={blog.thumbnail} 
          alt={blog.title}
          className="w-full h-72 sm:h-96 object-cover"
        />
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50"></div>
        <div className="relative z-10 p-6 text-white">
          <h2 className="text-3xl font-bold mb-4">{blog.title}</h2>
          <p className="text-lg">{blog.content}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
