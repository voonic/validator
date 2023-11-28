import { FailFieldResponse, SuccessFieldResponse, Validator } from "./_Base";
export type TypeValidatorProps = {
    type: "number" | "boolean" | "string" | "date";
    errorMessage: string;
};
/**
 * A class that implements validator for input value data type validation.
 */
export declare class TypeValidator extends Validator<number | string | boolean, TypeValidatorProps> {
    /**
     * @param value The value of the input
     * @param schema The schema
     * {
     *    type: string|number|date|boolean,
     *    errorMessage: String,
     * }
     */
    validate(value: number, schema: TypeValidatorProps): SuccessFieldResponse | FailFieldResponse;
    validate(value: string, schema: TypeValidatorProps): SuccessFieldResponse | FailFieldResponse;
    validate(value: boolean, schema: TypeValidatorProps): SuccessFieldResponse | FailFieldResponse;
}
