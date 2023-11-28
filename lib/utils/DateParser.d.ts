/**
 * Date parsing class in TypeScript.
 */
declare class DateParser {
    readonly date: Date;
    /**
     *
     * @param {String} dateString YYYY-MM-DD
     */
    constructor(dateString: string);
    /**
     * Gets full year in 4 char length
     * @return {String} the year
     */
    getYear(): number;
    /**
     * Gets 2 char month
     * @return {String} the month
     */
    getMonth(): number;
    /**
     * Gets 2 char day
     * @return {String} the day
     */
    getDay(): number;
    /**
     * Compare the dates with another date string.
     * @param {String} otherDateString
     * @return {int} -1 if less that otherString, 0 on equal, 1 otherwise
     */
    compareDates(otherDateString: string): number;
    /**
     * Adds number of days to the current date.
     * @param {int} numDays
     * @return {DateParser} date parser object
     */
    addDays(numDays: number): DateParser;
    /**
     * Returns formatted date in YYYY-mm-dd
     * @return {String} the formatted date in YYYY-MM-DD
     */
    getFormattedDate(): string;
}
export { DateParser };
