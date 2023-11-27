import { DateParser } from "../utils";
import {
  FailFieldResponse,
  MinMaxOptionsProps,
  SuccessFieldResponse,
  Validator,
} from "./_Base";

export type DependsOnValidatorProps = {
  on: string;
  min?: MinMaxOptionsProps;
  max?: MinMaxOptionsProps;
};

export class DependsOnValidator extends Validator {
  /**
   * Its the actual value, well suited for numeric and dates.
   * The dates formate are YYYY-MM-DD.
   * The add method will add that number in the depends on input value,
   * and if that's of type date, it will add that many days to the
   * depends on field.
   *
   * @param value The value of the input
   * @param schema The min and max schema
   * @param inputType The input type, must be same of which it depends
   * @param dependsValue The value on which it depends
   * depends: {
   *  on: "inputprop-name"
   *  min: {
   *    value: -3, // subtract 3 from depends on input and make that value min
   *    errorMessage: String,
   *  },
   *  max: {
   *    value: 21, // add 21 to depends on input and make that value max
   *    errorMessage: String,
   *  },
   * }
   */
  validate(
    value: number,
    schema: DependsOnValidatorProps,
    inputType: "numeric",
    dependsValue: number
  ): SuccessFieldResponse | FailFieldResponse;
  validate(
    value: string,
    schema: DependsOnValidatorProps,
    inputType: "date",
    dependsValue: string
  ): SuccessFieldResponse | FailFieldResponse;
  validate(
    value: string | number,
    schema: DependsOnValidatorProps,
    inputType: "numeric" | "date",
    dependsValue: string | number
  ): SuccessFieldResponse | FailFieldResponse {
    if (
      inputType === "numeric" &&
      typeof value === "number" &&
      typeof dependsValue === "number"
    ) {
      return this._checkAsNumber(value, schema, dependsValue);
    } else if (
      inputType === "date" &&
      typeof value === "string" &&
      typeof dependsValue === "string"
    ) {
      return this._checkAsDate(value, schema, dependsValue);
    } else {
      throw new Error(
        "Unknown input type in ValueValidator, works only for date and numeric"
      );
    }
  }

  _checkAsNumber(
    value: number,
    schema: DependsOnValidatorProps,
    dependsValue: number
  ): SuccessFieldResponse | FailFieldResponse {
    const { min, max } = schema;
    if (min && value < dependsValue + min.value) {
      return super.fail(min.errorMessage);
    } else if (max && value > dependsValue + max.value) {
      return super.fail(max.errorMessage);
    } else {
      return super.success();
    }
  }

  _checkAsDate(
    value: string,
    schema: DependsOnValidatorProps,
    dependsValue: string
  ): SuccessFieldResponse | FailFieldResponse {
    const date = new DateParser(value);
    const dependsDate = new DateParser(dependsValue);
    const { min, max } = schema;
    if (
      min &&
      date.compareDates(dependsDate.addDays(min.value).getFormattedDate()) ===
        -1
    ) {
      return super.fail(min.errorMessage);
    } else if (
      max &&
      date.compareDates(dependsDate.addDays(max.value).getFormattedDate()) === 1
    ) {
      return super.fail(max.errorMessage);
    } else {
      return super.success();
    }
  }
}
