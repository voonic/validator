import Validator from "./_Base";

/**
 * A class that implements validator for type validation.
 */
export default class TypeValidator extends Validator {
  /**
   * @param {String} value The value of the input
   * @param {Object} schema The schema
   * {
   *    dataType: string|number|date|boolean,
   *    errorMessage: String,
   * }
   * @param {string} _ The input type
   * @return {Object} returns the response.
   */
  validate(value, schema, _) {
    const { type: dataType, errorMessage } = schema;
    if (dataType === "number") {
      if (typeof value === "number") {
        return super.getResponse(false);
      } else {
        return super.getResponse(true, errorMessage);
      }
    } if (dataType === "boolean") {
      if (typeof value === "boolean") {
        return super.getResponse(false);
      } else {
        return super.getResponse(true, errorMessage);
      }
    } if (dataType === "string") {
      if (typeof value === "string") {
        return super.getResponse(false);
      } else {
        return super.getResponse(true, errorMessage);
      }
    } else if (dataType === "date") {
      let date = new Date(value);
      if (!isNaN(date.getTime())) {
        return super.getResponse(false);
      } else {
        return super.getResponse(true, errorMessage);
      }
    } else {
      throw new Error(`Unsupported type: ${dataType} in TypeValidator`);
    }
  }
}
