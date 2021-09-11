import React, { useState } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { useLocation } from "@reach/router";
import { GatsbyImage } from "gatsby-plugin-image";
import * as style from "./ti.module.scss";

const TabbedImages = ({ names }) => {
  const location = useLocation().pathname.split("/").join("");
  const data = useStaticQuery(graphql`
    query {
      allFile(filter: { extension: { eq: "png" } }) {
        edges {
          node {
            relativeDirectory
            childImageSharp {
              gatsbyImageData(layout: FULL_WIDTH)
            }
            name
            extension
          }
        }
      }
    }
  `);
  const images = data.allFile.edges.filter(e => {
    if (
      e.node.relativeDirectory === location &&
      names.includes(e.node.name + `.${e.node.extension}`)
    ) {
      return true;
    }
    return false;
  });
  const [selected, setSelected] = useState(0);

  return (
    <div className={style.tiWrapper}>
      <div className={style.nav}>
        {images.map((e, index) => {
          return (
            <button key={`nav-${e.node.name}`} onClick={() => setSelected(index)}>
              {e.node.name.split("_").join(" ")}
            </button>
          );
        })}
      </div>
      <div>
        <GatsbyImage
          key={images[selected].node.name}
          image={images[selected].node.childImageSharp.gatsbyImageData}
          alt={images[selected].node.name}
        />
      </div>
    </div>
  );
};

export default TabbedImages;
