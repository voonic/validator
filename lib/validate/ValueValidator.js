"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValueValidator = void 0;
const utils_1 = require("../utils");
const _Base_1 = require("./_Base");
/**
 * A class that implements validator for value validation.
 * Only suited for numeric and date fields.
 */
class ValueValidator extends _Base_1.Validator {
    validate(value, schema, _) {
        if (typeof value === "number") {
            return this._checkAsNumber(value, schema);
        }
        else if (typeof value === "string") {
            return this._checkAsDate(value, schema);
        }
        else {
            throw new Error(`Unsupported input value type: ${typeof value} in ValueValidator`);
        }
    }
    /**
     * Checks the value as number.
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
     */
    _checkAsNumber(value, schema) {
        const { min, max } = schema;
        if (min && value < min.value) {
            return super.fail(min.errorMessage);
        }
        else if (max && value > max.value) {
            return super.fail(max.errorMessage);
        }
        else {
            return super.success();
        }
    }
    /**
     * Checks the value as date.
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
     */
    _checkAsDate(value, schema) {
        const date = new utils_1.DateParser(value);
        const { min, max } = schema;
        if (min && date.compareDates(min.value) === -1) {
            return super.fail(min.errorMessage);
        }
        else if (max && date.compareDates(max.value) === 1) {
            return super.fail(max.errorMessage);
        }
        else {
            return super.success();
        }
    }
}
exports.ValueValidator = ValueValidator;
