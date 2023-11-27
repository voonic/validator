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

/**
 * Base class for form schema validator.
 */
export class Validator {
  success(errorMessage?: string): SuccessFieldResponse {
    return {
      error: false,
      errorMessage: errorMessage,
    };
  }

  fail(errorMessage: string): FailFieldResponse {
    return {
      error: true,
      errorMessage: errorMessage,
    };
  }
}
