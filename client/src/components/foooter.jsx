import {
  FaFacebook,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const handleWriteBlogClick = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You need to be logged in to write a blog.");
      navigate("/login");
    } else {
      navigate("/write");
    }
  };

  return (
    <footer className="bg-gray-800 text-white py-8 bottom-0 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between">
        <div className="w-1/3">
          <h3 className="text-lg font-bold">About Us</h3>
          <p className="text-sm mt-2">
            Welcome to BlogMaster, your destination for engaging blog posts
            across various topics. Discover articles on technology, lifestyle,
            travel, and more, written by passionate authors. Explore, read, and
            get inspired with BlogMaster!
          </p>
        </div>

        <div className="w-1/3 flex justify-center">
          <div>
            <h3 className="text-lg font-bold">Links</h3>
            <div className="flex flex-col space-y-2 mt-2">
              <Link to="/" className="text-sm">
                Home
              </Link>
              <Link to="#" onClick={handleWriteBlogClick} className="text-sm">
                Write a Blog
              </Link>
              <Link to="/profile" className="text-sm">
                Profile
              </Link>
            </div>
          </div>
        </div>

        <div className="w-1/3 flex justify-end">
          <div>
            <h3 className="text-lg font-bold">Social Media</h3>
            <div className="flex space-x-4 mt-2">
              <a
                href="https://www.facebook.com/mepraveenghimire/"
                target="_blank"
                className="text-sm"
              >
                <FaFacebook size={30} />
              </a>
              <a
                href="https://www.instagram.com/__smilence__/"
                target="_blank"
                className="text-sm"
              >
                <FaInstagram size={30} />
              </a>
              <a
                href="https://www.linkedin.com/in/praveen-ghimire/"
                target="_blank"
                className="text-sm"
              >
                <FaLinkedinIn size={30} />
              </a>
              <a
                href="https://github.com/ghimirepraveen"
                target="_blank"
                className="text-sm"
              >
                <FaGithub size={30} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
