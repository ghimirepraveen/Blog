import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import Card from "../components/card";
import Loading from "../components/loading";

const Home = () => {
  const [cards, setCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const cardsPerPage = 9;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://blog-server-au7i.onrender.com/api/post/getall",
          {
            params: { page: currentPage, limit: cardsPerPage },
          }
        );
        const formattedBlogs = response.data.blogs.map((blog) => ({
          ...blog,
          createdAt: format(new Date(blog.createdAt), "PPpp"),
        }));
        setCards(formattedBlogs);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
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
    <div className="flex flex-col items-center justify-center min-h-screen mx-4 p-4">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 w-full">
            {cards.map((card, index) => (
              <Link key={index} to={`/detail/${card.id}`}>
                <Card
                  image={card.img}
                  title={card.title}
                  author={card.author.name}
                  date={card.createdAt}
                />
              </Link>
            ))}
          </div>
          <div className="mt-4 flex justify-center mx-auto">
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
        </>
      )}
    </div>
  );
};

export default Home;
