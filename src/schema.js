const MarkdownRemark = `
  type MarkdownRemark implements Node {
    frontmatter: Frontmatter
    fields: Fields
  }
  type Fields {
    slug: String
  }
  type Frontmatter {
    pages: Pages
    information: Information
    events: EventPage
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
    navigation: Navigation!
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
  type Navigation {
    collection: String!
    key: String!
    links: [NavigationLink!]!
  }
  type NavigationLink {
    label: String!
    url: String!
    description: String
  }
`;

const LandingPage = `
  type LandingPage {
    collection: String!
    key: String!

    hero: Hero!
    about: About!
    services: [Service!]!
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

  type Service {
    title: String
    image: String
    name: String
    description: String
  }

  type Product {
    description: String
    image: String
    title: String
    subtitle: String
    link: String
  }

  type Testimonial {
    author: String
    role: String
    testimonial: String
  }
  type Video {
    link: String
    title: String
    subtitle: String
  }
`;

const TeamPage = `
  type TeamPage {
    collection: String!
    key: String!
    hero: Hero
    members: [Member]
  }
  type Member {
    name: String
    role: String
    photo: String
    bio: String
    linkedin: String
    video: String
  }
`;

const ServicesPage = `
  type ServicesPage {
    collection: String
    component: String
    key: String
    hero: Hero
    explanation: Explanation
    benefits: String
  }

  type Explanation {
    text: String!
    image: String!
  }
`;

const EventPage = `
  type EventPage {
    collection: String!
    title: String!
    subtitle: String!
    description: String!
    image: String!
    video: String
    date: Date!
    duration: Int!
    language: [String!]!
    isOnline: Boolean!
    location: String
    tickets: [Ticket!]!
  }

  type Ticket {
    description: String!
    price: Int!
    endsOn: String!
  }
`;

module.exports = schema = [
  MarkdownRemark,
  Information,
  LandingPage,
  TeamPage,
  ServicesPage,
  EventPage,
].join(" ");
