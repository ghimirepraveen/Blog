import { useState, useEffect } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Edit = () => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You need to be logged in to edit a blog.");
      navigate("/login");
    } else {
      const fetchBlog = async () => {
        try {
          const response = await axios.get(
            `https://blog-server-au7i.onrender.com/api/post/getbyid/${id}`
          );
          const { title, content, img } = response.data;
          setTitle(title);
          setContent(content);
          setImagePreview(img);
        } catch (err) {
          console.error("Error fetching blog post:", err);
          setError("Failed to fetch blog post data");
        }
      };
      fetchBlog();
    }
  }, [navigate, id]);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImage(null);
      setImagePreview("");
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  const TOKEN = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${TOKEN}`,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("content", content);

    try {
      const response = await axios.put(
        `https://blog-server-au7i.onrender.com/api/post/edit/${id}`,
        formData,
        { headers: { ...headers, "Content-Type": "multipart/form-data" } }
      );
      if (response.data && response.data.id) {
        navigate(`/detail/${response.data.id}`);
      } else {
        setError("Unexpected response from the server");
      }
    } catch (err) {
      console.error("Error details:", err);

      if (err.response) {
        setError(
          err.response.data.message || "An error occurred on the server"
        );
      } else if (err.request) {
        setError("No response received from the server");
      } else {
        setError("An error occurred while submitting the form");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 m-8">
      <div className="mt-10">
        <h1 className="text-2xl font-bold">Edit Blog</h1>
        <form className="mt-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Image
            </label>
            <div
              {...getRootProps()}
              className={`mt-1 p-4 w-full border-2 border-dashed rounded-md cursor-pointer focus:outline-none ${
                isDragActive ? "border-blue-500" : "border-gray-300"
              }`}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p className="text-blue-500">Drop the files here ...</p>
              ) : (
                <p className="text-gray-500">
                  Drag 'n' drop an image here, or click to select one
                </p>
              )}
            </div>
            {imagePreview && (
              <div className="mt-4 w-full flex justify-center">
                <img
                  src={imagePreview}
                  alt="Image Preview"
                  className="max-w-xs max-h-60 rounded-md shadow-md"
                />
              </div>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Content
            </label>
            <ReactQuill
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              value={content}
              onChange={setContent}
              modules={{
                toolbar: [
                  [{ header: "1" }, { header: "2" }, { font: [] }],
                  [{ size: [] }],
                  ["bold", "italic", "underline", "strike", "blockquote"],
                  [
                    { list: "ordered" },
                    { list: "bullet" },
                    { indent: "-1" },
                    { indent: "+1" },
                  ],
                  ["link", "image"],
                  ["clean"],
                ],
              }}
            />
          </div>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            disabled={loading}
          >
            {loading ? "Submitting...." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Edit;