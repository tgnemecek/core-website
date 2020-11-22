// import React from "react";
// import { graphql } from "gatsby";

// import {
//   // Hero,
//   // Events,
//   // About,
//   // Testimonials,
//   // Services,
//   // Products,
//   // Videos,
//   // ContactForm,
//   // Layout,
//   Navbar,
//   Footer,
// } from "components/index";

// const LandingPage: React.FC<any> = ({
//   hero,
//   about,
//   testimonials,
//   services,
//   products,
//   videos,
// }) => {
//   return (
//     <>
//       {/* <Hero hero={hero} /> */}
//       {/* <Events /> */}
//       {/* <About about={about} />
//       <Testimonials testimonials={testimonials} />
//       <Services services={services} />
//       <Products products={products} />
//       <Videos videos={videos} />
//       <ContactForm /> */}
//     </>
//   );
// };

// const LandingPageLoader: React.FC<any> = (props) => {
//   const landing = props.data.main.nodes[0].frontmatter.pages.landing;
//   return (
//     <>
//       {/* <Navbar /> */}
//       <main>
//         <LandingPage {...landing} />
//       </main>
//       <Footer />
//     </>
//   );
//   // return (
//   //   <Layout>
//   //     <Navbar />
//   //     <main>
//   //       <LandingPage {...landing} />
//   //     </main>
//   //     <Footer />
//   //   </Layout>
//   // );
// };

// export default LandingPageLoader;

// export const pageQuery = graphql`
//   query LandingPageQuery {
//     main: allMarkdownRemark(
//       filter: { frontmatter: { key: { eq: "landing" } } }
//     ) {
//       nodes {
//         frontmatter {
//           pages {
//             landing {
//               hero {
//                 title
//                 image
//               }
//               about {
//                 text
//                 image
//               }
//               testimonials {
//                 author
//                 role
//                 testimonial
//               }
//               services {
//                 title
//                 name
//                 description
//                 image
//               }
//               products {
//                 description
//                 image
//                 title
//                 subtitle
//                 link
//               }
//               videos {
//                 title
//                 subtitle
//                 link
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `;
import React from "react";
import { graphql } from "gatsby";
import leadingReport from "src/downloads/free-reports/leading.pdf";
import { getContactEmail } from "utils";

import {
  Hero,
  Section,
  Explanation,
  Benefits,
  CallToAction,
  FreeReport,
  PayPalButtons,
  ContactForm,
  Layout,
  Navbar,
  Footer,
} from "components";

const LeadingPage: React.FC<any> = ({ hero, benefits, explanation, email }) => {
  return (
    <>
      <Hero hero={hero} small={true} />
      <Section>
        <Explanation explanation={explanation} />
        <FreeReport
          reportText="Get a Free Leader Compass Report!"
          downloadLink={leadingReport}
        />
        <Benefits
          benefits={benefits}
          title="Schedule a time with us if you are:"
        />
        <CallToAction href="#contact-form" text="Send Us a message" />
      </Section>
      <Section>
        <PayPalButtons
          buttonTypes={["leaderStrengths", "entrepreneuerStrengths"]}
        />
      </Section>
      <ContactForm />
    </>
  );
};

const LeadingPageLoader: React.FC<any> = (props) => {
  const leading = props.data.main.nodes[0].frontmatter.pages.leading;

  return (
    <Layout>
      <Navbar />
      <main>
        <LeadingPage {...leading} email={getContactEmail()} />
      </main>
      <Footer />
    </Layout>
  );
};

export default LeadingPageLoader;

export const pageQuery = graphql`
  query LeadingPageQuery {
    main: allMarkdownRemark(
      filter: { frontmatter: { key: { eq: "leading" } } }
    ) {
      nodes {
        frontmatter {
          pages {
            leading {
              benefits
              explanation {
                text
                image
              }
              hero {
                title
                image
              }
            }
          }
        }
      }
    }
  }
`;
