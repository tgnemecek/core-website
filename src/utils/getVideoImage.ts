const getVideoImage = (videoId: string) => {
  let url = `//img.youtube.com/vi/${videoId}/mqdefault.jpg`;

  if (typeof window !== "undefined") {
    const {
      location: { protocol },
    } = window;

    return `${protocol}${url}`;
  }

  return `https:${url}`;
};

export default getVideoImage;
