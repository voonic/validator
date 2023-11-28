import { FailFieldResponse, MinMaxOptionsProps, SuccessFieldResponse, Validator } from "./_Base";
export type OptionsProps = {
    value: string;
    label: string;
};
export type OptionsValidatorProps = {
    values: OptionsProps[];
    min?: MinMaxOptionsProps;
    max?: MinMaxOptionsProps;
};
/**
 * A class that implements validator for options validation.
 * This is good for validation select options from which user select
 * fixed predefined values.
 */
export declare class OptionsValidator extends Validator<string[], OptionsValidatorProps> {
    /**
     * @param value The value of the input is Array
     * @param schema The min and max schema
     * "values": [
     *    {
     *      "value": "Convention",
     *       "label": "Convention"
     *    },
     *    {
     *      "value": "Ordinary",
     *      "label": "Ordinary"
     *    }
     *  ],
     *  min: {
     *    value: 2, // min options count that should be selected
     *    errorMessage: "Min 2 options must be selected"
     *  },
     *  max: {
     *    value: 3, // min options count that should be selected
     *    errorMessage: "Max 3 options are allowed"
     *  },
     * }
     */
    validate(value: string[], schema: OptionsValidatorProps): SuccessFieldResponse | FailFieldResponse;
}
