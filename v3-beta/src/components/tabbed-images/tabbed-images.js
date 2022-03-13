import React, { useState } from "react";
import * as style from "./ti.module.scss";

const TabbedImages = ({ children }) => {
  const [selected, setSelected] = useState(0);
  const names = children.map((e) => {
    let name;
    e.props.children.forEach((element) => {
      if (typeof element !== "string")
        name = element.props.href.split("/").slice(-1)[0].split(".")[0];
    });
    return name;
  });

  return (
    <div className={style.tiWrapper}>
      <div className={style.nav}>
        {names.map((e, index) => {
          return (
            <button key={`nav-${e}`} onClick={() => setSelected(index)}>
              {e.split("_").join(" ")}
            </button>
          );
        })}
      </div>
      <div>{children[selected]}</div>
    </div>
  );
};

export default TabbedImages;
