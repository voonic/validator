"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DependsOnValidator = void 0;
const utils_1 = require("../utils");
const _Base_1 = require("./_Base");
class DependsOnValidator extends _Base_1.Validator {
    validate(value, schema, inputType, dependsValue) {
        if (inputType === "numeric" &&
            typeof value === "number" &&
            typeof dependsValue === "number") {
            return this._checkAsNumber(value, schema, dependsValue);
        }
        else if (inputType === "date" &&
            typeof value === "string" &&
            typeof dependsValue === "string") {
            return this._checkAsDate(value, schema, dependsValue);
        }
        else {
            throw new Error("Unknown input type in ValueValidator, works only for date and numeric");
        }
    }
    _checkAsNumber(value, schema, dependsValue) {
        const { min, max } = schema;
        if (min && value < dependsValue + min.value) {
            return super.fail(min.errorMessage);
        }
        else if (max && value > dependsValue + max.value) {
            return super.fail(max.errorMessage);
        }
        else {
            return super.success();
        }
    }
    _checkAsDate(value, schema, dependsValue) {
        const date = new utils_1.DateParser(value);
        const dependsDate = new utils_1.DateParser(dependsValue);
        const { min, max } = schema;
        if (min &&
            date.compareDates(dependsDate.addDays(min.value).getFormattedDate()) ===
                -1) {
            return super.fail(min.errorMessage);
        }
        else if (max &&
            date.compareDates(dependsDate.addDays(max.value).getFormattedDate()) === 1) {
            return super.fail(max.errorMessage);
        }
        else {
            return super.success();
        }
    }
}
exports.DependsOnValidator = DependsOnValidator;
