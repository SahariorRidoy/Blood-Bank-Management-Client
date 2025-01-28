import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import JoditEditor from "jodit-react";
import Swal from 'sweetalert2';
import { htmlToText } from 'html-to-text';

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const imageUploadKey = import.meta.env.VITE_imgBB_API;
  const imageUploadApi = `https://api.imgbb.com/1/upload?key=${imageUploadKey}`;

  const handleThumbnailChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
        const imageData = new FormData();
        imageData.append("image", file);
        try {
            const response = await axios.post(imageUploadApi, imageData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            if (response.data && response.data.data && response.data.data.url) {
                const uploadedImageUrl = response.data.data.url; 
                setThumbnail(uploadedImageUrl);  
               
            } 
        } catch (error) {
            console.error("Error uploading thumbnail:", error);
            Swal.fire("Error", "Failed to upload thumbnail.", "error");
        }
    }
};

console.log(thumbnail);


const handleSubmit = async () => {
  if (!thumbnail) {
    return;
}
const plainTextContent = htmlToText(content, {
  wordwrap: false,
});
  const blogData = {
      title,
      content: plainTextContent,
      thumbnail,
      status: "draft",
  };
  try {
      await axios.post("https://assignment-12-server-azure.vercel.app/blogs", blogData);
      Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Blog created successfully!",
          showConfirmButton: false,
          timer: 1500,
      });
      navigate("/dashboard/content-management");
  } catch (error) {
      console.error("Error creating blog:", error);
      Swal.fire("Error", "Failed to create blog.", "error");
  }
};


  return (
    <div className="max-w-2xl mx-auto bg-white p-6 border border-gray-400 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-center text-red-600 mb-6">
        Add Blog
      </h2>
      <form className="space-y-6">
        <div>
          <label
            htmlFor="title"
            className="block text-lg font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Enter blog title"
          />
        </div>

        <div>
          <label
            htmlFor="thumbnail"
            className="block text-lg font-medium text-gray-700"
          >
            Thumbnail
          </label>
          <input
            type="file"
            id="thumbnail"
            accept="image/*"
            onChange={handleThumbnailChange}
            className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div>
          <label
            htmlFor="content"
            className="block text-lg font-medium text-gray-700"
          >
            Content
          </label>
         
          <JoditEditor
            value={content}
            onChange={(newContent) => setContent(newContent)}
          />
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          className="w-full py-3 bg-red-600 text-white rounded-lg font-semibold text-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
