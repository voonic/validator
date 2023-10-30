import { LengthValidator } from '../../src/validate';

describe('LengthValidator', () => {
  let lengthValidator;

  beforeEach(() => {
    lengthValidator = new LengthValidator();
  });

  describe('validate method', () => {
    it('should return no error when value length is within the specified range', () => {
      const value = 'abcd';
      const schema = { min: { value: 2, errorMessage: 'Min length error' }, max: { value: 5, errorMessage: 'Max length error' } };
      const result = lengthValidator.validate(value, schema);

      expect(result).toEqual({
        error: false,
        errorMessage: undefined,
      });
    });

    it('should return an error when value length is less than min', () => {
      const value = 'abc';
      const schema = { min: { value: 4, errorMessage: 'Min length error' } };
      const result = lengthValidator.validate(value, schema);

      expect(result).toEqual({
        error: true,
        errorMessage: 'Min length error',
      });
    });

    it('should return an error when value length is greater than max', () => {
      const value = 'abcdef';
      const schema = { max: { value: 4, errorMessage: 'Max length error' } };
      const result = lengthValidator.validate(value, schema);

      expect(result).toEqual({
        error: true,
        errorMessage: 'Max length error',
      });
    });

    it('should return an error when both min and max constraints are violated', () => {
      const value = 'abc';
      const schema = { min: { value: 4, errorMessage: 'Min length error' }, max: { value: 2, errorMessage: 'Max length error' } };
      const result = lengthValidator.validate(value, schema);

      expect(result).toEqual({
        error: true,
        errorMessage: 'Min length error',
      });
    });
  });
});
