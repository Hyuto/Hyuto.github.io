module.exports = {
  siteMetadata: {
    title: `Hyuto's Blog`,
    author: {
      name: `Wahyu Setianto`,
      summary: `a Data Enthusiast who love building a website.`,
    },
    description: `Personal Blog.`,
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
    `gatsby-plugin-image`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
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
    `gatsby-plugin-sharp`,
    //{
    //  resolve: "gatsby-plugin-firebase",
    //  options: {
    //    credentials: {
    //      apiKey: "<YOUR_FIREBASE_API_KEY>",
    //      authDomain: "<YOUR_FIREBASE_AUTH_DOMAIN>",
    //      databaseURL: "<YOUR_FIREBASE_DATABASE_URL>",
    //      projectId: "<YOUR_FIREBASE_PROJECT_ID>",
    //      storageBucket: "<YOUR_FIREBASE_STORAGE_BUCKET>",
    //      messagingSenderId: "<YOUR_FIREBASE_MESSAGING_SENDER_ID>",
    //      appId: "<YOUR_FIREBASE_APP_ID>",
    //    },
    //  },
    //},
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
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.nodes.map(node => {
                return Object.assign({}, node.frontmatter, {
                  description: node.excerpt,
                  date: node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  custom_elements: [{ "content:encoded": node.html }],
                })
              })
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
