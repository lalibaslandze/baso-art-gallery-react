
import { useEffect, useState } from "react";
import translations from "./translations";

function useLanguage() {
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem("baso-language") || "EN";
  });

  useEffect(() => {
    function syncLanguage() {
      setLanguageState(
        localStorage.getItem("baso-language") || "EN"
      );
    }

    window.addEventListener("languageChanged", syncLanguage);
    window.addEventListener("storage", syncLanguage);

    return () => {
      window.removeEventListener("languageChanged", syncLanguage);
      window.removeEventListener("storage", syncLanguage);
    };
  }, []);

  function setLanguage(newLanguage) {
    localStorage.setItem("baso-language", newLanguage);
    setLanguageState(newLanguage);
    window.dispatchEvent(new Event("languageChanged"));
  }

  return {
    language,
    t: translations[language] || translations.EN,
    setLanguage,
  };
}

export default useLanguage;
