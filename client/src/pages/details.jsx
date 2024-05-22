import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CgSearchLoading } from "react-icons/cg";

const Detail = () => {
  const { id } = useParams();
  const [card, setCard] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/post/${id}`
        );
        setCard(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!card) {
    return <CgSearchLoading className="m-auto" size={500} />;
  }

  const createdAtDate = new Date(card.createdAt);
  const formattedCreatedAt = `${createdAtDate.toLocaleDateString()} ${createdAtDate.toLocaleTimeString()}`;

  return (
    <div className="container mx-auto p-4">
      <div className="w-full mx-auto h-full bg-white shadow-md rounded-lg overflow-hidden">
        <img
          src={card.img}
          alt={card.title}
          className="w-full h-full object-cover"
        />
        <div className="p-4">
          <h2 className="text-2xl text-center font-bold mb-2">{card.title}</h2>

          <p className="text-sm text-gray-600 mb-2">by {card.author.name}</p>
          <p className="text-sm text-gray-600 mb-4">{formattedCreatedAt}</p>

          <div className="text-gray-800 p-6">{card.content}</div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
