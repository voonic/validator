const Validator = require('./_Base');
const DateParser = require("../utils/DateParser");

class DependsOnValidator extends Validator {
  /**
   * Its the actual value, well suited for numeric and dates.
   * The dates formate are YYYY-MM-DD.
   * The add method will add that number in the depends on input value,
   * and if that's of type date, it will add that many days to the
   * depends on field.
   *
   * @param {String} value The value of the input
   * @param {Object} schema The min and max schema
   * @param {string} inputType The input type, must be same of which it depends
   * @param {any} dependsValue The value on which it depends
   * depends: {
   *  on: "inputprop-name"
   *  min: {
   *    value: -3, // subtract 3 from depends on input and make that value min
   *    errorMessage: String,
   *  },
   *  max: {
   *    value: 21, // add 21 to depends on input and make that value max
   *    errorMessage: String,
   *  },
   * }
   */
  validate(value, schema, inputType, dependsValue) {
    if (inputType === "numeric") {
      return this._checkAsNumber(value, schema, dependsValue);
    } else if (inputType === "date") {
      return this._checkAsDate(value, schema, dependsValue);
    } else {
      throw new Error(
        "Unknown input type in ValueValidator, works only for date and numeric",
      );
    }
  }

  _checkAsNumber(value, schema, dependsValue) {
    const { min, max } = schema;
    if (min && value < dependsValue + min.value) {
      return super.getResponse(true, min.errorMessage);
    } else if (max && value > dependsValue + max.value) {
      return super.getResponse(true, max.errorMessage);
    } else {
      return super.getResponse(false);
    }
  }

  _checkAsDate(value, schema, dependsValue) {
    const date = new DateParser(value);
    const dependsDate = new DateParser(dependsValue);
    const { min, max } = schema;
    if (min && date.compareDates(dependsDate.addDays(min.value).getFormattedDate()) === -1) {
      return super.getResponse(true, min.errorMessage);
    } else if (max && date.compareDates(dependsDate.addDays(max.value).getFormattedDate()) === 1) {
      return super.getResponse(true, max.errorMessage);
    } else {
      return super.getResponse(false);
    }
  }
}

module.exports = DependsOnValidator;