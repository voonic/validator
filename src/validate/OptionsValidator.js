const Validator = require('./_Base');

/**
 * A class that implements validator for options validation.
 * This is good for validation select options from which user select
 * fixed predefined values.
 */
class OptionsValidator extends Validator {
  /**
   * @param {Array} value The value of the input is Array
   * @param {Object} schema The min and max schema
   * "values": [
   *    {
   *      "value": "Convention",
   *       "label": "Convention"
   *    },
   *    {
   *      "value": "Ordinary",
   *      "label": "Ordinary"
   *    }
   *  ],
   *  min: {
   *    value: 2, // min options count that should be selected
   *    errorMessage: "Min 2 options must be selected"
   *  },
   *  max: {
   *    value: 3, // min options count that should be selected
   *    errorMessage: "Max 3 options are allowed"
   *  },
   * }
   * @param {string} _ The input type
   * @return {Object} returns the response.
   */
  validate(value, schema, _) {
    const { min, max, values } = schema;
    if (!Array.isArray(value)) {
      return super.getResponse(true, "Invalid value type supplied");
    }
    let allContained =
      value.every(userValue => values.some(v => v.value === userValue));
    if (allContained) {
      var userValuesSet = new Set(value);
      if (min && userValuesSet.size < min.value) {
        return super.getResponse(true, min.errorMessage);
      } else if (max && userValuesSet.size > max.value) {
        return super.getResponse(true, max.errorMessage);
      } else {
        return super.getResponse(false);
      }
    } else {
      return super.getResponse(true, "Invalid values supplied");
    }
  }
}

module.exports = OptionsValidator;


