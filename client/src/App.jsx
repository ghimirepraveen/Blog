import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignUpForm from "./pages/signup";
import LoginForm from "./pages/login";
import Navbar from "./components/footer";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
