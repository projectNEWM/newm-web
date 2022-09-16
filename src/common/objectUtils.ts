import _, { isPlainObject, mapKeys, mapValues } from "lodash";

// eslint-disable-next-line
const deepMap = (obj: object, mapper: (val: any) => any): any => {
  return mapper(
    // eslint-disable-next-line
    mapValues(obj, (v: any) => {
      return isPlainObject(v) ? deepMap(v, mapper) : v;
    })
  );
};

/**
 * Maps all keys of an object using a given transform function.
 */
export const transformKeys = (
  record: object,
  // eslint-disable-next-line
  transform: (key: string) => any
  // eslint-disable-next-line
): Record<string, any> => {
  return deepMap(record, (x) => {
    return mapKeys(x, function (val, key) {
      return transform(key);
    });
  });
};
