import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/card";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState("");

  useEffect(() => {
    // Fetch data using Axios
    const fetchData = async () => {
      const header = localStorage.getItem("token");

      try {
        const response = await axios.get("http://localhost:8000/api/user/me", {
          headers: {
            Authorization: header,
          },
        });
        setUser(response.data);

        setEditedName(response.data.name);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleNameChange = (e) => {
    setEditedName(e.target.value);
  };

  const saveNameChange = async () => {
    try {
      const response = await axios.put("http://localhost:5000/user", {
        name: editedName,
      });
      setUser(response.data);
      setIsEditingName(false);
    } catch (error) {
      console.error("Error updating name:", error);
    }
  };

  const handleEditPost = (post) => {
    console.log("Edit post:", post);
    // Add logic for editing the post and making an API call
  };

  const handleViewPost = (post) => {
    console.log("View post:", post);
    // Add logic for viewing the post details
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
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
      <p className="mb-4">Email: {user.email}</p>
      {user.posts && user.posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {user.posts.map((post, index) => (
            <div key={index} className="relative">
              <Card
                image={post.img}
                title={post.title}
                author={user.name}
                date={new Date().toLocaleDateString()} // Replace with actual date if available
              />
              <div className="absolute bottom-2 left-2 right-2 flex justify-between">
                <button
                  onClick={() => handleViewPost(post)}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  View
                </button>
                <button
                  onClick={() => handleEditPost(post)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
};

export default Profile;
