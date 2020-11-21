import youtubeRegex from "./youtubeRegex";

const isVideoValid = (link: string) => {
  const matches = link.match(youtubeRegex);
  return Boolean(matches);
};

export default isVideoValid;
