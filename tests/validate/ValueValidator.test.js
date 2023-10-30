import { ValueValidator } from '../../src/validate';

describe('ValueValidator', () => {
  let valueValidator;

  beforeEach(() => {
    valueValidator = new ValueValidator();
  });

  describe('validate method', () => {
    it('should return no error for valid numeric input within the range', () => {
      const value = 42;
      const schema = { min: { value: 10, errorMessage: 'Min error' }, max: { value: 50, errorMessage: 'Max error' } };
      const type = 'numeric';
      const result = valueValidator.validate(value, schema, type);

      expect(result).toEqual({
        error: false,
        errorMessage: undefined,
      });
    });

    it('should return an error for numeric input below the min range', () => {
      const value = 5;
      const schema = { min: { value: 10, errorMessage: 'Min error' } };
      const type = 'numeric';
      const result = valueValidator.validate(value, schema, type);

      expect(result).toEqual({
        error: true,
        errorMessage: 'Min error',
      });
    });

    it('should return an error for numeric input above the max range', () => {
      const value = 60;
      const schema = { max: { value: 50, errorMessage: 'Max error' } };
      const type = 'numeric';
      const result = valueValidator.validate(value, schema, type);

      expect(result).toEqual({
        error: true,
        errorMessage: 'Max error',
      });
    });

    it('should return no error for valid date input within the range', () => {
      const value = '2023-01-15';
      const schema = { min: { value: '2023-01-01', errorMessage: 'Min error' }, max: { value: '2023-01-31', errorMessage: 'Max error' } };
      const type = 'date';
      const result = valueValidator.validate(value, schema, type);

      expect(result).toEqual({
        error: false,
        errorMessage: undefined,
      });
    });

    it('should return an error for date input before the min range', () => {
      const value = '2022-12-31';
      const schema = { min: { value: '2023-01-01', errorMessage: 'Min error' } };
      const type = 'date';
      const result = valueValidator.validate(value, schema, type);

      expect(result).toEqual({
        error: true,
        errorMessage: 'Min error',
      });
    });

    it('should return an error for date input after the max range', () => {
      const value = '2023-02-01';
      const schema = { max: { value: '2023-01-31', errorMessage: 'Max error' } };
      const type = 'date';
      const result = valueValidator.validate(value, schema, type);

      expect(result).toEqual({
        error: true,
        errorMessage: 'Max error',
      });
    });

    it('should throw an error for unsupported input type', () => {
      const value = 'value';
      const schema = { min: { value: 1, errorMessage: 'Min error' }, max: { value: 100, errorMessage: 'Max error' } };
      const type = 'unsupported';
      expect(() => {
        valueValidator.validate(value, schema, type);
      }).toThrowError('Unsupported input type: unsupported in ValueValidator');
    });
  });
});
