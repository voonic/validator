"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LengthValidator = void 0;
const _Base_1 = require("./_Base");
/**
 * A class that implements validator for Length validation.
 */
class LengthValidator extends _Base_1.Validator {
    /**
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
     * @param value The value of the input
     * @param schema The min and max schema
     * @param {string} _ The input type
     */
    validate(value, schema, _) {
        const { min, max } = schema;
        if (min && value.length < min.value) {
            return super.fail(min.errorMessage);
        }
        else if (max && value.length > max.value) {
            return super.fail(max.errorMessage);
        }
        else {
            return super.success();
        }
    }
}
exports.LengthValidator = LengthValidator;
