import { LengthValidatorProps } from "./LengthValidator";
import { OptionsValidatorProps } from "./OptionsValidator";
import { PatternValidatorProps } from "./PatternValidator";
import { TypeValidatorProps } from "./TypeValidator";
import { ValueValidatorProps } from "./ValueValidator";
import { DependsOnValidatorProps } from "./DependsOnValidator";
import { BaseValidator, FailFieldResponse, SuccessFieldResponse } from "./_Base";
type ValidationTypesMapProps = {
    [key: string]: new () => BaseValidator<any, any>;
};
export type ValidationTypeParamProps = keyof ValidationTypesMapProps;
export type ValidatorProps = {
    length?: LengthValidatorProps;
    value?: ValueValidatorProps;
    pattern?: PatternValidatorProps;
    type?: TypeValidatorProps;
    depends?: DependsOnValidatorProps;
    options?: OptionsValidatorProps;
};
export type InputSchemaProps = {
    type: string;
    name: string;
    label: string;
    flex?: number;
    value?: string | string[];
    placeholder?: string;
    required?: boolean;
    maxLength?: number;
    validate?: ValidatorProps;
};
export type SchemaProps = {
    [key: string]: InputSchemaProps;
};
export type DataProps = {
    [key: string]: any;
};
export type ValidationResultProps = {
    error: boolean;
    result: {
        [key: string]: SuccessFieldResponse | FailFieldResponse;
    };
};
type ValueOf<T> = T[keyof T];
/**
 * A class for validation fatory that validates individual fields and
 * returns error if any.
 */
export declare class Factory {
    /**
     * Static method for getting valitor based on schema.
     * @param validationType The validation type
     * @return The validator
     */
    static getValidator(validationType: ValidationTypeParamProps): BaseValidator<string | string[] | number | boolean, ValueOf<ValidatorProps>>;
    /**
     * Validate fixed set of fields.
     * Ideal for backend function.
     * @param data The data from client.
     * @param schema The all field scchema.
     * @return The validated response.
     * {
     *   fieldName: {
     *     error: true|false,
     *     errorMessage: "Some error message"
     *   },
     *   anotherFieldName: {
     *     error: true|false,
     *     errorMessage: "Some error message"
     *   }
     * }
     */
    static validateFields(data: DataProps, schema: SchemaProps): ValidationResultProps;
    /**
     * Validates the single field by running all validators on them.
     * @param field The field to validate
     * @param data The overall form data
     * @param schema The all form schema
     * @returns the validation result for single field
     */
    static validateSingleField(field: string, data: DataProps, schema: SchemaProps): SuccessFieldResponse | FailFieldResponse;
}
export {};
