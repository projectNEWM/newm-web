/**
 * Wrapper for local storage that first checks to see if
 * it is available.
 */
export const LocalStorage = {
  getItem: (key: string): string | null => {
    if (storageAvailable("localStorage")) {
      return localStorage.getItem(key);
    }

    return null;
  },
  removeItem: (key: string): void => {
    if (storageAvailable("localStorage")) {
      localStorage.removeItem(key);
    }
  },
  setItem: (key: string, value: string): void => {
    if (storageAvailable("localStorage")) {
      localStorage.setItem(key, value);
    }
  },
};

export const parseStoredJSON = <T = unknown>(key: string): T | undefined => {
  const value = LocalStorage.getItem(key);
  if (!value) return undefined;

  try {
    return JSON.parse(value) as T;
  } catch (error) {
    return undefined;
  }
};

const storageAvailable = (type: string) => {
  let storage;

  try {
    storage = (window as any)[type]; // eslint-disable-line
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      e.name === "QuotaExceededError" &&
      storage &&
      storage.length !== 0
    );
  }
};
