import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignUpForm from "./pages/signup";
import LoginForm from "./pages/login";
import Navbar from "./components/navbar";
import Footer from "./components/foooter";
import Home from "./pages/home";
import Detail from "./pages/details";
import Profile from "./pages/profile";
import ChangePassword from "./pages/changepassword";
import Write from "./pages/write";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />

          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/write" element={<Write />} />
          <Route path="*" element={<h1>Not Found</h1>} />

          {/* <Route path="/write" element= /> */}
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
