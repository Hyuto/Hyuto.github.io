import React, { useState, useEffect } from "react";
import Hamburger from "hamburger-react";
import * as style from "./table-content.module.scss";

const TableContent = ({ headings }) => {
  const data = headings.map((e) => {
    const lower = e.value.toLowerCase();
    const punctless = lower.replace(/[.,'/#!$%^&*;:{}=_`~()]/g, "");
    return {
      title: e.value.replace(/[.]/g, ""),
      className: punctless.replace(/ /g, "-"),
    };
  });

  const [visible, setVisibility] = useState(null);

  useEffect(() => {
    if (visible !== null) {
      const toggleVisibility = () => {
        if (window.screen.width >= 1240) setVisibility(true);
        else setVisibility(false);
      };
      window.addEventListener("resize", toggleVisibility);
      return () => window.removeEventListener("resize", toggleVisibility);
    } else setVisibility(window.screen.width >= 1240);
  }, [visible]);

  return (
    <>
      {headings && headings.length > 0 && (
        <div className={style.wrapper} style={{ padding: visible ? "10px" : "0px" }}>
          <div className={style.hamburger}>
            <Hamburger toggled={visible} toggle={setVisibility} size={20} rounded />
          </div>
          {visible && (
            <div className={style.main}>
              <div className={style.title}>Table of Contents</div>
              <div className={style.list}>
                {data.map((e, index) => {
                  return (
                    <li key={`table-contents-${index}`} style={{ margin: "2px 0" }}>
                      {index + 1}. <a href={`#${e.className}`}>{e.title}</a>
                    </li>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default TableContent;
