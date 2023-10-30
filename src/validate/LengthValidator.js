const Validator = require('./_Base');

/**
 * A class that implements validator for Length validation.
 */
class LengthValidator extends Validator {
  /**
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
   * @param {string} _ The input type
   * @return {Object} returns the response.
   */
  validate(value, schema, _) {
    const { min, max } = schema;
    if (min && value.length < min.value) {
      return super.getResponse(true, min.errorMessage);
    } else if (max && value.length > max.value) {
      return super.getResponse(true, max.errorMessage);
    } else {
      return super.getResponse(false);
    }
  }
}

module.exports = LengthValidator;
