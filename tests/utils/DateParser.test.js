import { DateParser } from "../../src/utils";

describe('DateParser', () => {
  describe('constructor', () => {
    test('should initialize the date correctly', () => {
      const dateString = '2023-10-29';
      const dateParser = new DateParser(dateString);
      expect(dateParser.date.toISOString().split('T')[0]).toBe(dateString);
    });
  });

  describe('getYear', () => {
    test('should return the correct year', () => {
      const dateString = '2023-10-29';
      const dateParser = new DateParser(dateString);
      expect(dateParser.getYear()).toBe(2023);
    });
  });

  describe('getMonth', () => {
    test('should return the correct month', () => {
      const dateString = '2023-10-29';
      const dateParser = new DateParser(dateString);
      expect(dateParser.getMonth()).toBe(10);
    });
  });

  describe('getDay', () => {
    test('should return the correct day', () => {
      const dateString = '2023-10-29';
      const dateParser = new DateParser(dateString);
      expect(dateParser.getDay()).toBe(29);
    });
  });

  describe('compareDates', () => {
    test('should return -1 for a date earlier than the other', () => {
      const dateParser = new DateParser('2023-10-29');
      const result = dateParser.compareDates('2023-11-01');
      expect(result).toBe(-1);
    });

    test('should return 1 for a date later than the other', () => {
      const dateParser = new DateParser('2023-10-29');
      const result = dateParser.compareDates('2023-10-01');
      expect(result).toBe(1);
    });

    test('should return 0 for equal dates', () => {
      const dateParser = new DateParser('2023-10-29');
      const result = dateParser.compareDates('2023-10-29');
      expect(result).toBe(0);
    });
  });

  describe('addDays', () => {
    test('should add the correct number of days to the date', () => {
      const dateParser = new DateParser('2023-10-29');
      const newDateParser = dateParser.addDays(5);
      expect(newDateParser.getFormattedDate()).toBe('2023-11-03');
    });
    test('should subtract the correct number of days to the date if negative', () => {
      const dateParser = new DateParser('2023-10-29');
      const newDateParser = dateParser.addDays(-3);
      expect(newDateParser.getFormattedDate()).toBe('2023-10-26');
    });
  });

  describe('getFormattedDate', () => {
    test('should return the date in the correct format', () => {
      const dateString = '2023-10-29';
      const dateParser = new DateParser(dateString);
      expect(dateParser.getFormattedDate()).toBe(dateString);
    });
  });
});
