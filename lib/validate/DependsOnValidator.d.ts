import { FailFieldResponse, MinMaxOptionsProps, SuccessFieldResponse, Validator } from "./_Base";
export type DependsOnValidatorProps = {
    on: string;
    min?: MinMaxOptionsProps;
    max?: MinMaxOptionsProps;
};
export declare class DependsOnValidator extends Validator<number | string, DependsOnValidatorProps> {
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
    validate(value: number, schema: DependsOnValidatorProps, inputType: "numeric", dependsValue: number): SuccessFieldResponse | FailFieldResponse;
    validate(value: string, schema: DependsOnValidatorProps, inputType: "date", dependsValue: string): SuccessFieldResponse | FailFieldResponse;
    _checkAsNumber(value: number, schema: DependsOnValidatorProps, dependsValue: number): SuccessFieldResponse | FailFieldResponse;
    _checkAsDate(value: string, schema: DependsOnValidatorProps, dependsValue: string): SuccessFieldResponse | FailFieldResponse;
}
