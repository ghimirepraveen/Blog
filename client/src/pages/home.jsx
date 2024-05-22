// src/pages/Home.js or src/pages/Home.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import Card from "../components/card";

const Home = () => {
  const [cards, setCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const cardsPerPage = 9;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/post", {
          params: { page: currentPage, limit: cardsPerPage },
        });
        const formattedBlogs = response.data.blogs.map((blog) => ({
          ...blog,
          createdAt: format(new Date(blog.createdAt), "PPpp"),
        }));
        setCards(formattedBlogs);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentPage]);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="flex flex-wrap justify-center max-w-6xl">
        {cards.map((card, index) => (
          <div key={index} className="w-full sm:w-1/2 lg:w-1/3 p-2">
            <Link to={`/detail/${card.id}`}>
              <Card
                image={card.img}
                title={card.title}
                author={card.author.name}
                date={card.createdAt}
              />
            </Link>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="mx-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
