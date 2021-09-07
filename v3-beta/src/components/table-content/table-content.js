import React from "react";
import * as style from "./table-content.module.scss";

const TableContent = ({ headings }) => {
  const data = headings.map(e => {
    const lower = e.value.toLowerCase();
    const punctless = lower.replace(/[.,'/#!$%^&*;:{}=_`~()]/g, "");
    return {
      title: e.value.replace(/[0123456789.]/g, ""),
      className: punctless.replaceAll(" ", "-"),
    };
  });

  return (
    <div className={style.wrapper} style={{ display: data.length > 0 ? "block" : "none" }}>
      <div className={style.title}>Table of Contents</div>
      <div className={style.list}>
        {data.map((e, index) => {
          return (
            <li key={`table-contents-${index}`}>
              <a href={`#${e.className}`}>{e.title}</a>
            </li>
          );
        })}
      </div>
    </div>
  );
};

export default TableContent;
