import { useState } from "react";
import axios from "axios";

const AddComment = ({ postid, onCommentAdded }) => {
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async () => {
    setLoading(true);
    setError(null);
    const TOKEN = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    };
    try {
      const response = await axios.post(
        `https://blog-server-au7i.onrender.com/api/comment/create/${postid}`,
        { content: newComment },
        { headers }
      );
      setNewComment("");
      onCommentAdded(response.data); // Pass the new comment to the parent component
    } catch (err) {
      console.error("Error posting comment:", err);
      setError("Error posting comment. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col space-y-2 mb-4">
      <div className="flex space-x-4">
        <input
          type="text"
          placeholder="Write a comment"
          value={newComment}
          onChange={handleCommentChange}
          className="w-full p-2 rounded border border-gray-300"
        />
        <button
          onClick={handleCommentSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Posting..." : "Comment"}
        </button>
      </div>
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
};

export default AddComment;
