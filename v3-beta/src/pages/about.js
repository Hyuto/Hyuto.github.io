// If you don't want to use TypeScript you can delete this file!
import * as React from "react";
import { Link, graphql } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import Layout from "components/layout";
import Seo from "components/seo";
import { FaHome } from "@react-icons/all-files/fa/FaHome";
import { FaGithub } from "@react-icons/all-files/fa/FaGithub";
import { FaKaggle } from "@react-icons/all-files/fa/FaKaggle";
import { FaLinkedin } from "@react-icons/all-files/fa/FaLinkedin";
import * as style from "style/about.module.scss";

const About = ({ data, location }) => {
  const author = data.site.siteMetadata?.author.name;
  const social = data.site.siteMetadata?.social;

  return (
    <Layout title={data.site.siteMetadata?.title} location={location}>
      <Seo title={author} description={`About ${author}`} />
      <h1 className={style.title}>About Me!</h1>

      <div className={style.about}>
        <div className={style.header}>
          <StaticImage
            className={style.profilePic}
            layout="fixed"
            formats={["png"]}
            src="../images/profile-pic.png"
            height={200}
            width={200}
            quality={80}
            alt="Profile picture"
          />
          <h3>{author}</h3>
          <div className={style.social}>
            <li key="github">
              <a href={social.github.link}>
                <FaGithub size={25} />{" "}
              </a>
            </li>
            <li key="kaggle">
              <a href={social.kaggle.link}>
                <FaKaggle size={25} />{" "}
              </a>
            </li>
            <li key="linkedin">
              <a href={social.linkedin.link}>
                <FaLinkedin size={25} />
              </a>
            </li>
          </div>
        </div>
        <div className={style.desc}>
          <p>
            Final year student at the State University of Jakarta majoring in statistics. As a
            statistics student I have a lot of experience in processing data to gain insights and
            solve problems. I have deep experience in Python and R and few other programming
            language like Javascript and C++. I love building deep learning models to solve a
            problems. I'm interested on Data Science and Web Development
          </p>
        </div>
        <div className={style.cv}>
          <a href="./CV_Wahyu.pdf" target="_blank">
            View my resume
          </a>
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
        social {
          github {
            link
          }
          kaggle {
            link
          }
          linkedin {
            link
          }
        }
      }
    }
  }
`;
