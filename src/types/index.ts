export type Hero = {
  title: string;
  image: string;
};

export type Benefits = string;

export type Explanation = {
  text: string;
  image: string;
};

export type Member = {
  name: string;
  role: string;
  photo: string;
  bio: string;
  video: string;
  linkedin?: string;
};

export type ServicesPage = {
  hero: Hero;
  benefits: Benefits;
  explanation: Explanation;
};

export type TeamPage = {
  hero: Hero;
  members: Member[];
};
