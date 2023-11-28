import { FailFieldResponse, MinMaxOptionsProps, SuccessFieldResponse, Validator } from "./_Base";
export type LengthValidatorProps = {
    min?: MinMaxOptionsProps;
    max?: MinMaxOptionsProps;
};
/**
 * A class that implements validator for Length validation.
 */
export declare class LengthValidator extends Validator<string, LengthValidatorProps> {
    /**
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
     * @param value The value of the input
     * @param schema The min and max schema
     */
    validate(value: string, schema: LengthValidatorProps): SuccessFieldResponse | FailFieldResponse;
}
