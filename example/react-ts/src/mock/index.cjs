// src/mock/index.js
const test1 = require("./test.cjs");
const test2 = require("./test2.cjs");
module.exports = () => {
  return {
    test1,
    test2,
  };
};
