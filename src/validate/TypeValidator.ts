import { FailFieldResponse, SuccessFieldResponse, Validator } from "./_Base";

export type TypeValidatorProps = {
  type: "number" | "boolean" | "string" | "date";
  errorMessage: string;
};

/**
 * A class that implements validator for type validation.
 */
export class TypeValidator extends Validator<
  number | string | boolean,
  TypeValidatorProps
> {
  /**
   * @param value The value of the input
   * @param schema The schema
   * @param _ The input type
   * {
   *    type: string|number|date|boolean,
   *    errorMessage: String,
   * }
   */
  validate(
    value: number,
    schema: TypeValidatorProps,
    _: string
  ): SuccessFieldResponse | FailFieldResponse;
  validate(
    value: string,
    schema: TypeValidatorProps,
    _: string
  ): SuccessFieldResponse | FailFieldResponse;
  validate(
    value: boolean,
    schema: TypeValidatorProps,
    _: string
  ): SuccessFieldResponse | FailFieldResponse;
  validate(
    value: number | string | boolean,
    schema: TypeValidatorProps,
    _: string
  ) {
    const { type, errorMessage } = schema;
    if (type === "number") {
      if (typeof value === "number") {
        return super.success();
      } else {
        return super.fail(errorMessage);
      }
    }
    if (type === "boolean") {
      if (typeof value === "boolean") {
        return super.success();
      } else {
        return super.fail(errorMessage);
      }
    }
    if (type === "string") {
      if (typeof value === "string") {
        return super.success();
      } else {
        return super.fail(errorMessage);
      }
    } else if (type === "date" && typeof value === "string") {
      let date = new Date(value);
      if (!isNaN(date.getTime())) {
        return super.success();
      } else {
        return super.fail(errorMessage);
      }
    } else {
      throw new Error(`Unsupported type: ${type} in TypeValidator`);
    }
  }
}
