import axios from "axios";

import { useState } from "react";

const AddComment = ({ postId, onCommentAdded }) => {
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      await axios.post(
        `https://blog-server-au7i.onrender.com/api/comment/create/${postId}`,
        { content: newComment }
      );
      setNewComment("");
      onCommentAdded();
    } catch (err) {
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
