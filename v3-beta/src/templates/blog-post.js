import React from "react";
import { Link, graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { FaHome } from "@react-icons/all-files/fa/FaHome";
import { FaLongArrowAltLeft } from "@react-icons/all-files/fa/FaLongArrowAltLeft";
import { FaLongArrowAltRight } from "@react-icons/all-files/fa/FaLongArrowAltRight";
import { FaTags } from "@react-icons/all-files/fa/FaTags";
import Bio from "components/bio";
import Layout from "components/layout";
import Seo from "components/seo";
import ScrollToTop from "components/scroll-up";
import Comments from "components/comments/comments";
import MdXLayout from "components/markdown/markdown";
import TableContent from "components/table-content/table-content";

const BlogPostTemplate = ({ data, location }) => {
  const post = data.mdx;
  const tags = post.frontmatter.tags.split(", ").sort();
  const siteTitle = data.site.siteMetadata?.title || `Title`;
  const { previous, next } = data;

  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <TableContent tableContents={post.tableOfContents} />
      <ScrollToTop />
      <article className="blog-post" itemScope itemType="http://schema.org/Article">
        <header>
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          <p>{post.frontmatter.date}</p>
        </header>
        <MdXLayout>
          <MDXRenderer>{post.body}</MDXRenderer>
        </MdXLayout>
        <div style={{ marginTop: "0", marginBottom: "20px" }}>
          <FaTags />{" "}
          {tags.map((e, index) => {
            return (
              <span key={e}>
                <Link to={`/?tags=${e}`} className="tags-button">
                  {e}
                </Link>
                {index + 1 !== tags.length ? ", " : " "}
              </span>
            );
          })}
        </div>
        <hr />
        <footer>
          <Bio />
        </footer>
      </article>
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li
            style={{
              padding: `0 4px`,
            }}
          >
            {previous && (
              <Link to={`/blog${previous.fields.slug}`} rel="prev">
                <FaLongArrowAltLeft /> {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li
            style={{
              padding: `0 4px`,
            }}
          >
            {next && (
              <Link to={`/blog${next.fields.slug}`} rel="next">
                {next.frontmatter.title} <FaLongArrowAltRight />
              </Link>
            )}
          </li>
        </ul>
        <Link to="/">
          <FaHome /> Back to Home
        </Link>
      </nav>
      <hr style={{ margin: "25px 0" }}></hr>
      <Comments url={location.href} identifier={location.key} title={post.frontmatter.title} />
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($id: String!, $previousPostId: String, $nextPostId: String) {
    site {
      siteMetadata {
        title
      }
    }
    mdx(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
        title
        tags
        date(formatString: "MMMM DD, YYYY")
        description
      }
      tableOfContents(maxDepth: 2)
    }
    previous: mdx(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: mdx(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`;
