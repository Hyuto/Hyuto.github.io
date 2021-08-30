module.exports = {
  siteMetadata: {
    title: `Hyuto's Blog`,
    author: {
      name: `Wahyu Setianto`,
      summary: `a Data Enthusiast who love building a website.`,
    },
    description: `Wahyu Setianto Personal Blog.`,
    siteUrl: `https://Hyuto.github.io/`,
    github: {
      username: `Hyuto`,
      link: `https://github.com/Hyuto`,
    },
    social: {
      instagram: {
        username: `hyuto_`,
        link: `https://www.instagram.com/hyuto_/`,
      },
      linkedin: {
        username: `Wahyu Setianto`,
        link: `https://www.linkedin.com/in/wahyu-setianto/`,
      },
    },
  },
  plugins: [
    "gatsby-plugin-use-query-params",
    {
      resolve: "gatsby-plugin-root-import",
      options: {
        main: `${__dirname}/src`,
        showcase: `${__dirname}/content/showcase`,
        components: `${__dirname}/src/components`,
      },
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/content/blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `showcase`,
        path: `${__dirname}/content/showcase`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `@pauliescanlon/gatsby-remark-sticky-table`,
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-transformer-json`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: ["G-L2769CGXGX"],
      },
    },
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: `hyuto`,
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark, allShowcaseJson } }) => {
              const feeds = []

              allMarkdownRemark.nodes.forEach(node => {
                feeds.push(
                  Object.assign({}, node.frontmatter, {
                    description: node.excerpt,
                    date: node.frontmatter.date,
                    url: site.siteMetadata.siteUrl + node.fields.slug,
                    guid: site.siteMetadata.siteUrl + node.fields.slug,
                    custom_elements: [{ "content:encoded": node.html }],
                  })
                )
              })

              allShowcaseJson.edges.forEach(edge => {
                feeds.push({
                  title: edge.node.title,
                  date: edge.node.date,
                  description: edge.node.description,
                  url: site.siteMetadata.siteUrl + `/showcase/${edge.node.slug}`,
                  guid: site.siteMetadata.siteUrl + `/showcase/${edge.node.slug}`,
                  custom_elements: [
                    {
                      "content:encoded": `
                        <div>
                          <h2>${edge.node.title}</h2>
                          <p>${edge.node.description}</p>
                        </div>
                      `,
                    },
                  ],
                })
              })

              return feeds.sort((a, b) =>
                Date.parse(a.date) < Date.parse(b.date)
                  ? 1
                  : Date.parse(b.date) < Date.parse(a.date)
                  ? -1
                  : 0
              )
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  nodes {
                    excerpt
                    html
                    fields {
                      slug
                    }
                    frontmatter {
                      title
                      date
                    }
                  }
                }
                allShowcaseJson(sort: { fields: date, order: DESC }) {
                  edges {
                    node {
                      slug
                      description
                      date
                      tags
                      title
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Hyuto's Blog`,
        short_name: `Hyuto`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-gatsby-cloud`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
