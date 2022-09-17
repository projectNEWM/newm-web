import { isPlainObject, mapKeys, mapValues } from "lodash";

// eslint-disable-next-line
const deepMap = (obj: object, mapper: (val: any) => any): any => {
  return mapper(
    // eslint-disable-next-line
    mapValues(obj, (val: any) => {
      return isPlainObject(val) ? deepMap(val, mapper) : val;
    })
  );
};

/**
 * Maps all keys of an object using a given transform function.
 */
export const transformKeys = (
  record: object,
  transform: (key: string) => string
  // eslint-disable-next-line
): Record<string, any> => {
  return deepMap(record, (obj) => {
    return mapKeys(obj, (val, key) => transform(key));
  });
};
