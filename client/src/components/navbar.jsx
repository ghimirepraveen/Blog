import { axios } from "axios";
import { useState, useEffect, useRef } from "react";
import { CgProfile } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const debounceTimeoutRef = useRef(null);
  const history = useNavigate();

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    history("/");
  };

  const handleSearch = async (query) => {
    if (query) {
      const response = await axios.post(`search?query=${query}`);
      const data = await response.json();
      console.log(data);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    debounceTimeoutRef.current = setTimeout(() => {
      handleSearch(searchTerm);
    }, 3000);

    return () => clearTimeout(debounceTimeoutRef.current);
  }, [searchTerm]);

  const handleLoginClick = () => {
    history("/login");
  };

  const handleSignupClick = () => {
    history("/signup");
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="font-bold ">
              <h4 className="text-4xl">
                <span className="text-indigo-500">Bl</span>
                <span>og</span>
              </h4>
            </Link>
          </div>
          <div className="flex w-80 items-center">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex w-full max-w-md mx-auto"
            >
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </form>
          </div>
          <div className="flex items-center relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition"
            >
              <CgProfile size={30} />
            </button>
            {dropdownOpen && (
              <div className="origin-top-right absolute right-0 mt-20 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                <button
                  onClick={handleLoginClick}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  Login
                </button>
                <button
                  onClick={handleSignupClick}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  Sign Up
                </button>
                <button
                  onClick={handleLogoutClick}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  Logout
                </button>
                <button>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    Profile
                  </Link>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
