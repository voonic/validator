const LengthValidator = require('./LengthValidator');
const PatternValidator = require('./PatternValidator');
const TypeValidator = require('./TypeValidator');
const ValueValidator = require('./ValueValidator');
const Validator = require('./_Base');

const ValidationTypesMap = {
  length: LengthValidator,
  value: ValueValidator,
  pattern: PatternValidator,
  type: TypeValidator,
};

/**
 * A class for validation fatory that validates individual fields and
 * returns error if any.
 */
class Factory {
  /**
   * Static method for getting valitor based on schema.
   * @param {string} validationType The validation type
   * @return {Validator} The validator
   */
  static getValidator(validationType) {
    const ValidationClass = ValidationTypesMap[validationType];
    if (!ValidationClass) {
      throw new Error("validation type is not mapped");
    }
    return new ValidationClass();
  }

  /**
   * Validate fixed set of fields.
   * Ideal for backend function.
   * @param {Object} data The data from client.
   * @param {Object} schema The all field scchema.
   * @return {Object} The validated response.
   * {
   *   fieldName: {
   *     error: true|false,
   *     errorMessage: "Some error message"
   *   },
   *   anotherFieldName: {
   *     error: true|false,
   *     errorMessage: "Some error message"
   *   }
   * }
   */
  static validateFields(data, schema) {
    const fields = Object.keys(data);
    fields.forEach((field) => {
      const { validate, required } = schema[field];
      const fieldValue = data[field];
      let result = {};
      if (fieldValue) {
        result = Factory.validateSchema(fieldValue, validate);
      } else {
        if (required) {
          result = new Validator().getResponse(true, "Required Field");
        } else {
          result = new Validator().getResponse(false);
        }
      }
      if (result.error) {
        data.__hasValidationErrors = true;
      }
      data[field].error = result.error;
      data[field].errorMessage = result.errorMessage;
    });
    return data;
  }

  /**
   * Validates all the validation properties for a single field.
   * @param {any} fieldValue The value of the field.
   * @param {Object} validateSchema The validation schema.
   * @return {Object} validation response
   */
  static validateSingleField(fieldValue, validateSchema) {
    const validationRequested = Object.keys(validateSchema || {});
    let result = new Validator().getResponse(false);
    validationRequested.every((validationType) => {
      const validator = Factory.getValidator(validationType);
      const conditions = validateSchema[validationType];
      result = validator.validate(fieldValue, conditions);
      return !result.error;
    });
    return result;
  }
}

module.exports = Factory;