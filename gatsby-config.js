const path = require("path");
<<<<<<< HEAD
// const { generateConfig } = require("gatsby-plugin-ts-config");

const projectRoot = __dirname;

=======

>>>>>>> @{-1}
module.exports = {
  siteMetadata: {
    title: "CORE Coaching & Consulting",
    siteUrl: process.env.GATSBY_SITE_URL,
    description: "CORE Coaching & Consulting",
  },
  proxy: {
    prefix: "/.netlify/functions",
<<<<<<< HEAD
    url: `${
      process.env.NODE_ENV === "develop"
        ? "http://localhost"
        : process.env.GATSBY_SITE_URL
    }:8888`,
  },
  flags: {
    PRESERVE_WEBPACK_CACHE: true,
=======
    url: "http://localhost:8888",
  },
  flags: {
    PRESERVE_WEBPACK_CACHE: true,
    DEV_SSR: true,
>>>>>>> @{-1}
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
<<<<<<< HEAD
    // "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: process.env.GATSBY_SITE_URL,
=======

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
>>>>>>> @{-1}
      },
    },
    {
      resolve: "gatsby-plugin-root-import",
      options: {
<<<<<<< HEAD
        components: path.join(projectRoot, "src/components"),
        src: path.join(projectRoot, "src"),
        utils: path.join(projectRoot, "src/utils"),
        types: path.join(projectRoot, "src/types"),
=======
        components: path.join(__dirname, "src/components"),
        src: path.join(__dirname, "src"),
        utils: path.join(__dirname, "src/utils"),
        types: path.join(__dirname, "src/types"),
>>>>>>> @{-1}
      },
    },
    {
      // keep as first gatsby-source-filesystem plugin for gatsby image support
      resolve: "gatsby-source-filesystem",
      options: {
<<<<<<< HEAD
        path: `${projectRoot}/static/img`,
=======
        path: `${__dirname}/static/img`,
>>>>>>> @{-1}
        name: "uploads",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
<<<<<<< HEAD
        path: `${projectRoot}/src/collections/pages`,
=======
        path: `${__dirname}/src/collections/pages`,
>>>>>>> @{-1}
        name: "pages",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
<<<<<<< HEAD
        path: `${projectRoot}/src/collections/settings`,
=======
        path: `${__dirname}/src/collections/settings`,
>>>>>>> @{-1}
        name: "settings",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
<<<<<<< HEAD
        path: `${projectRoot}/src/collections/events`,
=======
        path: `${__dirname}/src/collections/events`,
>>>>>>> @{-1}
        name: "events",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
<<<<<<< HEAD
        path: `${projectRoot}/src/collections/posts`,
        name: "posts",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${projectRoot}/src/img`,
=======
        path: `${__dirname}/src/img`,
>>>>>>> @{-1}
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
<<<<<<< HEAD
        modulePath: `${projectRoot}/src/cms/index.tsx`,
=======
        modulePath: `${__dirname}/src/cms/index.tsx`,
>>>>>>> @{-1}
        manualInit: true,
      },
    },
    "gatsby-plugin-netlify", // make sure to keep it last in the array
  ],
};
