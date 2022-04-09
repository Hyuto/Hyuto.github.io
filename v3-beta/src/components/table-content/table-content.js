import React, { useState, useEffect } from "react";
import Hamburger from "hamburger-react";
import * as style from "./table-content.module.scss";

const TableContent = ({ tableContents }) => {
  const [visible, setVisibility] = useState(null);

  // if first heading is h2 and there is h1 after that
  // make h2 is on the same "ol" tag with h1
  if (tableContents.items.length > 1 && tableContents.items[0].url === undefined) {
    const temp = tableContents.items.shift();
    tableContents.items = temp.items.concat(tableContents.items);
  }

  const GenerateList = (tableContents, count = 1) => {
    return (
      <ol className={count === 1 ? style.firstOL : null}>
        {tableContents.items.map((element, index) => {
          return (
            <div key={`table-contents-${count}-${index}`}>
              {element.url ? (
                <li style={{ margin: "2px 0" }}>
                  <a href={element.url}>{element.title}</a>
                </li>
              ) : null}
              {element.items ? GenerateList(element, count + 1) : null}
            </div>
          );
        })}
      </ol>
    );
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
      {tableContents.items && tableContents.items.length > 0 && (
        <div className={style.wrapper} style={{ padding: visible ? "10px" : "0px" }}>
          <div className={style.hamburger}>
            <Hamburger toggled={visible} toggle={setVisibility} size={20} rounded />
          </div>
          {visible && (
            <div className={style.main}>
              <div className={style.title}>On this page</div>
              <div className={style.list}>{GenerateList(tableContents)}</div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default TableContent;
