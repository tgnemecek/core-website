const getVideoImage = (videoId: string) => {
  const {
    location: { protocol },
  } = window;

  return `${protocol}//img.youtube.com/vi/${videoId}/mqdefault.jpg`;
};

export default getVideoImage;
