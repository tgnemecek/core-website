const path = require("path");

module.exports = {
  siteMetadata: {
    title: "CORE Coaching & Consulting",
    siteUrl: process.env.GATSBY_SITE_URL,
    description: "CORE Coaching & Consulting",
  },
  proxy: {
    prefix: "/.netlify/functions",
    url: "http://localhost:8888",
  },
  flags: {
    PRESERVE_WEBPACK_CACHE: true,
    DEV_SSR: true,
    FAST_REFRESH: true,
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-material-ui",
    "gatsby-plugin-sass",
    {
      resolve: "gatsby-plugin-typescript",
      options: {
        isTSX: true,
        allExtensions: true,
      },
    },

    {
      resolve: "gatsby-plugin-sitemap",
      // options: {
      //   output: "",
      // },
    },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: "https://www.corecoachingconsulting.com",
      },
    },
    {
      resolve: "gatsby-plugin-root-import",
      options: {
        components: path.join(__dirname, "src/components"),
        src: path.join(__dirname, "src"),
        utils: path.join(__dirname, "src/utils"),
        types: path.join(__dirname, "src/types"),
      },
    },
    {
      // keep as first gatsby-source-filesystem plugin for gatsby image support
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/static/img`,
        name: "uploads",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/collections/pages`,
        name: "pages",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/collections/settings`,
        name: "settings",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/collections/events`,
        name: "events",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/img`,
        name: "images",
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-copy-linked-files",
            options: {
              destinationDir: "static",
            },
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-netlify-cms",
      options: {
        modulePath: `${__dirname}/src/cms/index.tsx`,
        manualInit: true,
      },
    },
    "gatsby-plugin-netlify", // make sure to keep it last in the array
  ],
};
