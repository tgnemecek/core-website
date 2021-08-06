const getVideoImage = (videoId: string) => {
  if (typeof window !== "undefined") {
    const {
      location: { protocol },
    } = window;

    return `${protocol}//img.youtube.com/vi/${videoId}/mqdefault.jpg`;
  }

  return "";
};

export default getVideoImage;
