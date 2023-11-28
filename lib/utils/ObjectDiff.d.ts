/**
 * Compares two objects and returns the difference in keys and values.
 * The values returned will always be from the second object (obj2).
 * @param {Object} obj1 The old value
 * @param {Object} obj2 The new value
 * @return {Object} The difference
 */
declare const ObjectDiff: (obj1: Record<string, any>, obj2: Record<string, any>) => Record<string, any>;
export { ObjectDiff };
