import { DateParser } from "../utils";
import {
  FailFieldResponse,
  MinMaxOptionsProps,
  SuccessFieldResponse,
  Validator,
} from "./_Base";

export type NumberValueValidatorProps = {
  type: "number";
  min?: MinMaxOptionsProps;
  max?: MinMaxOptionsProps;
};

export type StringDateValueValidatorProps = {
  type: "date";
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
export class ValueValidator extends Validator {
  /**
   * Its the actual value, well suited for numeric and dates.
   * The dates formate are YYYY-MM-DD.
   * @param value The value of the input
   * @param schema The min and max schema
   * @param type The input type
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
    schema: ValueValidatorProps,
    type: string
  ): SuccessFieldResponse | FailFieldResponse;
  validate(
    value: string,
    schema: ValueValidatorProps,
    type: string
  ): SuccessFieldResponse | FailFieldResponse;
  validate(value: string | number, schema: ValueValidatorProps, type: string) {
    if (type === "numeric" && typeof value === "number") {
      if (schema.type === "number") {
        return this._checkAsNumber(value, schema);
      } else {
        throw new Error(
          `Input type is numeric but schema value is not a number`
        );
      }
    } else if (type === "date" && typeof value === "string") {
      if (schema.type === "date") {
        return this._checkAsDate(value, schema);
      } else {
        throw new Error(
          `Input type is date but schema value is not a string date`
        );
      }
    } else {
      throw new Error(`Unsupported input type: ${type} in ValueValidator`);
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
