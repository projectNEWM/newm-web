import { formatOwnershipPercentage } from "../sales";

describe("#formatOwnershipPercentage utility", () => {
  describe("exactly 100% ownership", () => {
    it("should return '100%' when tokens exactly equal total tokens", () => {
      expect(formatOwnershipPercentage(100000000)).toBe("100%");
      expect(formatOwnershipPercentage(100000000, 100000000)).toBe("100%");
    });

    it("should return '100%' with custom total tokens", () => {
      expect(formatOwnershipPercentage(1000, 1000)).toBe("100%");
      expect(formatOwnershipPercentage(50, 50)).toBe("100%");
    });
  });

  describe("whole number percentages", () => {
    it("should return whole numbers without decimals", () => {
      expect(formatOwnershipPercentage(50000000)).toBe("50%");
      expect(formatOwnershipPercentage(1000000)).toBe("1%");
      expect(formatOwnershipPercentage(25000000)).toBe("25%");
      expect(formatOwnershipPercentage(75000000)).toBe("75%");
    });

    it("should handle 0% case", () => {
      expect(formatOwnershipPercentage(0)).toBe("0%");
    });

    it("should handle whole numbers with custom total tokens", () => {
      expect(formatOwnershipPercentage(50, 100)).toBe("50%");
      expect(formatOwnershipPercentage(1, 10)).toBe("10%");
      expect(formatOwnershipPercentage(3, 10)).toBe("30%");
    });
  });

  describe("fractional percentages", () => {
    it("should show fractional percentages with appropriate decimals", () => {
      // 49.999223% from the image example
      expect(formatOwnershipPercentage(49999223)).toBe("49.999223%");

      // 99.999901% - close to 100% but not exactly
      expect(formatOwnershipPercentage(99999901)).toBe("99.999901%");

      // 99.999999% - very close to 100%
      expect(formatOwnershipPercentage(99999999)).toBe("99.999999%");
    });

    it("should trim trailing zeros", () => {
      // 50.5% should show as "50.5%" not "50.500000%"
      expect(formatOwnershipPercentage(50500000)).toBe("50.5%");

      // 25.25% should show as "25.25%" not "25.250000%"
      expect(formatOwnershipPercentage(25250000)).toBe("25.25%");

      // 10.1% should show as "10.1%" not "10.100000%"
      expect(formatOwnershipPercentage(10100000)).toBe("10.1%");
    });

    // * Correct today
    // ! But this assumes no minimum decimal padding, which is fine,
    // * we must be aware of this design decision, not an AC requirement.
    // ! If product later says 'always show at least 2 decimals', this test will break.
    it("should preserve significant decimal places", () => {
      // 0.5% should show decimals
      expect(formatOwnershipPercentage(500000)).toBe("0.5%");

      // 0.1% should show decimals
      expect(formatOwnershipPercentage(100000)).toBe("0.1%");

      // 0.01% should show decimals
      expect(formatOwnershipPercentage(10000)).toBe("0.01%");
    });

    it("should handle very small percentages", () => {
      // 0.000001% (1 token out of 100M)
      expect(formatOwnershipPercentage(1)).toBe("0.000001%");

      // 0.00001% (10 tokens)
      expect(formatOwnershipPercentage(10)).toBe("0.00001%");

      // 0.0001% (100 tokens)
      expect(formatOwnershipPercentage(100)).toBe("0.0001%");
    });

    it("should handle percentages with many decimal places", () => {
      // 33.333333% (1/3 of total)
      expect(formatOwnershipPercentage(33333333)).toBe("33.333333%");

      // 66.666666% (2/3 of total)
      expect(formatOwnershipPercentage(66666666)).toBe("66.666666%");
    });
  });

  describe("edge cases near 100%", () => {
    it("should not round 99.999901% to 100%", () => {
      const result = formatOwnershipPercentage(99999901);
      expect(result).toBe("99.999901%");
      expect(result).not.toBe("100%");
    });

    it("should not round 99.999999% to 100%", () => {
      const result = formatOwnershipPercentage(99999999);
      expect(result).toBe("99.999999%");
      expect(result).not.toBe("100%");
    });

    it("should handle 99.9% correctly", () => {
      expect(formatOwnershipPercentage(99900000)).toBe("99.9%");
    });

    it("should handle 99.99% correctly", () => {
      expect(formatOwnershipPercentage(99990000)).toBe("99.99%");
    });

    it("should handle 99.999% correctly", () => {
      expect(formatOwnershipPercentage(99999000)).toBe("99.999%");
    });
  });

  describe("edge cases near 0%", () => {
    it("should handle single token", () => {
      expect(formatOwnershipPercentage(1)).toBe("0.000001%");
    });

    it("should handle very small amounts", () => {
      expect(formatOwnershipPercentage(77)).toBe("0.000077%");
      expect(formatOwnershipPercentage(123)).toBe("0.000123%");
    });
  });

  describe("custom total tokens", () => {
    it("should work with custom total token values", () => {
      // 50% of 1000
      expect(formatOwnershipPercentage(500, 1000)).toBe("50%");

      // 33.333333% of 3
      expect(formatOwnershipPercentage(1, 3)).toBe("33.333333%");

      // 66.666666% of 3
      // * NOTE:
      // * This test intentionally asserts rounding (not truncation) to 6 decimal places.
      // * The formatter uses `toFixed(6)`, which rounds the final digit.
      // * Truncation would also be Jira compliant, but rounding was chosen to preserve
      // * numerical accuracy and consistency across fractional ownership displays.
      // ! If later we 'truncate' to 6 decimals, this test will break.
      expect(formatOwnershipPercentage(2, 3)).toBe("66.666667%");

      // 25.5% of 100
      expect(formatOwnershipPercentage(25.5, 100)).toBe("25.5%");
    });

    it("should handle fractional tokens with custom total", () => {
      // 1.5 out of 10 = 15%
      expect(formatOwnershipPercentage(1.5, 10)).toBe("15%");

      // 0.1 out of 1 = 10%
      expect(formatOwnershipPercentage(0.1, 1)).toBe("10%");
    });
  });

  describe("floating point precision handling", () => {
    it("should handle floating point arithmetic correctly", () => {
      // Test that floating point errors don't cause issues
      const result1 = formatOwnershipPercentage(33333333);
      expect(result1).toMatch(/^33\.33333\d*%$/);

      const result2 = formatOwnershipPercentage(66666666);
      expect(result2).toMatch(/^66\.66666\d*%$/);
    });

    it("should not show misleading precision beyond 6 decimals", () => {
      // Even if calculation has more precision, should cap at 6 decimals
      const result = formatOwnershipPercentage(1234567);
      // Should be 1.234567% (6 decimals max)
      expect(result).toBe("1.234567%");
    });
  });

  describe("invalid or non-positive token values", () => {
    it("should return 0% when tokens are 0", () => {
      expect(formatOwnershipPercentage(0)).toBe("0%");
    });

    it("should return 0% when tokens are negative", () => {
      expect(formatOwnershipPercentage(-1)).toBe("0%");
      expect(formatOwnershipPercentage(-100)).toBe("0%");
    });

    it("should return 0% when tokens are negative with custom total", () => {
      expect(formatOwnershipPercentage(-10, 100)).toBe("0%");
    });

    it("should return 0% when tokens is NaN", () => {
      expect(formatOwnershipPercentage(NaN)).toBe("0%");
    });
  });
});
