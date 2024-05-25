import { useEffect } from "react";
import lottie from "lottie-web";
import loading from "../assets/Animation - 1716530599669.json";

const Loading = () => {
  useEffect(() => {
    lottie.loadAnimation({
      container: document.getElementById("loading"),
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: loading,
    });
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <div id="loading" className="w-full h-full max-w-lg max-h-lg"></div>
    </div>
  );
};

export default Loading;
