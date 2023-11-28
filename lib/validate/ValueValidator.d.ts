import { FailFieldResponse, MinMaxOptionsProps, SuccessFieldResponse, Validator } from "./_Base";
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
export type ValueValidatorProps = NumberValueValidatorProps | StringDateValueValidatorProps;
/**
 * A class that implements validator for value validation.
 * Only suited for numeric and date fields.
 */
export declare class ValueValidator extends Validator<number | string, ValueValidatorProps> {
    /**
     * Its the actual value, well suited for numeric and dates.
     * The dates formate are YYYY-MM-DD.
     * @param value The value of the input
     * @param schema The min and max schema
     * @param _ The input type
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
    validate(value: number, schema: ValueValidatorProps, _: string): SuccessFieldResponse | FailFieldResponse;
    validate(value: string, schema: ValueValidatorProps, _: string): SuccessFieldResponse | FailFieldResponse;
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
    _checkAsNumber(value: number, schema: NumberValueValidatorProps): SuccessFieldResponse | FailFieldResponse;
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
    _checkAsDate(value: string, schema: StringDateValueValidatorProps): SuccessFieldResponse | FailFieldResponse;
}
