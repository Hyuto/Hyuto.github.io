import React, { useEffect, useState } from "react";
import { FaArrowCircleUp } from "react-icons/fa";
import "main/bottom-right-icon.scss";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(null);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (isVisible !== null) {
      const toggleVisibility = () => {
        if (window.pageYOffset > 300) setIsVisible(true);
        else setIsVisible(false);
      };
      window.addEventListener("scroll", toggleVisibility);
      return () => window.removeEventListener("scroll", toggleVisibility);
    } else setIsVisible(window.pageYOffset > 300);
  }, [isVisible]);

  return (
    <div className="bottom-right-icon">
      {isVisible && (
        <button className="wrapper" onClick={scrollToTop}>
          <FaArrowCircleUp size={25} />
          <span className="text">Go Up!</span>
        </button>
      )}
    </div>
  );
};

export default ScrollToTop;
