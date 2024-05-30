import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../components/loading";

const CommentsList = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `https://blog-server-au7i.onrender.com/api/comment/getall/${postId}`
        );
        setComments(response.data);
      } catch (err) {
        setError("Error fetching comments. Please try again.");
      }
      setLoading(false);
    };

    fetchComments();
  }, [postId]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div>
      {comments.map((comment, index) => (
        <div key={index} className="bg-gray-100 p-2 rounded mb-2">
          <p className="font-bold">{comment.author.name}</p>
          <p>{comment.content}</p>
          <p className="text-xs text-gray-500">
            {new Date(comment.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CommentsList;
