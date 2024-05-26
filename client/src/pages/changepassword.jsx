import { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const [backendError, setBackendError] = useState(null);

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const TOKEN = localStorage.getItem("token");

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      };

      const response = await Axios.post(
        "https://blog-server-au7i.onrender.com/api/user/changepassword",
        formData,
        { headers }
      );

      const token = response.data.token;

      localStorage.setItem("token", token);
      navigate("/login");
    } catch (error) {
      if (error.response) {
        const backendErrorMessage =
          error.response.data?.error || "An error occurred";
        console.log("Backend error:", backendErrorMessage);

        setBackendError(backendErrorMessage);
      } else {
        setBackendError("An error occurred while submitting the form");
      }

      console.error("Error submitting the form", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Change Password</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Old Password
            </label>
            <input
              type="password"
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
              required
              className="block w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              required
              className="block w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Change Password
            </button>
          </div>
        </form>

        {backendError && (
          <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
            {backendError}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChangePassword;
