import youtubeRegex from "./youtubeRegex";

const getVideoId = (link: string) => {
  const matches = link.match(youtubeRegex);
  return matches?.[1];
};

export default getVideoId;
