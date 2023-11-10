const OptionsValidator = require('../../src/validate/OptionsValidator');

describe('OptionsValidator', () => {
  it('should validate options within the allowed range', () => {
    const validator = new OptionsValidator();
    const schema = {
      values: [
        { value: 'Convention', label: 'Convention' },
        { value: 'Ordinary', label: 'Ordinary' },
        { value: 'Special', label: 'Special' },
      ],
      min: { value: 2, errorMessage: 'Min 2 options must be selected' },
      max: { value: 3, errorMessage: 'Max 3 options are allowed' },
    };
    const value = 'Convention###Ordinary';
    const result = validator.validate(value, schema, '');
    expect(result.error).toBeFalsy();
  });

  it('should fail to validate options when min contraints fail', () => {
    const validator = new OptionsValidator();
    const schema = {
      values: [
        { value: 'Convention', label: 'Convention' },
        { value: 'Ordinary', label: 'Ordinary' },
        { value: 'Special', label: 'Special' },
      ],
      min: { value: 2, errorMessage: 'Min 2 options must be selected' },
      max: { value: 3, errorMessage: 'Max 3 options are allowed' },
    };
    const value = 'Convention';
    const result = validator.validate(value, schema, '');
    expect(result.error).toBeTruthy();
    expect(result.errorMessage).toBe('Min 2 options must be selected');
  });

  it('should fail to validate options when max contraints fail', () => {
    const validator = new OptionsValidator();
    const schema = {
      values: [
        { value: 'Convention', label: 'Convention' },
        { value: 'Ordinary', label: 'Ordinary' },
        { value: 'Special', label: 'Special' },
      ],
      min: { value: 1, errorMessage: 'Min 1 options must be selected' },
      max: { value: 1, errorMessage: 'Max 1 options are allowed' },
    };
    const value = 'Convention###Special';
    const result = validator.validate(value, schema, '');
    expect(result.error).toBeTruthy();
    expect(result.errorMessage).toBe('Max 1 options are allowed');
  });

  it('should validate options within the allowed range with additional values', () => {
    const validator = new OptionsValidator();
    const schema = {
      values: [
        { value: 'Convention', label: 'Convention' },
        { value: 'Ordinary', label: 'Ordinary' },
        { value: 'Special', label: 'Special' },
      ],
      min: { value: 2, errorMessage: 'Min 2 options must be selected' },
      max: { value: 4, errorMessage: 'Max 4 options are allowed' },
    };
    const value = 'Convention###Ordinary###Special';
    const result = validator.validate(value, schema, '');
    expect(result.error).toBeFalsy();
  });

  it('should invalidate options with invalid values', () => {
    const validator = new OptionsValidator();
    const schema = {
      values: [
        { value: 'Convention', label: 'Convention' },
        { value: 'Ordinary', label: 'Ordinary' },
        { value: 'Special', label: 'Special' },
      ],
      min: { value: 1, errorMessage: 'Min 1 options must be selected' },
      max: { value: 3, errorMessage: 'Max 3 options are allowed' },
    };
    const value = 'Invalid###Ordinary';
    const result = validator.validate(value, schema, '');
    expect(result.error).toBeTruthy();
    expect(result.errorMessage).toBe('Invalid values supplied');
  });

  it('should invalidate options with duplicate values', () => {
    const validator = new OptionsValidator();
    const schema = {
      values: [
        { value: 'Convention', label: 'Convention' },
        { value: 'Ordinary', label: 'Ordinary' },
        { value: 'Special', label: 'Special' },
      ],
      min: { value: 2, errorMessage: 'Min 2 options must be selected' },
      max: { value: 3, errorMessage: 'Max 3 options are allowed' },
    };
    const value = 'Convention###Convention';
    const result = validator.validate(value, schema, '');
    expect(result.error).toBeTruthy();
    expect(result.errorMessage).toBe('Min 2 options must be selected');
  });

  it('should pass options with duplicate values but within constraints', () => {
    const validator = new OptionsValidator();
    const schema = {
      values: [
        { value: 'Convention', label: 'Convention' },
        { value: 'Ordinary', label: 'Ordinary' },
        { value: 'Special', label: 'Special' },
      ],
      min: { value: 1, errorMessage: 'Min 1 options must be selected' },
      max: { value: 3, errorMessage: 'Max 3 options are allowed' },
    };
    const value = 'Convention###Convention';
    const result = validator.validate(value, schema, '');
    expect(result.error).toBeFalsy();
  });

  it('should return valid for options within the allowed range', () => {
    const validator = new OptionsValidator();
    const schema = {
      values: [
        { value: 'Convention', label: 'Convention' },
        { value: 'Ordinary', label: 'Ordinary' },
        { value: 'Special', label: 'Special' },
      ],
      min: { value: 2, errorMessage: 'Min 2 options must be selected' },
      max: { value: 3, errorMessage: 'Max 3 options are allowed' },
    };
    const value = 'Convention###Ordinary###Special';
    const result = validator.validate(value, schema, '');
    expect(result.error).toBeFalsy();
  });

  it('should return valid for options within the allowed range without constraints', () => {
    const validator = new OptionsValidator();
    const schema = {
      values: [
        { value: 'Convention', label: 'Convention' },
        { value: 'Ordinary Being', label: 'Ordinary Being' },
        { value: 'Special', label: 'Special' },
      ],
    };
    const value = 'Convention###Ordinary Being###Special';
    const result = validator.validate(value, schema, '');
    expect(result.error).toBeFalsy();
  });

  it('should return error for invalid values without constraints', () => {
    const validator = new OptionsValidator();
    const schema = {
      values: [
        { value: 'Convention', label: 'Convention' },
        { value: 'Ordinary', label: 'Ordinary' },
        { value: 'Special', label: 'Special' },
      ],
    };
    const value = 'Convention###Ordinary###xxx';
    const result = validator.validate(value, schema, '');
    expect(result.error).toBeTruthy();
    expect(result.errorMessage).toBe("Invalid values supplied");
  });
});
