import Validator from "./_Base";

/**
 * A class that implements validator for Regex Pattern validation.
 */
export default class PatternValidator extends Validator {
  /**
   * @param {String} value The value of the input
   * @param {Object} schema The regex schema
   * {
   *    regex: regex,
   *    errorMessage: String,
   * }
   * @param {string} _ The input type
   * @return {Object} returns the response.
   */
  validate(value, schema, _) {
    const { regex, errorMessage } = schema;
    const pattern = new RegExp(regex);
    if (pattern.test(value)) {
      return super.getResponse(false);
    } else {
      return super.getResponse(true, errorMessage);
    }
  }
}
