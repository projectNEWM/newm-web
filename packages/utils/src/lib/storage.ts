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
  setItem: (key: string, value: string): void => {
    if (storageAvailable("localStorage")) {
      localStorage.setItem(key, value);
    }
  },
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
