import path from "path";

const config = ({ projectRoot }: Record<string, string>) => {
  return {
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
      "gatsby-plugin-sitemap",
      {
        resolve: "gatsby-plugin-robots-txt",
        options: {
          host: "https://www.corecoachingconsulting.com",
        },
      },
      {
        resolve: "gatsby-plugin-root-import",
        options: {
          components: path.join(projectRoot, "src/components"),
          src: path.join(projectRoot, "src"),
          utils: path.join(projectRoot, "src/utils"),
          types: path.join(projectRoot, "src/types"),
        },
      },
      {
        // keep as first gatsby-source-filesystem plugin for gatsby image support
        resolve: "gatsby-source-filesystem",
        options: {
          path: `${projectRoot}/static/img`,
          name: "uploads",
        },
      },
      {
        resolve: "gatsby-source-filesystem",
        options: {
          path: `${projectRoot}/src/collections/pages`,
          name: "pages",
        },
      },
      {
        resolve: "gatsby-source-filesystem",
        options: {
          path: `${projectRoot}/src/collections/settings`,
          name: "settings",
        },
      },
      {
        resolve: "gatsby-source-filesystem",
        options: {
          path: `${projectRoot}/src/collections/events`,
          name: "events",
        },
      },
      {
        resolve: "gatsby-source-filesystem",
        options: {
          path: `${projectRoot}/src/img`,
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
          modulePath: `${projectRoot}/src/cms/index.tsx`,
          manualInit: true,
        },
      },
      "gatsby-plugin-netlify", // make sure to keep it last in the array
    ],
  };
};

export default config;
