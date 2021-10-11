import React, { useState } from "react";
import { Disqus } from "gatsby-plugin-disqus";
import * as style from "./comments.module.scss";

const Comments = ({ url, identifier, title }) => {
  const [show, setShow] = useState("none");

  return (
    <div className={style.container}>
      <button onClick={() => setShow(show === "none" ? "block" : "none")}>
        {show === "none" ? "Show" : "Hide"} comments
      </button>
      <div style={{ display: show }}>
        <Disqus
          config={{
            url: url,
            identifier: identifier,
            title: title,
          }}
        />
      </div>
    </div>
  );
};

export default Comments;
