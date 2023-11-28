"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Factory = void 0;
const LengthValidator_1 = require("./LengthValidator");
const OptionsValidator_1 = require("./OptionsValidator");
const PatternValidator_1 = require("./PatternValidator");
const TypeValidator_1 = require("./TypeValidator");
const ValueValidator_1 = require("./ValueValidator");
const DependsOnValidator_1 = require("./DependsOnValidator");
const _Base_1 = require("./_Base");
const ValidationTypesMap = {
    length: LengthValidator_1.LengthValidator,
    value: ValueValidator_1.ValueValidator,
    pattern: PatternValidator_1.PatternValidator,
    type: TypeValidator_1.TypeValidator,
    depends: DependsOnValidator_1.DependsOnValidator,
    options: OptionsValidator_1.OptionsValidator,
};
/**
 * A class for validation fatory that validates individual fields and
 * returns error if any.
 */
class Factory {
    /**
     * Static method for getting valitor based on schema.
     * @param validationType The validation type
     * @return The validator
     */
    static getValidator(validationType) {
        const ValidationClass = ValidationTypesMap[validationType];
        if (!ValidationClass) {
            throw new Error(`${validationType}: validation type is not mapped`);
        }
        return new ValidationClass();
    }
    /**
     * Validate fixed set of fields.
     * Ideal for backend function.
     * @param data The data from client.
     * @param schema The all field scchema.
     * @return The validated response.
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
            error: false,
            result: {},
        };
        const fields = Object.keys(data);
        fields.forEach((field) => {
            let result = Factory.validateSingleField(field, data, schema);
            formResult.result[field] = result;
            if (result.error) {
                formResult.error = true;
            }
        });
        return formResult;
    }
    /**
     * Validates the single field by running all validators on them.
     * @param field The field to validate
     * @param data The overall form data
     * @param schema The all form schema
     * @returns the validation result for single field
     */
    static validateSingleField(field, data, schema) {
        const { validate, required, type } = schema[field];
        const fieldValue = data[field];
        if (fieldValue) {
            if (validate) {
                const validateKeys = Object.keys(validate);
                for (let i = 0; i < validateKeys.length; i++) {
                    const currentValidationKey = validateKeys[i];
                    const validatorInstance = Factory.getValidator(currentValidationKey);
                    const conditions = validate[currentValidationKey];
                    let dependsOnValue = null;
                    if (validatorInstance instanceof DependsOnValidator_1.DependsOnValidator && conditions) {
                        const dependsOnconditions = conditions;
                        dependsOnValue = data[dependsOnconditions.on];
                    }
                    let result = validatorInstance.validate(fieldValue, conditions, type, dependsOnValue);
                    if (result.error) {
                        return result;
                    }
                }
            }
            return new _Base_1.Validator().success();
        }
        else {
            if (required) {
                return new _Base_1.Validator().fail("Required Field");
            }
            else {
                return new _Base_1.Validator().success();
            }
        }
    }
}
exports.Factory = Factory;
