import { DateParser } from "../utils";
import {
  FailFieldResponse,
  MinMaxOptionsProps,
  SuccessFieldResponse,
  Validator,
} from "./_Base";

export type NumberValueValidatorProps = {
  min?: MinMaxOptionsProps;
  max?: MinMaxOptionsProps;
};

export type StringDateValueValidatorProps = {
  min?: {
    value: string;
    errorMessage: string;
  };
  max?: {
    value: string;
    errorMessage: string;
  };
};

export type ValueValidatorProps =
  | NumberValueValidatorProps
  | StringDateValueValidatorProps;

/**
 * A class that implements validator for value validation.
 * Only suited for numeric and date fields.
 */
export class ValueValidator extends Validator<
  number | string,
  ValueValidatorProps
> {
  /**
   * Its the actual value, well suited for numeric and dates.
   * The dates formate are YYYY-MM-DD.
   * @param value The value of the input
   * @param schema The min and max schema
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
  validate(
    value: number,
    schema: ValueValidatorProps
  ): SuccessFieldResponse | FailFieldResponse;
  validate(
    value: string,
    schema: ValueValidatorProps
  ): SuccessFieldResponse | FailFieldResponse;
  validate(value: string | number, schema: ValueValidatorProps) {
    if (typeof value === "number") {
      return this._checkAsNumber(value, schema as NumberValueValidatorProps);
    } else if (typeof value === "string") {
      return this._checkAsDate(value, schema as StringDateValueValidatorProps);
    } else {
      throw new Error(
        `Unsupported input value type: ${typeof value} in ValueValidator`
      );
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
  _checkAsNumber(value: number, schema: NumberValueValidatorProps) {
    const { min, max } = schema;
    if (min && value < min.value) {
      return super.fail(min.errorMessage);
    } else if (max && value > max.value) {
      return super.fail(max.errorMessage);
    } else {
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
  _checkAsDate(value: string, schema: StringDateValueValidatorProps) {
    const date = new DateParser(value);
    const { min, max } = schema;
    if (min && date.compareDates(min.value) === -1) {
      return super.fail(min.errorMessage);
    } else if (max && date.compareDates(max.value) === 1) {
      return super.fail(max.errorMessage);
    } else {
      return super.success();
    }
  }
}
