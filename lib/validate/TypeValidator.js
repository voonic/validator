"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeValidator = void 0;
const _Base_1 = require("./_Base");
/**
 * A class that implements validator for type validation.
 */
class TypeValidator extends _Base_1.Validator {
    validate(value, schema, _) {
        const { type, errorMessage } = schema;
        if (type === "number") {
            if (typeof value === "number") {
                return super.success();
            }
            else {
                return super.fail(errorMessage);
            }
        }
        if (type === "boolean") {
            if (typeof value === "boolean") {
                return super.success();
            }
            else {
                return super.fail(errorMessage);
            }
        }
        if (type === "string") {
            if (typeof value === "string") {
                return super.success();
            }
            else {
                return super.fail(errorMessage);
            }
        }
        else if (type === "date" && typeof value === "string") {
            let date = new Date(value);
            if (!isNaN(date.getTime())) {
                return super.success();
            }
            else {
                return super.fail(errorMessage);
            }
        }
        else {
            throw new Error(`Unsupported type: ${type} in TypeValidator`);
        }
    }
}
exports.TypeValidator = TypeValidator;
