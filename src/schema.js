const MarkdownRemark = `
  type MarkdownRemark implements Node {
    frontmatter: Frontmatter
  }
  type Frontmatter {
    collection: String
    key: String
    information: Information
    component: String
    pages: Pages
    category: String
  }
  type Pages {
    landing: LandingPage
    team: TeamPage
    leading: ServicesPage
    coaching: ServicesPage
    learning: ServicesPage
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

const LandingPage = `
  type LandingPage {
    collection: String!
    key: String!

    hero: Hero!
    about: About!
    products: [Product!]!
    testimonials: [Testimonial!]!
    title: String
    videos: [Video!]!
  }

  type Hero {
    title: String
    image: String
  }

  type About {
    text: String
    image: String
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

const TeamPage = `
  type TeamPage {
    collection: String!
    key: String!

    members: [Member]
  }
  type Member {
    name: String
    role: String
    photo: String
    bio: String
    linkedin: String
  }
`;

const ServicesPage = `
  type ServicesPage {
    collection: String
    category: String
    component: String
    key: String
    hero: Hero
    order: Int
    gallery: ServiceGallery
    explanation: String
    benefits: String
  }
  type ServiceGallery {
    image: String
    description: String
  }
`;

module.exports = schema = [
  MarkdownRemark,
  Information,
  LandingPage,
  TeamPage,
  ServicesPage,
].join(" ");
