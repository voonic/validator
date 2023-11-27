import { Validator } from "../../src/validate";

describe("Validator", () => {
  let validator;

  beforeEach(() => {
    validator = new Validator();
  });

  describe("validate method", () => {
    it('should throw "Method not implemented" error', () => {
      expect(() => {
        validator.validate();
      }).toThrow("Method not implemented");
    });
  });

  describe("success method", () => {
    it("should return an object with success", () => {
      const response = validator.success();
      expect(response).toEqual({
        error: false,
        errorMessage: undefined,
      });
    });

    it("should return an object with success with message", () => {
      const errorMessage = "message";
      const response = validator.success(errorMessage);
      expect(response).toEqual({
        error: false,
        errorMessage: errorMessage,
      });
    });
  });

  describe("fail method", () => {
    it("should return an object with error: true and errorMessage when error is set", () => {
      const errorMessage = "Example error message";
      const response = validator.fail(errorMessage);
      expect(response).toEqual({
        error: true,
        errorMessage: errorMessage,
      });
    });

    it("should throw an error if hasError is true but errorMessage is not provided", () => {
      expect(() => {
        validator.fail("");
      }).toThrow("When error is set, message is required");
    });
  });
});
