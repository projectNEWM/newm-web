import moment from "moment/min/moment-with-locales";
import {
  formatDateToISODateTime,
  formatISODateToLocaleDateAtUTC,
  formatTimeFromISO,
  formatToHumanReadableDate,
  getTimeRemaining,
  isMoreThanThresholdSecondsLater,
} from "../time";

describe("time utilities", () => {
  // Store the original locale
  const originalLocale = moment.locale();

  // Restore after each test to prevent test pollution
  afterEach(() => {
    moment.locale(originalLocale);
  });
  describe("isMoreThanThresholdSecondsLater", () => {
    it("should return true when time difference exceeds threshold", () => {
      const pastTime = new Date("2025-10-13T10:00:00Z").toISOString();
      const futureTime = new Date("2025-10-13T10:01:00Z").toISOString();

      // Mock Date.now to return futureTime
      jest.spyOn(Date, "now").mockReturnValue(new Date(futureTime).getTime());

      expect(isMoreThanThresholdSecondsLater(pastTime, 30)).toBe(true);

      jest.restoreAllMocks();
    });

    it("should return false when time difference is less than threshold", () => {
      const pastTime = new Date("2025-10-13T10:00:00Z").toISOString();
      const futureTime = new Date("2025-10-13T10:00:10Z").toISOString();

      jest.spyOn(Date, "now").mockReturnValue(new Date(futureTime).getTime());

      expect(isMoreThanThresholdSecondsLater(pastTime, 30)).toBe(false);

      jest.restoreAllMocks();
    });

    it("should handle exact threshold boundary", () => {
      const pastTime = new Date("2025-10-13T10:00:00Z").toISOString();
      const futureTime = new Date("2025-10-13T10:00:30Z").toISOString();

      jest.spyOn(Date, "now").mockReturnValue(new Date(futureTime).getTime());

      expect(isMoreThanThresholdSecondsLater(pastTime, 30)).toBe(false);

      jest.restoreAllMocks();
    });
  });

  describe("getTimeRemaining", () => {
    it("should calculate time remaining correctly", () => {
      const start = new Date("2025-10-13T10:00:00Z");
      const end = new Date("2025-10-13T11:30:45Z");

      const result = getTimeRemaining(end, start);

      expect(result.hours).toBe("01");
      expect(result.minutes).toBe("30");
      expect(result.seconds).toBe("45");
      expect(result.days).toBeUndefined();
      expect(result.total).toBe(5445000); // 1h 30m 45s in milliseconds
    });

    it("should handle zero time remaining", () => {
      const start = new Date("2025-10-13T10:00:00Z");
      const end = new Date("2025-10-13T10:00:00Z");

      const result = getTimeRemaining(end, start);

      expect(result.hours).toBeUndefined();
      expect(result.minutes).toBeUndefined();
      expect(result.seconds).toBe("00");
      expect(result.days).toBeUndefined();
      expect(result.total).toBe(0);
    });

    it("should handle negative time difference", () => {
      const start = new Date("2025-10-13T11:00:00Z");
      const end = new Date("2025-10-13T10:00:00Z");

      const result = getTimeRemaining(end, start);

      // Negative time should result in undefined for most fields
      expect(result.hours).toBeUndefined();
      expect(result.minutes).toBeUndefined();
      expect(result.seconds).toBe("00");
      expect(result.days).toBeUndefined();
      expect(result.total).toBeLessThan(0);
    });

    it("should handle time spanning multiple days", () => {
      const start = new Date("2025-10-13T10:00:00Z");
      const end = new Date("2025-10-15T11:30:45Z");

      const result = getTimeRemaining(end, start);

      expect(result.days).toBe("2");
      expect(result.hours).toBe("01"); // Hours are padded, only the remainder after days
      expect(result.minutes).toBe("30");
      expect(result.seconds).toBe("45");
    });

    it("should pad hours, minutes, and seconds with leading zeros", () => {
      const start = new Date("2025-10-13T10:00:00Z");
      const end = new Date("2025-10-13T10:05:03Z");

      const result = getTimeRemaining(end, start);

      expect(result.minutes).toBe("05");
      expect(result.seconds).toBe("03");
    });
  });

  describe("formatToHumanReadableDate", () => {
    it("should format ISO date to human readable format", () => {
      const isoDate = "2024-01-25T14:30:00Z";

      const result = formatToHumanReadableDate(isoDate);

      // Result will vary by timezone, but should contain date elements
      expect(result).toMatch(/\d{2} \w+ \d{4}/);
    });

    it("should return 'today' for current date", () => {
      const today = new Date().toISOString();

      const result = formatToHumanReadableDate(today);

      expect(result).toBe("today");
    });

    it("should handle different ISO date formats", () => {
      const isoDate = "2024-12-05";

      const result = formatToHumanReadableDate(isoDate);

      expect(result).toMatch(/\d{2} \w+ \d{4}/);
    });
  });

  describe("formatTimeFromISO", () => {
    it("should format ISO datetime to time string", () => {
      const isoDateTime = "2025-10-13T14:30:00Z";

      const result = formatTimeFromISO(isoDateTime);

      // Result will vary by timezone, but should contain time elements
      expect(result).toMatch(/\d{1,2}:\d{2}/);
    });

    it("should handle midnight", () => {
      const isoDateTime = "2025-10-13T00:00:00Z";

      const result = formatTimeFromISO(isoDateTime);

      expect(result).toMatch(/\d{1,2}:\d{2}/);
    });

    it("should handle different timezones", () => {
      const isoDateTime = "2025-10-13T23:59:59+05:00";

      const result = formatTimeFromISO(isoDateTime);

      expect(result).toMatch(/\d{1,2}:\d{2}/);
    });
  });

  describe("formatDateToISODateTime", () => {
    it("should format Date to ISO datetime string", () => {
      const date = new Date("2025-10-13T14:30:45.123Z");

      const result = formatDateToISODateTime(date);

      expect(result).toBe("2025-10-13T14:30:45");
    });

    it("should handle midnight", () => {
      const date = new Date("2025-10-13T00:00:00.000Z");

      const result = formatDateToISODateTime(date);

      expect(result).toBe("2025-10-13T00:00:00");
    });

    it("should truncate milliseconds", () => {
      const date = new Date("2025-10-13T14:30:45.999Z");

      const result = formatDateToISODateTime(date);

      expect(result).toBe("2025-10-13T14:30:45");
      expect(result).not.toContain(".999");
    });
  });

  describe("formatISODateToUTCLocaleDate", () => {
    it("should format ISO date string with UTC timezone", () => {
      const isoDate = "2025-10-13";
      const result = formatISODateToLocaleDateAtUTC(isoDate);

      expect(result).toBe("10/13/2025");
    });

    it("should handle ISO datetime strings", () => {
      const isoDate = "2025-10-13T14:30:00Z";
      const result = formatISODateToLocaleDateAtUTC(isoDate);

      expect(result).toBe("10/13/2025");
    });

    it("should handle dates at different times of day", () => {
      const isoDate = "2025-10-13T23:59:59Z"; // Late in the day UTC
      const result = formatISODateToLocaleDateAtUTC(isoDate);

      expect(result).toBe("10/13/2025");
    });

    it("should handle dates at different times of day across locales", () => {
      const isoDate = "2025-10-13T23:59:59Z";

      moment.locale("en");
      expect(formatISODateToLocaleDateAtUTC(isoDate)).toBe("10/13/2025");

      moment.locale("en-gb");
      expect(formatISODateToLocaleDateAtUTC(isoDate)).toBe("13/10/2025");

      moment.locale("de");
      expect(formatISODateToLocaleDateAtUTC(isoDate)).toBe("13.10.2025");
    });
  });
});
