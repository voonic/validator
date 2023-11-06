const DependsOnValidator = require('../../src/validate/DependsOnValidator');

describe('DependsOnValidator', () => {
  describe('validate', () => {
    it('should validate numeric input with min constraint', () => {
      const validator = new DependsOnValidator();
      const schema = { on: 'inputprop-name', min: { value: -3, errorMessage: 'Invalid value' } };
      const inputType = 'numeric';
      const dependsValue = 10;

      const result = validator.validate(5, schema, inputType, dependsValue, inputType);
      const result2 = validator.validate(7, schema, inputType, dependsValue, inputType);
      expect(result.error).toBeTruthy();
      expect(result.errorMessage).toBe('Invalid value');
      expect(result2.error).toBeFalsy();
    });

    it('should validate numeric input with max constraint', () => {
      const validator = new DependsOnValidator();
      const schema = { on: 'inputprop-name', max: { value: 21, errorMessage: 'Invalid value' } };
      const inputType = 'numeric';
      const dependsValue = 10;

      const result = validator.validate(32, schema, inputType, dependsValue, inputType);
      const result2 = validator.validate(31, schema, inputType, dependsValue, inputType);
      expect(result.error).toBeTruthy();
      expect(result.errorMessage).toBe('Invalid value');
      expect(result2.error).toBeFalsy();
    });

    it('should return valid for numeric input within range', () => {
      const validator = new DependsOnValidator();
      const schema = { on: 'inputprop-name', min: { value: -3, errorMessage: 'Invalid value' }, max: { value: -1, errorMessage: 'Invalid value' } };
      const inputType = 'numeric';
      const dependsValue = 10;
      const result = validator.validate(8, schema, inputType, dependsValue, inputType);
      const result2 = validator.validate(10, schema, inputType, dependsValue, inputType);
      expect(result.error).toBeFalsy();
      expect(result2.error).toBeTruthy();
      expect(result2.errorMessage).toBe('Invalid value');
    });

    it('should validate date input with min constraint', () => {
      const validator = new DependsOnValidator();
      const schema = { on: 'inputprop-name', min: { value: -3, errorMessage: 'Invalid date' } };
      const inputType = 'date';
      const dependsValue = '2023-01-01';
      const result = validator.validate('2022-12-28', schema, inputType, dependsValue, inputType);
      const result2 = validator.validate('2022-12-29', schema, inputType, dependsValue, inputType);
      expect(result.error).toBeTruthy();
      expect(result.errorMessage).toBe('Invalid date');
      expect(result2.error).toBeFalsy();
    });

    it('should validate date input with max constraint', () => {
      const validator = new DependsOnValidator();
      const schema = { on: 'inputprop-name', max: { value: 21, errorMessage: 'Invalid date' } };
      const inputType = 'date';
      const dependsValue = '2023-01-01';

      const result = validator.validate('2023-01-23', schema, inputType, dependsValue, inputType);
      const result2 = validator.validate('2023-01-22', schema, inputType, dependsValue, inputType);
      expect(result.error).toBeTruthy();
      expect(result.errorMessage).toBe('Invalid date');
      expect(result2.error).toBeFalsy();
    });

    it('should return valid for date input within range', () => {
      const validator = new DependsOnValidator();
      const schema = { on: 'inputprop-name', min: { value: 1, errorMessage: 'Invalid date' }, max: { value: 5, errorMessage: 'Invalid date' } };
      const inputType = 'date';
      const dependsValue = '2023-01-01';

      const result = validator.validate('2023-01-02', schema, inputType, dependsValue, inputType);
      const result2 = validator.validate('2023-01-07', schema, inputType, dependsValue, inputType);
      expect(result.error).toBeFalsy();
      expect(result2.error).toBeTruthy();
      expect(result2.errorMessage).toBe('Invalid date');
    });

    it('should throw an error for unknown input type', () => {
      const validator = new DependsOnValidator();
      const schema = { on: 'inputprop-name' };
      const inputType = 'text';
      const dependsValue = 'some-value';
      const dependsType = 'text';

      expect(() => validator.validate('value', schema, inputType, dependsValue, dependsType))
        .toThrowError('Unknown input type in ValueValidator, works only for date and numeric');
    });
  });
});
