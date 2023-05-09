import { defineConfig } from "rollup";
import external from "rollup-plugin-peer-deps-external";
// 解决(!) Unresolved dependencies 告诉 Rollup 如何处理在代码中使用的导入语句（例如 import 和 require）
import nodeResolve from "@rollup/plugin-node-resolve";

import rollupTypescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs"; // commonjs 模块转成es6 模块
import babel from "@rollup/plugin-babel"; // es6 -> es5

// [!] (plugin rpt2) RollupError: Unexpected token (Note that you need plugins to import files that are not JavaScript)
const extensions = [".ts"];

export default defineConfig([
  // CommonJS
  {
    input: "src/index.ts",
    output: { file: "dist/index.cjs", format: "cjs", indent: false },
    external: ["react", "react-dom"],
    plugins: [
      external(),
      rollupTypescript(),
      nodeResolve({
        extensions,
      }),
      commonjs(),
      babel({
        exclude: "node_modules/**",
        babelHelpers: "runtime",
        plugins: ["@babel/plugin-transform-runtime"],
      }),
    ],
  },
  // ES
  {
    input: "src/index.ts",
    output: { file: "dist/index.js", format: "es", indent: false },
    external: ["react", "react-dom"],
    plugins: [
      external(),
      rollupTypescript(),
      nodeResolve({
        extensions,
      }),
      commonjs(),
      babel({
        exclude: "node_modules/**",
        babelHelpers: "runtime",
        plugins: ["@babel/plugin-transform-runtime"],
      }),
    ],
  },
  // ES for Browsers
  {
    input: "src/index.ts",
    output: { file: "dist/index.mjs", format: "es", indent: false },
    external: ["react", "react-dom"],
    plugins: [
      external(),
      rollupTypescript(),
      nodeResolve({
        extensions,
      }),
      commonjs(),
      babel({
        exclude: "node_modules/**",
        babelHelpers: "runtime",
        plugins: ["@babel/plugin-transform-runtime"],
      }),
    ],
  },
]);
