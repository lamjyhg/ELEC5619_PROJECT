export const isLongEnough = (length, string) => {
  if (string.length < length) {
    return false;
  }

  return true;
};

export const isSameString = (string1, string2) => {
  if (string1 !== string2) {
    return false;
  }

  return true;
};

export const isContainSpecialCharts = (string) => {
  if (!string) {
    return true;
  }

  const specialChars = ["-", "!", "`", "%", "&", "$"];

  specialChars.map((element, index) => {
    if (string.includes(element)) {
      return true;
    }
  });

  return false;
};
