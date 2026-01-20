import { LocalStorage, parseStoredJSON } from "../storage";

describe("LocalStorage", () => {
  const mockStorage = () => {
    const store: Record<string, string> = {};

    return {
      getItem: (key: string) => (key in store ? store[key] : null),
      removeItem: (key: string) => {
        delete store[key];
      },
      setItem: (key: string, value: string) => {
        store[key] = value;
      },
    };
  };

  beforeEach(() => {
    Object.defineProperty(window, "localStorage", {
      value: mockStorage(),
      writable: true,
    });
  });

  it("sets and gets stored values", () => {
    LocalStorage.setItem("test-key", "test-value");

    expect(LocalStorage.getItem("test-key")).toEqual("test-value");
  });

  it("returns null for missing keys", () => {
    expect(LocalStorage.getItem("missing")).toBeNull();
  });

  it("removes stored values", () => {
    LocalStorage.setItem("test-key", "test-value");
    LocalStorage.removeItem("test-key");

    expect(LocalStorage.getItem("test-key")).toBeNull();
  });
});

describe("parseStoredJSON", () => {
  beforeEach(() => {
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn(),
        removeItem: jest.fn(),
        setItem: jest.fn(),
      },
      writable: true,
    });
  });

  it("returns undefined when the key is missing", () => {
    (window.localStorage.getItem as jest.Mock).mockReturnValue(null);

    expect(parseStoredJSON("missing")).toBeUndefined();
  });

  it("returns parsed JSON for valid values", () => {
    (window.localStorage.getItem as jest.Mock).mockReturnValue(
      JSON.stringify({ id: "abc" })
    );

    expect(parseStoredJSON<{ id: string }>("data")).toEqual({ id: "abc" });
  });

  it("returns undefined when JSON is invalid", () => {
    (window.localStorage.getItem as jest.Mock).mockReturnValue("not-json");

    expect(parseStoredJSON("data")).toBeUndefined();
  });
});
