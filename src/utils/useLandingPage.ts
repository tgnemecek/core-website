import { useStaticQuery, graphql } from "gatsby";

type UseLandingPage = () => {
  hero: {
    title: string;
    image: string;
  };
  about: {
    text: string;
    image: string;
  };
  testimonials: {
    author: string;
    role: string;
    testimonial: string;
  }[];
  services: {
    title: string;
    name: string;
    description: string;
    image: string;
  }[];
  products: {
    description: string;
    image: string;
    title: string;
    subtitle: string;
    link: string;
  }[];
  videos: {
    title: string;
    subtitle: string;
    link: string;
  }[];
};

const useLandingPage: UseLandingPage = () => {
  const data = useStaticQuery(graphql`
    query LandingPageQuery {
      main: allMarkdownRemark(
        filter: { frontmatter: { key: { eq: "landing" } } }
      ) {
        nodes {
          frontmatter {
            pages {
              landing {
                hero {
                  title
                  image
                }
                about {
                  text
                  image
                }
                testimonials {
                  author
                  role
                  testimonial
                }
                services {
                  title
                  name
                  description
                  image
                }
                products {
                  description
                  image
                  title
                  subtitle
                  link
                }
                videos {
                  title
                  subtitle
                  link
                }
              }
            }
          }
        }
      }
    }
  `);

  return data.main.nodes[0].frontmatter.pages.landing;
};

export default useLandingPage;
