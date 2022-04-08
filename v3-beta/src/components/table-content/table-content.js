import React, { useState, useEffect } from "react";
import Hamburger from "hamburger-react";
import * as style from "./table-content.module.scss";

const TableContent = ({ headings }) => {
  // Todo Using tableContents
  const data = headings
    .filter((e) => e.depth <= 2) // filter only h1 and h2
    .map((e) => {
      const lower = e.value.toLowerCase();
      const punctless = lower.replace(/[.,'/#!$%^&*;:{}=_`~()]/g, "");
      return {
        title: e.value.replace(/[.]/g, ""),
        className: punctless.replace(/ /g, "-"),
        depth: e.depth,
      };
    });
  const [visible, setVisibility] = useState(null);
  let lastDepth = 0,
    lastIndex = [0, 0];

  const updateIndex = (element) => {
    // Bad logic but works,
    if (lastDepth === 0) lastIndex[0]++;
    else if (lastDepth < element.depth) lastIndex[1]++;
    else if (lastDepth > element.depth) {
      lastIndex[0]++;
      lastIndex[1] = 0;
    } else if (lastIndex[1] !== 0) lastIndex[1]++;
    else if (lastIndex[1] === 0) lastIndex[0]++;
    lastDepth = element.depth;
  };

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
              <div className={style.title}>On this page</div>
              <ol className={style.list}>
                {data.map((e, index) => {
                  updateIndex(e);

                  return (
                    <li key={`table-contents-${index}`} style={{ margin: "2px 0" }}>
                      {`${lastIndex[0]}.${lastIndex[1] !== 0 ? `${lastIndex[1]}.` : ""} `}
                      <a href={`#${e.className}`}>{e.title}</a>
                    </li>
                  );
                })}
              </ol>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default TableContent;
