
export function getLocalizedText(item, field, language) {
  if (language === "KA") {
    return item[`${field}KA`] || item[field];
  }

  return item[field];
}
