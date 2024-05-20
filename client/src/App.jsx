import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignUpForm from "./pages/signup";
import LoginForm from "./pages/login";
import Navbar from "./components/navbar";
import Footer from "./components/foooter";
import Home from "./pages/home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Home />

        <Routes>
          <Route path="/" />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
