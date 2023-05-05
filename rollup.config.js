import rollupTypescript from "@rollup/plugin-typescript"; //
import resolve from "@rollup/plugin-node-resolve"; // 告诉 Rollup 如何处理在代码中使用的导入语句（例如 import 和 require）
import commonjs from "@rollup/plugin-commonjs"; // commonjs 模块转成es6 模块
import babel from "@rollup/plugin-babel"; // es6 -> es5

// 一段自定义的内容，以下内容会添加到打包结果中
const footer = `
if(typeof window !== 'undefined') {
  window._Ho_HOOKS_VERSION_ = 1.0.0
}`;

export default {
  input: "src/index.ts",
  output: [
    {
      file: "dist/index.esm.js",
      format: "esm",
      footer,
    },
    {
      name: "use_swr",
      file: "dist/index.browser.js",
      format: "umd",
      footer,
    },
  ],
  plugins: [
    rollupTypescript(),
    commonjs(),
    resolve(),
    babel({
      exclude: "node_modules/**",
    }),
  ],
};
