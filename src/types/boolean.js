const { YupMixed } = require("./mixed");

class BooleanHandler {
  constructor(config) {
    this.config = config;
  }

  isBoolean(obj) {
    return this.config.isBoolean(obj);
  }

  handle(obj) {
    return this.isBoolean(obj) && YupBoolean.create(obj).yupped();
  }
}

function toYupBoolean(obj, config = {}) {
  return obj && new BooleanHandler(config).handle(obj);
}

class YupBoolean extends YupMixed {
  constructor(obj) {
    super(obj);
    this.type = "boolean";
    this.base = this.yup.boolean();
  }

  static create(obj) {
    return new YupBoolean(obj);
  }
}

module.exports = {
  toYupBoolean,
  YupBoolean
};
