import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { Link } from "gatsby";

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
        }
      }
    }
  `);
  const author = data.site.siteMetadata?.author;

  return (
    <div className="bio">
      <Link to="/about">
        <StaticImage
          className="bio-avatar"
          layout="fixed"
          formats={["AUTO", "WEBP", "AVIF"]}
          src="../images/profile-pic.png"
          width={50}
          height={50}
          quality={95}
          alt="Profile picture"
        />
      </Link>
      {author?.name && (
        <p>
          Written by <strong>{author.name}</strong> {author?.summary || null}
          {` `}
          <Link to="/about">About me!</Link>
        </p>
      )}
    </div>
  );
};

export default Bio;
