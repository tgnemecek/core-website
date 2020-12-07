type AcceptedLanguagesType = "EN" | "ES";

const languageMap = {
  EN: "English",
  ES: "Spanish",
};

const formatLanguage = (
  input: AcceptedLanguagesType | AcceptedLanguagesType[]
) => {
  const arr = Array.isArray(input) ? input : [input];
  return arr.map((langCode) => languageMap[langCode]).join(", ");
};

export default formatLanguage;
