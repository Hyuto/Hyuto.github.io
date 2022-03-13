import React from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import { FaHome } from "@react-icons/all-files/fa/FaHome";
import Seo from "components/seo";
import * as style from "style/showcase.module.scss";

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
    <div className={style.showcase} data-is-root-path={false}>
      <Seo title={title} description={description} />
      <header className={style.header}>
        <div className={style.title}>
          <h3>Showcase</h3>

          <Link to="/" className={style.home}>
            <FaHome size={30} />
          </Link>
        </div>
      </header>
      <main>{children}</main>
      <footer className={style.footer}>
        <strong>
          © {data.site.siteMetadata?.author.name.toLowerCase()} {new Date().getFullYear()}
        </strong>
        , built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby.js </a>
        and {"\u2764"}
      </footer>
    </div>
  );
};

export default Layout;
