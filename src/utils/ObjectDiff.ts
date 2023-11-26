/**
 * Compares two objects and returns the difference in keys and values.
 * The values returned will always be from the second object (obj2).
 * @param {Object} obj1 The old value
 * @param {Object} obj2 The new value
 * @return {Object} The difference
 */
const ObjectDiff = (
  obj1: Record<string, any>,
  obj2: Record<string, any>
): Record<string, any> => {
  const diff: Record<string, any> = {};

  for (const key in obj1) {
    if (Object.prototype.hasOwnProperty.call(obj1, key)) {
      if (!Object.prototype.hasOwnProperty.call(obj2, key)) {
        // Key is present in obj1 but not in obj2
        diff[key] = obj1[key];
      } else {
        // Both objects have the key, compare values
        if (typeof obj1[key] === "object" && typeof obj2[key] === "object") {
          // If both values are objects, recursively check the nested objects
          const nestedDiff = ObjectDiff(obj1[key], obj2[key]);
          if (Object.keys(nestedDiff).length > 0) {
            diff[key] = nestedDiff;
          }
        } else if (obj1[key] !== obj2[key]) {
          // Values are different, use the value from obj2
          diff[key] = obj2[key];
        }
      }
    }
  }

  for (const key in obj2) {
    if (
      Object.prototype.hasOwnProperty.call(obj2, key) &&
      !Object.prototype.hasOwnProperty.call(obj1, key)
    ) {
      // Key is present in obj2 but not in obj1
      diff[key] = obj2[key];
    }
  }

  return diff;
};

export { ObjectDiff };
