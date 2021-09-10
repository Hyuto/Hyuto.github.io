import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { useLocation } from "@reach/router";
import Img from "gatsby-image";

const TabbedImages = ({ names }) => {
  const location = useLocation();
  const data = useStaticQuery(graphql`
    query {
      allFile(filter: { extension: { eq: "png" } }) {
        edges {
          node {
            relativeDirectory
            childrenImageSharp {
              fluid(maxWidth: 630) {
                ...GatsbyImageSharpFluid
                originalName
              }
            }
          }
        }
      }
    }
  `);
  const dir = location.pathname.split("/").join("");
  const images = data.allFile.edges.filter(e => {
    if (
      e.node.relativeDirectory === dir &&
      names.includes(e.node.childrenImageSharp[0].fluid.originalName)
    ) {
      return true;
    }
    return false;
  });

  return (
    <div>
      {images.map(e => {
        return <Img fluid={e.node.childrenImageSharp[0].fluid} />;
      })}
    </div>
  );
};

export default TabbedImages;
