import React from "react";
import * as style from "./table-content.module.scss";

const TableContent = ({ headings }) => {
  if (headings === undefined) return null;
  if (headings.length === 0) return null;

  const data = headings.map(e => {
    const lower = e.value.toLowerCase();
    const punctless = lower.replace(/[.,'/#!$%^&*;:{}=_`~()]/g, "");
    return {
      title: e.value.replace(/[.]/g, ""),
      className: punctless.replace(/ /g, "-"),
    };
  });

  return (
    <div className={style.wrapper}>
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
  );
};

export default TableContent;
