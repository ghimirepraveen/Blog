import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Card from "./Card"; // Ensure correct import path
import Loading from "./Loading"; // Ensure correct import path

const SearchResults = () => {
  const { query } = useParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://blog-server-au7i.onrender.com/api/post/searchh`,
          { params: { title: query } }
        );
        setResults(response.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen mx-16 p-4">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 w-full">
            {results.map((result) => (
              <Link key={result.id} to={`/detail/${result.id}`}>
                <Card
                  image={result.img}
                  title={result.title}
                  author={result.author.name}
                  date={result.createdAt}
                />
              </Link>
            ))}
          </div>
          {results.length === 0 && <p>No results found</p>}
        </>
      )}
    </div>
  );
};

export default SearchResults;
