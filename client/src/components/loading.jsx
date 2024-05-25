//import a json file for amination
import lottie from "lottie-web";
import loading from "../assets/Animation - 1716530599669.json";
import React, { useEffect } from "react";

const Loading = () => {
  useEffect(() => {
    lottie.loadAnimation({
      container: document.getElementById("loading"),
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: loading,
      overflowHidden: true,
    });
  }, []);

  return (
    <div className="flex justify-center  items-center h-1/2 overflow-hidden">
      <div id="loading"></div>
    </div>
  );
};
export default Loading;
