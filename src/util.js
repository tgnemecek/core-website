export const dataFormatter = (data) => {
  const newData = {};

  const formatObj = (obj) => {
    const result = {};
    Object.keys(obj).forEach((subKey) => {
      const value = obj[subKey];
      if (value.childImageSharp) {
        result[subKey] = value.childImageSharp.fluid;
      } else {
        result[subKey] = value;
      }
    });
    return result;
  };

  Object.keys(data).forEach((key) => {
    if (data[key].frontmatter) {
      newData[key] = formatObj(data[key].frontmatter);
    } else if (data[key].nodes) {
      newData[key] = data[key].nodes.map((node) => {
        return formatObj(node.frontmatter);
      });
    }
  });
  return newData;
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
