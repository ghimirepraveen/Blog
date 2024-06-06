import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import AddComment from "../components/Comment";
import CommentsList from "../components/ListingComment";
import ShareButtons from "../components/ShareButton";
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";

const Detail = () => {
  const { id } = useParams();
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://blog-server-au7i.onrender.com/api/post/getbyid/${id}`
        );
        setCard(response.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Error fetching data. Please try again.");
      }
      setLoading(false);
    };

    fetchData();
  }, [id]);

  const handleCommentAdded = (newComment) => {
    setCard((prevCard) => ({
      ...prevCard,
      comments: [...prevCard.comments, newComment],
    }));
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!card) {
    return <div className="text-red-500">Post not found</div>;
  }

  const createdAtDate = new Date(card.createdAt);
  const formattedCreatedAt = createdAtDate.toLocaleDateString();
  const url = window.location.href;
  const title = card.title;

  return (
    <div
      className={`container mx-auto mt-4 p-4 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex justify-end">
        <button
          onClick={toggleDarkMode}
          className="mb-4 p-2  text-white rounded-full"
        >
          {darkMode ? (
            <MdOutlineDarkMode color="white" size={40} />
          ) : (
            <MdDarkMode color="black" size={40} />
          )}
        </button>
      </div>
      <div
        className={`w-full mx-auto shadow-md rounded-lg overflow-hidden ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="w-full h-screen">
          <img
            src={card.img}
            alt={card.title}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="p-4">
          <h2 className="text-2xl text-center font-bold mb-2">{card.title}</h2>
          <p
            className={`text-sm mb-2 ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            by {card.author.name}
          </p>
          <p
            className={`text-sm mb-4 ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {formattedCreatedAt}
          </p>
          <div
            className={`text-gray-800 ${
              darkMode ? "text-gray-300" : "text-gray-800"
            }`}
            dangerouslySetInnerHTML={{ __html: card.content }}
          />
          <div className="m-4">
            <ShareButtons url={url} title={title} />
          </div>
        </div>
      </div>
      <div
        className={`w-full mx-auto shadow-md rounded-lg overflow-hidden mt-4
        ${darkMode ? "text-black" : "text-gray-800"}`}
      >
        <div className="p-4">
          <h2 className="text-2xl text-center font-bold mb-2">Comments</h2>
          <AddComment postid={id} onCommentAdded={handleCommentAdded} />
          <CommentsList comments={card.comments} />
        </div>
      </div>
    </div>
  );
};

export default Detail;
