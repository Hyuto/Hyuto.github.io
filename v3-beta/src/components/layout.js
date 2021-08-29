import * as React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  const data = useStaticQuery(graphql`
    query LayoutQuery {
      site {
        siteMetadata {
          author {
            name
          }
        }
      }
    }
  `)

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>
    )
  } else {
    header = (
      <Link className="header-link-home" to="/">
        {title}
      </Link>
    )
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">{header}</header>
      <main>{children}</main>
      <footer style={{ paddingTop: "10px", textAlign: "center" }}>
        <strong>
          &copy; {new Date().getFullYear()} {data.site.siteMetadata?.author.name.toLowerCase()}
        </strong>
        , v3 built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby.js </a>
        and {"\u2764"}
      </footer>
    </div>
  )
}

export default Layout
