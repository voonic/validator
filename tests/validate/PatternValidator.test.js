import { PatternValidator } from '../../src/validate';

describe('PatternValidator', () => {
  let patternValidator;

  beforeEach(() => {
    patternValidator = new PatternValidator();
  });

  describe('validate method', () => {
    it('should return no error when value matches the specified regex pattern', () => {
      const value = 'abc123';
      const schema = { regex: /^[a-z0-9]+$/, errorMessage: 'Pattern error' };
      const result = patternValidator.validate(value, schema);

      expect(result).toEqual({
        error: false,
        errorMessage: undefined,
      });
    });

    it('should return an error when value does not match the specified regex pattern', () => {
      const value = 'abc@123';
      const schema = { regex: /^[a-z0-9]+$/, errorMessage: 'Pattern error' };
      const result = patternValidator.validate(value, schema);

      expect(result).toEqual({
        error: true,
        errorMessage: 'Pattern error',
      });
    });

    it('should handle case-insensitive regex patterns', () => {
      const value = 'ABC';
      const schema = { regex: /^[a-z]+$/, errorMessage: 'Pattern error' };
      const result = patternValidator.validate(value, schema);

      expect(result).toEqual({
        error: true,
        errorMessage: 'Pattern error',
      });
    });

    it('should handle complex regex patterns', () => {
      const value = '123-456';
      const schema = { regex: /^\d{3}-\d{3}$/, errorMessage: 'Pattern error' };
      const result = patternValidator.validate(value, schema);

      expect(result).toEqual({
        error: false,
        errorMessage: undefined,
      });
    });
  });
});
