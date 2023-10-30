import { TypeValidator } from '../../src/validate';

describe('TypeValidator', () => {
  let typeValidator;

  beforeEach(() => {
    typeValidator = new TypeValidator();
  });

  describe('validate method', () => {
    it('should return no error for valid number input', () => {
      const value = 42;
      const schema = { type: 'number', errorMessage: 'Type error' };
      const result = typeValidator.validate(value, schema);

      expect(result).toEqual({
        error: false,
        errorMessage: undefined,
      });
    });

    it('should return no error for valid boolean input', () => {
      const value = true;
      const schema = { type: 'boolean', errorMessage: 'Type error' };
      const result = typeValidator.validate(value, schema);

      expect(result).toEqual({
        error: false,
        errorMessage: undefined,
      });
    });

    it('should return no error for valid string input', () => {
      const value = 'Hello, World!';
      const schema = { type: 'string', errorMessage: 'Type error' };
      const result = typeValidator.validate(value, schema);

      expect(result).toEqual({
        error: false,
        errorMessage: undefined,
      });
    });

    it('should return no error for valid date input', () => {
      const value = '2023-01-01';
      const schema = { type: 'date', errorMessage: 'Type error' };
      const result = typeValidator.validate(value, schema);

      expect(result).toEqual({
        error: false,
        errorMessage: undefined,
      });
    });

    it('should return an error for invalid number input', () => {
      const value = 'not a number';
      const schema = { type: 'number', errorMessage: 'Type error' };
      const result = typeValidator.validate(value, schema);

      expect(result).toEqual({
        error: true,
        errorMessage: 'Type error',
      });
    });

    it('should return an error for invalid boolean input', () => {
      const value = 'not a boolean';
      const schema = { type: 'boolean', errorMessage: 'Type error' };
      const result = typeValidator.validate(value, schema);

      expect(result).toEqual({
        error: true,
        errorMessage: 'Type error',
      });
    });

    it('should return an error for invalid string input', () => {
      const value = 42;
      const schema = { type: 'string', errorMessage: 'Type error' };
      const result = typeValidator.validate(value, schema);

      expect(result).toEqual({
        error: true,
        errorMessage: 'Type error',
      });
    });

    it('should return an error for invalid date input', () => {
      const value = 'invalid-date';
      const schema = { type: 'date', errorMessage: 'Type error' };
      const result = typeValidator.validate(value, schema);

      expect(result).toEqual({
        error: true,
        errorMessage: 'Type error',
      });
    });

    it('should throw an error for unsupported type', () => {
      const value = 'value';
      const schema = { type: 'unsupported', errorMessage: 'Type error' };
      expect(() => {
        typeValidator.validate(value, schema);
      }).toThrowError('Unsupported type: unsupported in TypeValidator');
    });
  });
});
