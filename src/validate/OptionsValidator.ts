import {
  FailFieldResponse,
  MinMaxOptionsProps,
  SuccessFieldResponse,
  Validator,
} from "./_Base";

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
export class OptionsValidator extends Validator<
  string[],
  OptionsValidatorProps
> {
  /**
   * @param value The value of the input is Array
   * @param schema The min and max schema
   * @param _ The input type
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
  validate(
    value: string[],
    schema: OptionsValidatorProps,
    _: string
  ): SuccessFieldResponse | FailFieldResponse {
    const { min, max, values } = schema;
    if (!Array.isArray(value)) {
      return super.fail("Invalid value type supplied");
    }
    let allContained = value.every((userValue) =>
      values.some((v) => v.value === userValue)
    );
    if (allContained) {
      var userValuesSet = new Set(value);
      if (min && userValuesSet.size < min.value) {
        return super.fail(min.errorMessage);
      } else if (max && userValuesSet.size > max.value) {
        return super.fail(max.errorMessage);
      } else {
        return super.success();
      }
    } else {
      return super.fail("Invalid values supplied");
    }
  }
}
