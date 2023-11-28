"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = void 0;
/**
 * Base class for form schema validator.
 */
class Validator {
    validate(data, additionalArg, dependsOnValue) {
        throw new Error("Method not implemented");
    }
    success(errorMessage) {
        return {
            error: false,
            errorMessage: errorMessage,
        };
    }
    fail(errorMessage) {
        if (!errorMessage) {
            throw new Error("When error is set, message is required");
        }
        return {
            error: true,
            errorMessage: errorMessage,
        };
    }
}
exports.Validator = Validator;
