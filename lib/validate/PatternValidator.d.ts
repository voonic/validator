import { FailFieldResponse, SuccessFieldResponse, Validator } from "./_Base";
export type PatternValidatorProps = {
    regex: string;
    errorMessage: string;
};
/**
 * A class that implements validator for Regex Pattern validation.
 */
export declare class PatternValidator extends Validator<string, PatternValidatorProps> {
    /**
     * @param value The value of the input
     * @param schema The regex schema
     * @param _ The input type
     * {
     *    regex: regex,
     *    errorMessage: String,
     * }
     */
    validate(value: string, schema: PatternValidatorProps, _: string): SuccessFieldResponse | FailFieldResponse;
}
