const getVideoImage = (videoId: string, location: Location) => {
  if (!location) return "";

  const { protocol } = location;

  return `${protocol}//img.youtube.com/vi/${videoId}/mqdefault.jpg`;
};

export default getVideoImage;
