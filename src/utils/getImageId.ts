const getImageId = (link: string) => {
  const matches = link.match(
    /core-coaching-consulting\/image\/upload\/.*\/(.*)/
  );
  return matches ? matches[1] : "";
};

export default getImageId;
