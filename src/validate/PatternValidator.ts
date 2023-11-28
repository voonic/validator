import { FailFieldResponse, SuccessFieldResponse, Validator } from "./_Base";

export type PatternValidatorProps = {
  regex: string;
  errorMessage: string;
};

/**
 * A class that implements validator for Regex Pattern validation.
 */
export class PatternValidator extends Validator<string, PatternValidatorProps> {
  /**
   * @param value The value of the input
   * @param schema The regex schema
   * {
   *    regex: regex,
   *    errorMessage: String,
   * }
   */
  validate(
    value: string,
    schema: PatternValidatorProps
  ): SuccessFieldResponse | FailFieldResponse {
    const { regex, errorMessage } = schema;
    const pattern = new RegExp(regex);
    if (pattern.test(value)) {
      return super.success();
    } else {
      return super.fail(errorMessage);
    }
  }
}
