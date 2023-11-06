const {
  Factory,
  LengthValidator,
  ValueValidator,
  PatternValidator,
  TypeValidator
} = require("../../src");
const DependsOnValidator = require("../../src/validate/DependsOnValidator");

describe('Factory', () => {
  describe('Test getValidator method', () => {
    it('should return a validator based on the validation type', () => {
      expect(Factory.getValidator('length')).toBeInstanceOf(LengthValidator);
      expect(Factory.getValidator('value')).toBeInstanceOf(ValueValidator);
      expect(Factory.getValidator('pattern')).toBeInstanceOf(PatternValidator);
      expect(Factory.getValidator('type')).toBeInstanceOf(TypeValidator);
      expect(Factory.getValidator('depends')).toBeInstanceOf(DependsOnValidator);
    });

    it('should throw an error for an unknown validation type', () => {
      expect(() => {
        Factory.getValidator('unknown');
      }).toThrowError('validation type is not mapped');
    });
  });

  describe('Test validateFields method', () => {
    it('should validate all fields in the data based on the schema', () => {
      const data = {
        field1: 'abc',
        field2: 42,
      };
      const schema = {
        field1: {
          type: "plain",
          validate: { length: { min: { value: 1, errorMessage: 'Min length error' } } },
          required: true,
        },
        field2: {
          type: "numeric",
          validate: { value: { min: { value: 10, errorMessage: 'Min value error' } } },
          required: false,
        },
      };

      const result = Factory.validateFields(data, schema);
      expect(result).toEqual({
        field1: {
          error: false,
          errorMessage: undefined,
        },
        field2: {
          error: false,
          errorMessage: undefined,
        },
        __hasValidationErrors: false,
      });
    });

    it('should throw error because of missing type in value validator', () => {
      const data = {
        field1: 'abc',
        field2: 42,
      };
      const schema = {
        field1: {
          type: "plain",
          validate: { length: { min: { value: 1, errorMessage: 'Min length error' } } },
          required: true,
        },
        field2: {
          validate: { value: { min: { value: 10, errorMessage: 'Min value error' } } },
          required: false,
        },
      };
      expect(() => {
        Factory.validateFields(data, schema);
      }).toThrowError('Unsupported input type: undefined in ValueValidator');
    });

    it('should handle required fields with missing values', () => {
      const data = {
        field1: 'abc',
        field2: null,
      };
      const schema = {
        field1: {
          type: "plain",
          validate: { length: { min: { value: 1, errorMessage: 'Min length error' } } },
          required: true,
        },
        field2: {
          type: "numeric",
          validate: { value: { min: { value: 10, errorMessage: 'Min value error' } } },
          required: true,
        },
      };

      const result = Factory.validateFields(data, schema);

      expect(result).toEqual({
        field1: {
          error: false,
          errorMessage: undefined,
        },
        field2: {
          error: true,
          errorMessage: 'Required Field',
        },
        __hasValidationErrors: true,
      });
    });

    it('should handle non-required fields with missing values', () => {
      const data = {
        field1: 'abc',
        field2: null,
      };
      const schema = {
        field1: {
          type: "plain",
          validate: { length: { min: { value: 1, errorMessage: 'Min length error' } } },
          required: true,
        },
        field2: {
          type: "numeric",
          validate: { value: { min: { value: 10, errorMessage: 'Min value error' } } },
          required: false,
        },
      };

      const result = Factory.validateFields(data, schema);

      expect(result).toEqual({
        field1: {
          error: false,
          errorMessage: undefined,
        },
        field2: {
          error: false,
          errorMessage: undefined,
        },
        __hasValidationErrors: false,
      });
    });
  });

  describe('validateSingleField method', () => {
    it('should validate a single field based on the validation schema', () => {
      const data = {
        field1: 'abc',
        field2: 'tbx',
      }
      const schema = {
        field1: {
          type: "plain",
          validate: {
            length: { min: { value: 1, errorMessage: 'Min length error' } },
            pattern: { regex: /^[a-z]+$/, errorMessage: 'Pattern error' },
          },
          required: true,
        }
      };
      const result = Factory.validateSingleField("field1", data, schema);

      expect(result).toEqual({
        error: false,
        errorMessage: undefined,
      });
    });

    it('should stop validation on the first error', () => {
      const data = {
        field1: '123',
      }
      const schema = {
        field1: {
          type: "plain",
          validate: {
            length: { min: { value: 5, errorMessage: 'Min length error' } },
            pattern: { regex: /^[a-z]+$/, errorMessage: 'Pattern error' },
          },
          required: true,
        }
      };
      const result = Factory.validateSingleField("field1", data, schema);
      expect(result).toEqual({
        error: true,
        errorMessage: 'Min length error',
      });
    });

    it('should return default response if no validation types are provided', () => {
      const data = {
        field1: 'abc',
      }
      const schema = {
        field1: {
          type: "plain",
          required: true,
        }
      };
      const result = Factory.validateSingleField("field1", data, schema);
      expect(result).toEqual({
        error: false,
        errorMessage: undefined,
      });
    });

    it('should handle pattern validation error from the validator', () => {
      const data = {
        field1: 'abc9',
      }
      const schema = {
        field1: {
          type: "plain",
          required: true,
          validate: {
            length: { min: { value: 1, errorMessage: 'Min length error' } },
            pattern: { regex: /^[a-z]+$/, errorMessage: 'Pattern error' },
          }
        }
      };
      const result = Factory.validateSingleField("field1", data, schema);
      expect(result).toEqual({
        error: true,
        errorMessage: 'Pattern error',
      });
    });
  });
});
