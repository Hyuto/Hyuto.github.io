import React from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import { FaHome } from "react-icons/fa";
import Seo from "../seo";
import "./style.scss";

const Layout = ({ title, description, children }) => {
  const data = useStaticQuery(graphql`
    query ShowcaseQuery {
      site {
        siteMetadata {
          title
          author {
            name
          }
        }
      }
    }
  `);

  return (
    <div className="showcase-wrapper" data-is-root-path={false}>
      <Seo title={title} description={description} />
      <header className="showcase-header">
        <div className="title-wrapper">
          <h3>Showcase</h3>

          <Link to="/" className="home">
            <FaHome size={30} />
          </Link>
        </div>
      </header>
      <main>{children}</main>
      <footer style={{ textAlign: "center" }}>
        <strong>
          © {data.site.siteMetadata?.author.name} {new Date().getFullYear()}
        </strong>
        , Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby.js </a>
        and {"\u2764"}
      </footer>
    </div>
  );
};

export default Layout;
