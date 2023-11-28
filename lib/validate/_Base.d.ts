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
    validate(data: S, additionalArg: T, dependsOnValue?: S): FailFieldResponse | SuccessFieldResponse;
};
/**
 * Base class for form schema validator.
 */
export declare class Validator<S, T> implements BaseValidator<S, T> {
    validate(data: S, additionalArg: T, dependsOnValue?: S): FailFieldResponse | SuccessFieldResponse;
    success(errorMessage?: string): SuccessFieldResponse;
    fail(errorMessage: string): FailFieldResponse;
}
