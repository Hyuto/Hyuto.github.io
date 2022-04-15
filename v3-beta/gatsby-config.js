module.exports = {
  siteMetadata: {
    title: `Hyuto's Blog`,
    author: {
      name: `Wahyu Setianto`,
      summary: `a Data Enthusiast who love building a website.`,
    },
    description: `Wahyu Setianto Personal Blog.`,
    siteUrl: `https://Hyuto.github.io/`,
    social: {
      github: {
        link: `https://github.com/Hyuto`,
      },
      kaggle: {
        link: `https://www.kaggle.com/wahyusetianto`,
      },
      linkedin: {
        link: `https://www.linkedin.com/in/wahyu-setianto/`,
      },
    },
  },
  plugins: [
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-image`,
    `gatsby-remark-images`,
    `gatsby-transformer-json`,
    "gatsby-plugin-use-query-params",
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: `black`,
        showSpinner: true,
      },
    },
    {
      resolve: "gatsby-plugin-root-import",
      options: {
        main: `${__dirname}/src`,
        style: `${__dirname}/src/style`,
        showcase: `${__dirname}/src/content/showcase`,
        components: `${__dirname}/src/components`,
        templates: `${__dirname}/src/templates`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/src/content/blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `showcase`,
        path: `${__dirname}/src/content/showcase`,
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
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`],
        remarkPlugins: [import("remark-math")],
        gatsbyRemarkPlugins: [
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
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              icon: false,
            },
          },
          `gatsby-remark-copy-linked-files`,
        ],
      },
    },
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
    /* {
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
            serialize: ({ query: { site, allMdx, allShowcaseJson } }) => {
              const feeds = [];

              allMdx.edges.forEach((edge) => {
                feeds.push(
                  Object.assign({}, edge.node.frontmatter, {
                    description: edge.node.excerpt,
                    date: edge.node.frontmatter.date,
                    url: site.siteMetadata.siteUrl + `/blog${edge.node.fields.slug}`,
                    guid: site.siteMetadata.siteUrl + `/blog${edge.node.fields.slug}`,
                    custom_elements: [{ "content:encoded": edge.node.html }],
                  })
                );
              });

              console.log(feeds);

              allShowcaseJson.edges.forEach((edge) => {
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
                });
              });

              return feeds.sort((a, b) =>
                Date.parse(a.date) < Date.parse(b.date)
                  ? 1
                  : Date.parse(b.date) < Date.parse(a.date)
                  ? -1
                  : 0
              );
            },
            query: `
              {
                allMdx(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
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
    }, */
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Hyuto's Blog`,
        short_name: `Hyuto`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-webpack-bundle-analyser-v2`,
      options: {
        analyzerMode: `static`,
        reportFilename: `../build-report.html`,
      },
    },
  ],
};
