/**
 * Date parsing class in TypeScript.
 */
class DateParser {
  private date: Date;

  /**
   *
   * @param {String} dateString YYYY-MM-DD
   */
  constructor(dateString: string) {
    this.date = new Date(`${dateString}T00:00:00Z`); // Assume input is in UTC
    this.date.setUTCHours(this.date.getUTCHours() + 5, 30); // Add 5 hours and 30 minutes for IST
  }

  /**
   * Gets full year in 4 char length
   * @return {String} the year
   */
  getYear(): number {
    return this.date.getFullYear();
  }

  /**
   * Gets 2 char month
   * @return {String} the month
   */
  getMonth(): number {
    // Adding 1 to getMonth() because it returns values from 0 to 11
    return this.date.getMonth() + 1;
  }

  /**
   * Gets 2 char day
   * @return {String} the day
   */
  getDay(): number {
    return this.date.getDate();
  }

  /**
   * Compare the dates with another date string.
   * @param {String} otherDateString
   * @return {int} -1 if less that otherString, 0 on equal, 1 otherwise
   */
  compareDates(otherDateString: string): number {
    const otherDate = new DateParser(otherDateString);
    const thisTime = this.date.getTime();
    const otherTime = otherDate.date.getTime();
    if (thisTime < otherTime) {
      return -1;
    } else if (thisTime > otherTime) {
      return 1;
    } else {
      return 0;
    }
  }

  /**
   * Adds number of days to the current date.
   * @param {int} numDays
   * @return {DateParser} date parser object
   */
  addDays(numDays: number): DateParser {
    const newDate = new Date(this.date);
    newDate.setDate(this.date.getDate() + numDays);
    return new DateParser(newDate.toISOString().split("T")[0]);
  }

  /**
   * Returns formatted date in YYYY-mm-dd
   * @return {String} the formatted date in YYYY-MM-DD
   */
  getFormattedDate(): string {
    const year = this.getYear();
    const month = this.getMonth().toString().padStart(2, "0");
    const day = this.getDay().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
}

export { DateParser };
