const { types } = require("../../src");
const { toYupString } = types;
const yup = require("yup");

const isString = fieldDef => fieldDef && fieldDef.type === "string";
const config = { isString };
const create = fieldDef => {
  const obj = fieldDef instanceof Object ? { ...fieldDef, config } : fieldDef;
  return toYupString(obj, config);
};

const createStr = value => {
  const obj = { value, config, key: "x", type: "string" };
  return toYupString(obj, config);
};

const createStrNoKey = value => {
  const obj = { value, config, type: "string" };
  return toYupString(obj, config);
};

describe("toYupString", () => {
  test("null - %", () => {
    expect(create(null)).toBeFalsy();
  });

  test("number - %", () => {
    expect(create(1)).toBeFalsy();
  });

  test("array - %", () => {
    expect(create([1])).toBeFalsy();
  });

  test("object - %", () => {
    expect(create({ x: 2 })).toBeFalsy();
  });

  test("int object - %", () => {
    expect(create({ type: "int" })).toBeFalsy();
  });

  test("string object - ok", () => {
    expect(createStr({})).toBeTruthy();
  });

  test("string - throws missing key", () => {
    expect(() => createStrNoKey("x")).toThrow();
  });

  test("null - throws missing value", () => {
    expect(() => createStr(null)).toThrow();
  });
});
