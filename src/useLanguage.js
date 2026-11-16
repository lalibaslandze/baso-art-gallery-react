
import translations from "./translations";

function useLanguage() {
  const language = localStorage.getItem("baso-language") || "EN";

  return {
    language,
    t: translations[language] || translations.EN,
  };
}

export default useLanguage;
