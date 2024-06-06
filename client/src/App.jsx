import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignUpForm from "./pages/Signup";
import LoginForm from "./pages/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Foooter";
import Forgetpassword from "./components/ForgetPasswordd";
import Resetpassword from "./components/ResetPassword";
import Home from "./pages/Home";
import Detail from "./pages/Details";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import Write from "./pages/Write";
import NotFound from "./pages/NotFound";
import SearchResults from "./components/SearchResults";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/search/:query" element={<SearchResults />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/write" element={<Write />} />
          <Route path="/forgotpassword" element={<Forgetpassword />} />
          <Route path="/resetpassword/:token" element={<Resetpassword />} />
          <Route path="*" element={<NotFound />} />

          {/* <Route path="/write" element= /> */}
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
