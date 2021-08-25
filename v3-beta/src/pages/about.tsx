// If you don't want to use TypeScript you can delete this file!
import * as React from "react"
import { PageProps, Link, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

import "../about.scss"

type DataProps = {
  site: {
    siteMetadata: {
      title: string,
      author: {
        name: string
      },
      github: {
        username: string,
        link: string,
      },
      social: {
        linkedin: {
          username: string,
          link: string,
        },
        instagram: {
          username: string,
          link: string,
        }
      }
    }
  }
}

const About: React.FC<PageProps<DataProps>> = ({
  data,
  location,
}) => {
  const author = data.site.siteMetadata?.author.name
  const github = data.site.siteMetadata?.github
  const social = data.site.siteMetadata?.social

  return (
    <Layout title={data.site.siteMetadata?.title} location={location}>
      <Seo title={author} />
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
            quality={95}
            alt="Profile picture"
          />
          <h3>{author}</h3>
        </div>
        <div className="desc">
          <p>
            Third year student at the State University of Jakarta majoring in statistics.
            As a statistics student I have a lot of experience in processing data to gain insights
            and solve problems. I have deep experience in Python and R and few other programming
            language like Javascript and C++. I love building deep learning models to solve a
            problems. I'm interested on Data Science and Web Development
          </p>
        </div>
        <div className="social">
          <li className="github">Github : <a href={github.link}>{github.username}</a></li>
          <li className="linkedin">Linked in : <a href={social.linkedin.link}>{social.linkedin.username}</a></li>
          <li className="instagram">Instagram : <a href={social.instagram.link}>{social.instagram.username}</a></li>
        </div>
      </div>
      <Link to="/">Go back to the homepage</Link>
    </Layout>
  )
}

export default About

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
`
