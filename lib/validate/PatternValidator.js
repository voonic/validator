"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatternValidator = void 0;
const _Base_1 = require("./_Base");
/**
 * A class that implements validator for Regex Pattern validation.
 */
class PatternValidator extends _Base_1.Validator {
    /**
     * @param value The value of the input
     * @param schema The regex schema
     * {
     *    regex: regex,
     *    errorMessage: String,
     * }
     */
    validate(value, schema) {
        const { regex, errorMessage } = schema;
        const pattern = new RegExp(regex);
        if (pattern.test(value)) {
            return super.success();
        }
        else {
            return super.fail(errorMessage);
        }
    }
}
exports.PatternValidator = PatternValidator;
