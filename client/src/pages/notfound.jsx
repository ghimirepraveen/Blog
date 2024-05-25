import Notfound from "../assets/404notfound.json";
import { useEffect } from "react";
import lottie from "lottie-web";

const NotFound = () => {
  useEffect(() => {
    const animation = lottie.loadAnimation({
      container: document.getElementById("Notfound"),
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: Notfound,
    });

    return () => {
      animation.destroy();
    };
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <div id="Notfound" className="w-full h-fit max-w-lg max-h-lg"></div>
    </div>
  );
};

export default NotFound;
