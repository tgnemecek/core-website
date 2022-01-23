type Edges<T> = {
  node: {
    frontmatter: T;
  };
}[];

const joinNodes = <T extends Object>(edges: Edges<T>) => {
  return edges.reduce((acc, cur) => {
    const object = cur.node.frontmatter;

    const filteredObject = Object.entries(object).reduce(
      (subAcc, [key, value]) => {
        if (value != null) {
          return {
            ...subAcc,
            [key]: value,
          };
        }
        return subAcc;
      },
      {} as typeof object
    );

    return {
      ...acc,
      ...filteredObject,
    };
  }, {} as T);
};

export default joinNodes;
