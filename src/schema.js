const MarkdownRemark = `
  type MarkdownRemark implements Node {
    frontmatter: Frontmatter
  }
  type Frontmatter {
    collection: String
    key: String
    information: Information
    pages: Pages
  }
  type Pages {
    LandingPage: LandingPage
  }
`;

const Information = `
  type Information {
    contact: Contact!
  }
  type Contact {
    collection: String!
    key: String!

    address: String
    email: String
    phone1: String
    phone2: String
    link: String
  }
`;

const Pages = `
  type LandingPage {
    collection: String!
    key: String!

    about: String
    aboutImage: String
    heroImage: String
    products: [Product!]!
    testimonials: [Testimonial!]!
    title: String
    videos: [Video!]!
  }

  type Product {
    description: String
    image: String
    title: String
  }

  type Testimonial {
    author: String
    role: String
    testimonial: String
  }
  type Video {
    link: String
    title: String
  }
`;

module.exports = schema = [MarkdownRemark, Information, Pages].join(" ");
