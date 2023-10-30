/**
 * Base class for form schema validator.
 */
class Validator {
  /**
   *
   * @param {*} value The input value
   * @param {Object} schema The schema specific to that input
   * @param {string} type The input type
   */
  validate(value, schema, type) {
    throw new Error("Method not implemented");
  }

  /**
   * Returns a response that in the format being read by UI.
   * @param {Bool} hasError if it cotains error
   * @param {String} errorMessage The error message
   * @return {Object} object of structure {error: bool, errorMessage: 'Message'}
   */
  getResponse(hasError, errorMessage) {
    if (hasError && !errorMessage) {
      throw new Error("When error is set, message is required");
    }
    return {
      error: hasError,
      errorMessage,
    };
  }
}

module.exports = Validator;