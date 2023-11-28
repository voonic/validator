export type SuccessFieldResponse = {
  error: false;
  errorMessage?: string;
};

export type FailFieldResponse = {
  error: true;
  errorMessage: string;
};

export type MinMaxOptionsProps = {
  value: number;
  errorMessage: string;
};

export type BaseValidator<S, T> = {
  validate(
    data: S,
    additionalArg: T,
    dependsOnValue?: S
  ): FailFieldResponse | SuccessFieldResponse;
};

/**
 * Base class for form schema validator.
 */
export class Validator<S, T> implements BaseValidator<S, T> {
  validate(
    data: S,
    additionalArg: T,
    dependsOnValue?: S
  ): FailFieldResponse | SuccessFieldResponse {
    throw new Error("Method not implemented");
  }
  success(errorMessage?: string): SuccessFieldResponse {
    return {
      error: false,
      errorMessage: errorMessage,
    };
  }

  fail(errorMessage: string): FailFieldResponse {
    if (!errorMessage) {
      throw new Error("When error is set, message is required");
    }
    return {
      error: true,
      errorMessage: errorMessage,
    };
  }
}
