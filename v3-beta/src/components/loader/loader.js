import React from "react";
import * as style from "./loader.module.scss";

const Loader = (props) => {
  return (
    <div className={style.wrapper} {...props}>
      <div className={style.spinner}></div>
      <p>{props.children}</p>
    </div>
  );
};

export default Loader;
