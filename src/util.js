export const formatPagesQuery = (nodes) => {
  const result = [];
  nodes.forEach(({ frontmatter: { pages } }) => {
    Object.keys(pages).forEach((page) => {
      if (pages[page])
        result.push({
          ...pages[page],
          key: page,
        });
    });
  });
  return result.sort((a, b) => {
    if (a.order < b.order) return -1;
    if (a.order > b.order) return 1;
    return 0;
  });
};

export const dataFormatter = (nodes) => {
  const obj = {};
  nodes.forEach(({ frontmatter }) => {
    Object.keys(frontmatter).forEach((key) => {
      if (frontmatter[key]) {
        obj[key] = frontmatter[key];
      }
    });
  });
  return obj;
};

export const shuffleArray = (inputData) => {
  const data = [...inputData];
  for (let i = data.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = data[i];
    data[i] = data[j];
    data[j] = temp;
  }
  return data;
};
