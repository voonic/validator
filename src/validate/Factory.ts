import { LengthValidator, LengthValidatorProps } from "./LengthValidator";
import { OptionsValidator, OptionsValidatorProps } from "./OptionsValidator";
import { PatternValidator, PatternValidatorProps } from "./PatternValidator";
import { TypeValidator, TypeValidatorProps } from "./TypeValidator";
import { ValueValidator, ValueValidatorProps } from "./ValueValidator";
import {
  DependsOnValidator,
  DependsOnValidatorProps,
} from "./DependsOnValidator";
import {
  BaseValidator,
  FailFieldResponse,
  SuccessFieldResponse,
  Validator,
} from "./_Base";

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

const ValidationTypesMap: ValidationTypesMapProps = {
  length: LengthValidator,
  value: ValueValidator,
  pattern: PatternValidator,
  type: TypeValidator,
  depends: DependsOnValidator,
  options: OptionsValidator,
};

/**
 * A class for validation fatory that validates individual fields and
 * returns error if any.
 */
export class Factory {
  /**
   * Static method for getting valitor based on schema.
   * @param validationType The validation type
   * @return The validator
   */
  static getValidator(
    validationType: ValidationTypeParamProps
  ): BaseValidator<
    string | string[] | number | boolean,
    ValueOf<ValidatorProps>
  > {
    const ValidationClass = ValidationTypesMap[validationType];
    if (!ValidationClass) {
      throw new Error(`${validationType}: validation type is not mapped`);
    }
    return new ValidationClass();
  }

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
  static validateFields(
    data: DataProps,
    schema: SchemaProps
  ): ValidationResultProps {
    const formResult: ValidationResultProps = {
      error: false,
      result: {},
    };
    const fields = Object.keys(data);
    fields.forEach((field) => {
      let result = Factory.validateSingleField(field, data, schema);
      formResult.result[field] = {
        error: result.error,
        errorMessage: result.errorMessage ? result.errorMessage : "",
      };
      if (result.error) {
        formResult.error = true;
      }
    });
    return formResult;
  }

  /**
   * Validates the single field by running all validators on them.
   * @param field The field to validate
   * @param data The overall form data
   * @param schema The all form schema
   * @returns the validation result for single field
   */
  static validateSingleField(
    field: string,
    data: DataProps,
    schema: SchemaProps
  ): SuccessFieldResponse | FailFieldResponse {
    const { validate, required, type } = schema[field];
    const fieldValue = data[field];
    if (fieldValue) {
      if (validate) {
        const validateKeys = Object.keys(validate) as (keyof ValidatorProps)[];
        for (let i = 0; i < validateKeys.length; i++) {
          const currentValidationKey = validateKeys[i];
          const validatorInstance = Factory.getValidator(currentValidationKey);
          const conditions = validate[currentValidationKey];
          let dependsOnValue = null;
          if (validatorInstance instanceof DependsOnValidator && conditions) {
            const dependsOnconditions = conditions as DependsOnValidatorProps;
            dependsOnValue = data[dependsOnconditions.on];
          }
          let result = validatorInstance.validate(
            fieldValue,
            conditions,
            type,
            dependsOnValue
          );
          if (result.error) {
            return result;
          }
        }
      }
      return new Validator().success();
    } else {
      if (required) {
        return new Validator().fail("Required Field");
      } else {
        return new Validator().success();
      }
    }
  }
}
