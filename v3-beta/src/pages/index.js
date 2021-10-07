import React, { useState, useEffect } from "react";
import { Link, graphql } from "gatsby";
import { useQueryParam, ArrayParam, withDefault } from "use-query-params";
import Bio from "components/bio";
import Layout from "components/layout";
import Seo from "components/seo";
import { FaTags } from "@react-icons/all-files/fa/FaTags";
import { FaRssSquare } from "@react-icons/all-files/fa/FaRssSquare";
import { FaWindowClose } from "@react-icons/all-files/fa/FaWindowClose";
import * as rssStyle from "style/br-icon.module.scss";

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`;
  const [posts] = useState([
    ...data.allMdx.nodes.map(blog => {
      return {
        tipe: "blog",
        title: blog.frontmatter.title || blog.fields.slug,
        slug: blog.fields.slug,
        link: blog.fields.slug,
        lang: blog.frontmatter.lang,
        date: blog.frontmatter.date,
        description: blog.frontmatter.description || blog.excerpt,
        tags: blog.frontmatter.tags.split(", ").sort(),
      };
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
      };
    }),
  ]);
  const [tags, setTags] = useQueryParam("tags", withDefault(ArrayParam, []));
  const [postFiltered, setPostfiltered] = useState(posts);

  useEffect(() => {
    if (tags.length !== 0) {
      setPostfiltered(posts.filter(e => tags.every(val => e.tags.includes(val))));
    } else setPostfiltered(posts);
  }, [tags, posts]);

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title={tags.length === 0 ? "All posts" : tags.join(", ")} />
      <Bio />
      <div className="filter">
        {tags.length !== 0
          ? tags.map(e => (
              <span key={e}>
                <FaWindowClose
                  onClick={() => setTags(tags.filter(element => (element !== e ? true : false)))}
                  style={{ cursor: "pointer" }}
                />
                {" " + e}
              </span>
            ))
          : null}
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
                    <header style={{ marginBottom: `12px` }}>
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
                      <small style={{ marginTop: `5px` }}>
                        {post.tipe === "blog" ? (
                          <span>
                            <span
                              style={{
                                padding: `3px`,
                                color: `white`,
                                backgroundColor: `black`,
                                borderRadius: `3px`,
                              }}
                            >
                              {post.lang.toUpperCase()}
                            </span>
                            {"  "}
                          </span>
                        ) : null}
                        {post.date}
                      </small>
                    </section>
                    <div style={{ marginTop: "5px" }}>
                      <small>
                        <FaTags />{" "}
                        {post.tags.map((e, index) => {
                          return (
                            <span key={index}>
                              <button
                                className="tags-button"
                                onClick={() => (!tags.includes(e) ? setTags([...tags, e]) : null)}
                                style={{
                                  textDecoration:
                                    tags.length !== 0 && tags.includes(e) ? "underline" : "none",
                                }}
                              >
                                {e}
                              </button>
                              {index + 1 !== post.tags.length ? ", " : " "}
                            </span>
                          );
                        })}
                      </small>
                    </div>
                  </article>
                </li>
              );
            })}
        </ol>
      )}
      <div className={rssStyle.outerWrapper}>
        <a href="./rss.xml" className={rssStyle.innerWrapper}>
          <FaRssSquare size={25} />
          <span className={rssStyle.text}>RSS</span>
        </a>
      </div>
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          description
          lang
          title
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
`;
