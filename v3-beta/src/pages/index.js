import React, { useState, useEffect } from "react"
import { Link, graphql } from "gatsby"
import { FaTags, FaRssSquare, FaWindowClose } from "react-icons/fa"
import { useQueryParam, StringParam } from "use-query-params"
import Bio from "components/bio"
import Layout from "components/layout"
import Seo from "components/seo"
import "main/index.scss"
import "main/bottom-right-icon.scss"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const [posts] = useState([
    ...data.allMarkdownRemark.nodes.map(blog => {
      return {
        tipe: "blog",
        title: blog.frontmatter.title || blog.fields.slug,
        slug: blog.fields.slug,
        link: blog.fields.slug,
        date: blog.frontmatter.date,
        description: blog.frontmatter.description || blog.excerpt,
        tags: blog.frontmatter.tags.split(", ").sort(),
      }
    }),
    ...data.allShowcaseJson.edges.map(showcase => {
      return {
        tipe: "showcase",
        title: showcase.node.title,
        slug: showcase.node.slug,
        link: `showcase/${showcase.node.slug}`,
        date: showcase.node.date,
        description: showcase.node.description,
        tags: showcase.node.tags.sort(),
      }
    }),
  ])
  const [filter, setFilter] = useQueryParam("tags", StringParam)
  const [postFiltered, setPostfiltered] = useState(posts)

  useEffect(() => {
    if (filter !== undefined)
      setPostfiltered(
        posts.filter(e => {
          if (e.tags.includes(filter)) return true
          return false
        })
      )
    else setPostfiltered(posts)
  }, [filter, posts])

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title={filter === undefined ? "All posts" : filter} />
      <Bio />
      <div className="filter">
        {filter !== undefined ? (
          <span>
            <FaWindowClose onClick={() => setFilter(undefined)} style={{ cursor: "pointer" }} />
            {" " + filter}
          </span>
        ) : null}
      </div>
      {postFiltered.length === 0 ? (
        <p style={{ margin: "20px 0", textAlign: "center" }}>No blog posts.</p>
      ) : (
        <ol style={{ listStyle: `none`, margin: "5px 0" }}>
          {postFiltered
            .sort((a, b) =>
              Date.parse(a.date) < Date.parse(b.date)
                ? 1
                : Date.parse(b.date) < Date.parse(a.date)
                ? -1
                : 0
            )
            .map(post => {
              return (
                <li key={post.slug}>
                  <article
                    className="post-list-item"
                    itemScope
                    itemType="http://schema.org/Article"
                  >
                    <header>
                      <h2 style={{ lineHeight: "1.4" }}>
                        {post.tipe === "showcase" ? (
                          <span
                            style={{
                              padding: "5px",
                              color: "white",
                              backgroundColor: "black",
                              borderRadius: "5px",
                            }}
                          >
                            Showcase
                          </span>
                        ) : null}{" "}
                        <Link to={post.link} itemProp="url">
                          <span itemProp="headline">{post.title}</span>
                        </Link>
                      </h2>
                    </header>
                    <section>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: post.description,
                        }}
                        itemProp="description"
                      />
                      <small>{post.date}</small>
                    </section>
                    <div style={{ marginTop: "10px" }}>
                      <small>
                        <FaTags />{" "}
                        {post.tags.map((e, index) => {
                          return (
                            <span key={index}>
                              <button className="tags-button" onClick={() => setFilter(e)}>
                                {e}
                              </button>
                              {index + 1 !== post.tags.length ? ", " : " "}
                            </span>
                          )
                        })}
                      </small>
                    </div>
                  </article>
                </li>
              )
            })}
        </ol>
      )}
      <div className="bottom-right-icon">
        <Link to="/rss.xml" className="wrapper">
          <FaRssSquare size={25} />
          <span className="text">RSS</span>
        </Link>
      </div>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          tags
        }
      }
    }
    allShowcaseJson(sort: { fields: date, order: DESC }) {
      edges {
        node {
          slug
          description
          date(formatString: "MMMM DD, YYYY")
          tags
          title
        }
      }
    }
  }
`
