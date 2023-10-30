import { Validator } from '../../src/validate';

describe('Validator', () => {
  let validator;

  beforeEach(() => {
    validator = new Validator();
  });

  describe('validate method', () => {
    it('should throw "Method not implemented" error', () => {
      expect(() => {
        validator.validate();
      }).toThrowError('Method not implemented');
    });
  });

  describe('getResponse method', () => {
    it('should return an object with error: false and no errorMessage', () => {
      const response = validator.getResponse(false);
      expect(response).toEqual({
        error: false,
        errorMessage: undefined,
      });
    });

    it('should return an object with error: true and errorMessage when error is set', () => {
      const errorMessage = 'Example error message';
      const response = validator.getResponse(true, errorMessage);
      expect(response).toEqual({
        error: true,
        errorMessage: errorMessage,
      });
    });

    it('should throw an error if hasError is true but errorMessage is not provided', () => {
      expect(() => {
        validator.getResponse(true);
      }).toThrowError('When error is set, message is required');
    });
  });
});
