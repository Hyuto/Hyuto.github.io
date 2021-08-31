// If you don't want to use TypeScript you can delete this file!
import * as React from "react";
import { Link, graphql } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { FaHome, FaGithub, FaLinkedin, FaInstagramSquare } from "react-icons/fa";
import Layout from "components/layout";
import Seo from "components/seo";
import "main/about.scss";

const About = ({ data, location }) => {
  const author = data.site.siteMetadata?.author.name;
  const github = data.site.siteMetadata?.github;
  const social = data.site.siteMetadata?.social;

  return (
    <Layout title={data.site.siteMetadata?.title} location={location}>
      <Seo title={author} description={`About ${author}`} />
      <h1 className="about-title">About Me!</h1>

      <div className="about">
        <div className="header">
          <StaticImage
            className="profile-pic"
            layout="fixed"
            formats={["png"]}
            src="../images/profile-pic.png"
            height={200}
            width={200}
            quality={80}
            alt="Profile picture"
          />
          <h3>{author}</h3>
          <div className="social">
            <li className="github">
              <a href={github.link}>
                <FaGithub size={25} />{" "}
              </a>
            </li>
            <li className="linkedin">
              <a href={social.linkedin.link}>
                <FaLinkedin size={25} />
              </a>
            </li>
            <li className="instagram">
              <a href={social.instagram.link}>
                <FaInstagramSquare size={25} />
              </a>
            </li>
          </div>
        </div>
        <div className="desc">
          <p>
            Third year student at the State University of Jakarta majoring in statistics. As a
            statistics student I have a lot of experience in processing data to gain insights and
            solve problems. I have deep experience in Python and R and few other programming
            language like Javascript and C++. I love building deep learning models to solve a
            problems. I'm interested on Data Science and Web Development
          </p>
        </div>
      </div>
      <Link to="/">
        <span>
          <FaHome /> Go back to the homepage
        </span>
      </Link>
    </Layout>
  );
};

export default About;

export const AboutQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        author {
          name
        }
        github {
          username
          link
        }
        social {
          linkedin {
            username
            link
          }
          instagram {
            username
            link
          }
        }
      }
    }
  }
`;
