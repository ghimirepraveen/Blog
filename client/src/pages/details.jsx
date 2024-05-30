import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../components/loading";
import AddComment from "../components/comment";
import CommentsList from "../components/listingComment";

const Detail = () => {
  const { id } = useParams();
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://blog-server-au7i.onrender.com/api/post/getbyid/${id}`
        );
        setCard(response.data);
      } catch (err) {
        setError("Error fetching data. Please try again.");
      }
      setLoading(false);
    };

    fetchData();
  }, [id]);

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
  const formattedCreatedAt = `${createdAtDate.toLocaleDateString()} ${createdAtDate.toLocaleTimeString()}`;

  return (
    <div className="container mx-auto p-4">
      <div className="w-full mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="w-full h-screen">
          <img
            src={card.img}
            alt={card.title}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="p-4">
          <h2 className="text-2xl text-center font-bold mb-2">{card.title}</h2>
          <p className="text-sm text-gray-600 mb-2">by {card.author.name}</p>
          <p className="text-sm text-gray-600 mb-4">{formattedCreatedAt}</p>
          <div
            className="text-gray-800"
            dangerouslySetInnerHTML={{ __html: card.content }}
          />
        </div>
      </div>
      {/* Comment section */}
      <div className="w-full mx-auto bg-white shadow-md rounded-lg overflow-hidden mt-4">
        <div className="p-4">
          <h2 className="text-2xl text-center font-bold mb-2">Comments</h2>
          <AddComment postId={id} onCommentAdded={() => setCard({ ...card })} />
          <CommentsList postId={id} />
        </div>
      </div>
    </div>
  );
};

export default Detail;
