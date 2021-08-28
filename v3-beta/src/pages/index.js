import * as React from "react"
import { Link, graphql } from "gatsby"
import { FaTags } from "react-icons/fa"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = []

  data.allMarkdownRemark.nodes.forEach(blog => {
    const data = {
      tipe: "blog",
      title: blog.frontmatter.title || blog.fields.slug,
      slug: blog.fields.slug,
      link: blog.fields.slug,
      date: blog.frontmatter.date,
      description: blog.frontmatter.description || blog.excerpt,
      tags: blog.frontmatter.tags.split(", ").sort().join(", "),
    }

    posts.push(data)
  })

  data.allShowcaseJson.edges.forEach(showcase => {
    const data = {
      tipe: "showcase",
      title: showcase.node.title,
      slug: showcase.node.slug,
      link: `showcase/${showcase.node.slug}`,
      date: showcase.node.date,
      description: showcase.node.description,
      tags: showcase.node.tags.sort().join(", "),
    }

    posts.push(data)
  })

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="All posts" />
        <Bio />
        <p style={{ margin: "20px 0", textAlign: "center" }}>No blog posts.</p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="All posts" />
      <Bio />
      <ol style={{ listStyle: `none` }}>
        {posts
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
                      <FaTags /> {post.tags}
                    </small>
                  </div>
                </article>
              </li>
            )
          })}
      </ol>
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
