import { useEffect, useState } from "react";
import axios from "axios";
import CardWrapper from "../components/cardProfile";
import { Link } from "react-router-dom";

import Loading from "../components/loading";

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
        const response = await axios.get("http://localhost:8000/api/user/me", {
          headers,
        });
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
        "http://localhost:8000/api/user/me",
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
      <div className="flex justify-between">
        {errorMessage && (
          <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
            {errorMessage}
          </div>
        )}
        <div className="mb-4">
          {isEditingName ? (
            <div className="flex items-center">
              <input
                type="text"
                value={editedName}
                onChange={handleNameChange}
                className="border p-2 rounded mr-2"
              />
              <button
                onClick={saveNameChange}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          ) : (
            <div className="flex items-center">
              <h1 className="text-2xl font-bold mr-2">{user.name}</h1>
              <button
                onClick={() => setIsEditingName(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Edit
              </button>
            </div>
          )}
        </div>
        <p className="mb-4 mr-9">Email: {user.email}</p>
      </div>
      <div>
        <button className="bg-red-500 text-white px-4 py-2 rounded">
          <Link to="/changepassword" className="text-sm">
            Change Password
          </Link>
        </button>
      </div>
      {user.posts && user.posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {user.posts.map((post, index) => (
            <CardWrapper key={index} post={post} author={user.name} />
          ))}
        </div>
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
};

export default Profile;
