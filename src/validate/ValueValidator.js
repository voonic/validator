import Validator from "./_Base";
import DateParser from "../utils/DateParser";

/**
 * A class that implements validator for value validation.
 * Only suited for numeric and date fields.
 */
export default class ValueValidator extends Validator {
  /**
   * Its the actual value, well suited for numeric and dates.
   * The dates formate are YYYY-MM-DD.
   * @param {String} value The value of the input
   * @param {Object} schema The min and max schema
   * {
   *  min: {
   *    value: number,
   *    errorMessage: String,
   *  },
   *  max: {
   *    value: number,
   *    errorMessage: String,
   *  },
   * }
   * @param {string} type The input type
   * @return {Object} returns the response.
   */
  validate(value, schema, type) {
    if (type === "numeric") {
      return this._checkAsNumber(value, schema);
    } else if (type === "date") {
      return this._checkAsDate(value, schema);
    } else {
      throw new Error(`Unsupported input type: ${type} in ValueValidator`);
    }
  }

  /**
   * Checks the value as number.
   * @param {String} value The value of the input
   * @param {Object} schema The min and max schema
   * {
   *  min: {
   *    value: number,
   *    errorMessage: String,
   *  },
   *  max: {
   *    value: number,
   *    errorMessage: String,
   *  },
   * }
   * @param {string} type The input type
   * @return {Object} returns the response.
   */
  _checkAsNumber(value, schema) {
    const { min, max } = schema;
    if (min && value < min.value) {
      return super.getResponse(true, min.errorMessage);
    } else if (max && value > max.value) {
      return super.getResponse(true, max.errorMessage);
    } else {
      return super.getResponse(false);
    }
  }

  /**
   * Checks the value as date.
   * @param {String} value The value of the input
   * @param {Object} schema The min and max schema
   * {
   *  min: {
   *    value: number,
   *    errorMessage: String,
   *  },
   *  max: {
   *    value: number,
   *    errorMessage: String,
   *  },
   * }
   * @param {string} type The input type
   * @return {Object} returns the response.
   */
  _checkAsDate(value, schema) {
    const date = new DateParser(value);
    const { min, max } = schema;
    if (min && date.compareDates(min) === -1) {
      return super.getResponse(true, min.errorMessage);
    } else if (max && date.compareDates(max) === 1) {
      return super.getResponse(true, max.errorMessage);
    } else {
      return super.getResponse(false);
    }
  }
}
