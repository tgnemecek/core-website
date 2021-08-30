const recursivelyFormatDate = <T extends unknown>(value: T): T => {
  if (!value) return value;

  // Value is not a date, but function can look deeper
  if (typeof value === "object") {
    if (Array.isArray(value)) {
      return value.map(recursivelyFormatDate) as T;
    } else {
      return Object.entries(value! as {}).reduce(
        (acc, [key, v]) => ({
          ...acc,
          [key]: recursivelyFormatDate(v),
        }),
        {}
      ) as T;
    }
  }

  // Value can be a date
  if (typeof value === "string") {
    const valueAsDate = new Date(value);

    // Date is valid
    if (!isNaN(valueAsDate.getTime())) {
      return valueAsDate as T;
    }
    return value;
  }

  return value;
};

export default recursivelyFormatDate;
