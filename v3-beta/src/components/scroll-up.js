import React, { useEffect, useState } from "react";
import { FaArrowCircleUp } from "@react-icons/all-files/fa/FaArrowCircleUp";
import * as style from "style/br-icon.module.scss";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(null);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
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
    <div className={style.outerWrapper}>
      {isVisible && (
        <button onClick={scrollToTop} className={style.innerWrapper}>
          <FaArrowCircleUp size={25} />
          <span className={style.text}>Go Up!</span>
        </button>
      )}
    </div>
  );
};

export default ScrollToTop;
