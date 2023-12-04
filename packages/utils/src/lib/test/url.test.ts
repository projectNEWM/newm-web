import { removeTrailingSlash } from "../url";

describe("removeTrailingSlash()", () => {
  it("removes the trailing slash, if present", () => {
    expect(removeTrailingSlash("example")).toEqual("example");
    expect(removeTrailingSlash("example/")).toEqual("example");
  });
});
