// src/mock/index.js
const test1 = require('./test.cjs');
module.exports = () => {
    return {
        test1,
    };
};