// If you don't want to use TypeScript you can delete this file!
import * as React from "react";
import { Link, graphql } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { FaHome } from "@react-icons/all-files/fa/FaHome";
import { FaGithub } from "@react-icons/all-files/fa/FaGithub";
import { FaKaggle } from "@react-icons/all-files/fa/FaKaggle";
import { FaLinkedin } from "@react-icons/all-files/fa/FaLinkedin";
import Layout from "components/layout";
import Seo from "components/seo";
import * as style from "./about.module.scss";

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
            src="../../images/profile-pic.png"
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
            I am a Data Enthusiast who has a deep interest in data field. I believe with decision
            made based on data can have more impact in solving problems in real world. I have a lot
            of experience in processing data to gain insight and solve problems with various method
            (such as machine learning, deep learning, nlp, etc.). I have deep knowledge on several
            data analysis tools such as Python and R. I am also interested in web development to
            create a website as a hobby.
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
