import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ContentManagement = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/blogs");
        setBlogs(response.data);
        setFilteredBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs", error);
      }
    };
    fetchBlogs();
  }, []);

  const handleFilterChange = (e) => {
    const filter = e.target.value;
    setStatusFilter(filter);
    if (filter === "") {
      setFilteredBlogs(blogs);
    } else {
      setFilteredBlogs(blogs.filter((blog) => blog.status === filter));
    }
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
  const currentBlogs = filteredBlogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePublishToggle = async (blog) => {
    const updatedStatus = blog.status === "draft" ? "published" : "draft";
    try {
      await axios.put(`http://localhost:5000/blogs/${blog.id}`, {
        ...blog,
        status: updatedStatus,
      });
      setBlogs(
        blogs.map((b) =>
          b.id === blog.id ? { ...b, status: updatedStatus } : b
        )
      );
    } catch (error) {
      console.error("Error updating blog status", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/blogs/${id}`);
      setBlogs(blogs.filter((blog) => blog.id !== id));
    } catch (error) {
      console.error("Error deleting blog", error);
    }
  };

  return (
    <div className="p-4 md:p-8 lg:p-12 bg-gray-100 min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center bg-red-600 text-white px-4 py-3 rounded-lg shadow-lg">
        <h2 className="text-lg md:text-2xl font-bold">
          Blood Bank Content Management
        </h2>
        <button
          onClick={() => navigate("/dashboard/content-management/add-blog")}
          className="bg-white font-bold  text-red-600 px-4 py-2 rounded-md shadow hover:bg-gray-400 transition"
        >
          Add Blog
        </button>
      </div>

      {/* Filter Section */}
      <div className="my-6">
        <label className="block text-gray-700 font-medium mb-2">
          Filter by Status:
        </label>
        <select
          value={statusFilter}
          onChange={handleFilterChange}
          className="w-full md:w-1/3 px-4 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-red-500"
        >
          <option value="">All</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      {/* Blog List Section */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {currentBlogs.map((blog) => (
          <div
            key={blog?.id}
            className="p-4 bg-white rounded-lg shadow-lg border border-gray-400"
          >
            <h4
              className={`capitalize border border-gray-400 inline-block px-2 py-1 rounded-lg text-xs font-bold ${
                blog.status === "draft" ? "text-red-500" : "text-green-500"
              }`}
            >
              {blog.status === "draft" ? "Draft" : "Published"}
            </h4>
            <h3 className="text-lg font-bold text-red-600">{blog?.title}</h3>
            <p className="text-gray-600 mt-2">
              {blog?.content.slice(0, 100)}...
            </p>
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() =>
                  navigate(
                    `/dashboard/content-management/edit-blog/${blog?.id}`
                  )
                }
                className="bg-blue-500 text-white px-3 py-1 rounded-md shadow hover:bg-blue-600 transition"
              >
                Edit
              </button>
              <button
                onClick={() => handlePublishToggle(blog)}
                className={`${
                  blog.status === "draft" ? "bg-green-500" : "bg-purple-400"
                } text-white px-3 py-1 rounded-md shadow hover:opacity-90 transition`}
              >
                {blog.status === "draft" ? "Publish" : "Unpublish"}
              </button>
              <button
                onClick={() => handleDelete(blog?.id)}
                className="bg-red-500 text-white px-3 py-1 rounded-md shadow hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Section */}
      <div className="flex justify-between items-center mt-6">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className={`px-4 py-2 rounded-md shadow ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-red-600 text-white hover:bg-red-700"
          }`}
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className={`px-4 py-2 rounded-md shadow ${
            currentPage === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-red-600 text-white hover:bg-red-700"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ContentManagement;
