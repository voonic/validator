const DependsOnValidator = require('./DependsOnValidator');
const LengthValidator = require('./LengthValidator');
const OptionsValidator = require('./OptionsValidator');
const PatternValidator = require('./PatternValidator');
const TypeValidator = require('./TypeValidator');
const ValueValidator = require('./ValueValidator');
const Validator = require('./_Base');

const ValidationTypesMap = {
  length: LengthValidator,
  value: ValueValidator,
  pattern: PatternValidator,
  type: TypeValidator,
  depends: DependsOnValidator,
  options: OptionsValidator
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
    const formResult = {
      __hasValidationErrors: false,
    };
    const fields = Object.keys(data);
    fields.forEach((field) => {
      formResult[field] = {};
      let result = Factory.validateSingleField(field, data, schema);
      if (result.error) {
        formResult.__hasValidationErrors = true;
      }
      formResult[field].error = result.error;
      formResult[field].errorMessage = result.errorMessage;
    });
    return formResult;
  }

  /**
   * Validates the single field by running all validators on them.
   * @param {string} field The field to validate
   * @param {Object} data The overall form data
   * @param {Object} schema The all form schema
   * @returns {Object} the validation result for single field
   */
  static validateSingleField(field, data, schema) {
    const { validate, required, type } = schema[field];
    const fieldValue = data[field];
    if (fieldValue) {
      //Get all validation keys, so that we can get respective validator
      const validateKeys = Object.keys(validate || {});
      for (let i = 0; i < validateKeys.length; i++) {
        const currentValidationKey = validateKeys[i];
        const validator = Factory.getValidator(currentValidationKey);
        const conditions = validate[currentValidationKey];
        const dependsOnValue = validator instanceof DependsOnValidator ? data[conditions.on] : null;
        let result = validator.validate(fieldValue, conditions, type, dependsOnValue);
        if (result.error) {
          return result;
        }
      }
      return new Validator().getResponse(false);
    } else {
      if (required) {
        return new Validator().getResponse(true, "Required Field");
      } else {
        return new Validator().getResponse(false);
      }
    }
  }
}

module.exports = Factory;