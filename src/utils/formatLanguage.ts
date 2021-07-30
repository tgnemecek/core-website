import { Language } from "types";

const languageMap = {
  EN: "English",
  ES: "Spanish",
};

const formatLanguage = (input: Language | Language[]) => {
  const arr = Array.isArray(input) ? input : [input];
  return arr.map((langCode) => languageMap[langCode]).join(", ");
};

export default formatLanguage;
