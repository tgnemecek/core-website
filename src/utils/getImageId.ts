const getImageId = (link: string) => {
  const matches = link.match(/image\/upload\/.*\/(.*)/);
  return matches ? matches[1] : "";
};

export default getImageId;
