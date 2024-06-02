import React from "react";
import { Link } from "react-router-dom";
import Card from "../components/card";
import { MdEditSquare } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdVisibility } from "react-icons/md";
import Axios from "axios";

const CardWrapper = ({ post, author }) => {
  const handleDelete = async (id) => {
    const TOKEN = localStorage.getItem("token");

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    };

    try {
      const response = await Axios.delete(
        `https://blog-server-au7i.onrender.com/api/post/delete/${id}`,
        { headers }
      );

      if (response.status === 200) {
        console.log("Post deleted successfully");
        window.location.reload();
      } else {
        console.error("Failed to delete the post", response);
        alert("Failed to delete the post: " + response.statusText);
      }
    } catch (error) {
      console.error("Error deleting data:", error);
      alert("Error deleting data: " + error.message);
    }
  };

  return (
    <div className="relative mr-4 mt-4">
      <Card
        image={post.img}
        title={post.title}
        author={author}
        date={new Date().toLocaleDateString()}
      />
      <div className="absolute top-2 right-2 flex space-x-2">
        <Link to={`/detail/${post.id}`}>
          <button className="text-blue-500 hover:text-blue-700">
            <MdVisibility size={24} />
          </button>
        </Link>

        <Link to={`/edit/${post.id}`}>
          <button className="text-yellow-500 hover:text-yellow-700">
            <MdEditSquare size={24} />
          </button>
        </Link>

        <button
          onClick={() => handleDelete(post.id)}
          className="text-red-500 hover:text-red-700"
        >
          <MdDelete size={24} />
        </button>
      </div>
    </div>
  );
};

export default CardWrapper;
