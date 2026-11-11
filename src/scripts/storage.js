export const THEME_KEY = "prompt-atelier-theme";
export const LANG_KEY = "prompt-atelier-lang";

export function storageGet(key) {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.error("prompt-atelier: cannot read " + key, error);
    return null;
  }
}

export function storageSet(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.error("prompt-atelier: cannot store " + key, error);
  }
}
