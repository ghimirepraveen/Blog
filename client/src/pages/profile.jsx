import { useEffect, useState } from "react";
import axios from "axios";
import CardWrapper from "../components/CardProfile";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const TOKEN = localStorage.getItem("token");

      if (!TOKEN) {
        setErrorMessage("No token found. Please log in.");
        return;
      }

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      };

      try {
        const response = await axios.get(
          "https://blog-server-au7i.onrender.com/api/user/me",
          { headers }
        );
        setUser(response.data);
        setEditedName(response.data.name);
      } catch (error) {
        setErrorMessage(
          "Error fetching data: " +
            (error.response?.data?.message || error.message)
        );
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleNameChange = (e) => {
    setEditedName(e.target.value);
  };

  const saveNameChange = async () => {
    const TOKEN = localStorage.getItem("token");

    if (!TOKEN) {
      setErrorMessage("No token found. Please log in.");
      return;
    }

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    };

    try {
      const response = await axios.put(
        "https://blog-server-au7i.onrender.com/api/user/update",
        { name: editedName },
        { headers }
      );
      console.log("Response:", response.data);
      setUser(response.data);
      setIsEditingName(false);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(
        "Error updating name: " +
          (error.response?.data?.message || error.message)
      );
      console.error("Error updating name:", error);
    }
  };

  if (!user) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col items-center space-y-4">
        {errorMessage && (
          <div className="bg-red-100 text-red-700 p-2 mb-4 rounded w-full text-center">
            {errorMessage}
          </div>
        )}
        <div className="w-full">
          {isEditingName ? (
            <div className="flex flex-col items-center space-y-2">
              <input
                type="text"
                value={editedName}
                onChange={handleNameChange}
                className="border p-2 rounded w-full"
              />
              <button
                onClick={saveNameChange}
                className="bg-blue-500 text-white px-4 py-2 rounded w-full md:w-1/2 lg:w-1/4"
              >
                Save
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-2">
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <button
                onClick={() => setIsEditingName(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded w-full md:w-1/2 lg:w-1/4 flex justify-center space-x-2"
              >
                Edit Name
              </button>
            </div>
          )}
        </div>
        <p className="w-full text-center">Email: {user.email}</p>
        <div className="w-full flex justify-center">
          <button className="bg-red-500 text-white px-4 py-2 rounded w-full md:w-1/2 lg:w-1/4">
            <Link to="/changepassword" className="text-sm">
              Change Password
            </Link>
          </button>
        </div>
      </div>
      <div>
        <p className="text-center text-4xl p-8 font-bold ">Your All Posts:</p>
      </div>
      <div className="mt-4">
        {user.posts && user.posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {user.posts.map((post, index) => (
              <CardWrapper key={index} post={post} author={user.name} />
            ))}
          </div>
        ) : (
          <p className="text-center">No posts available.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
