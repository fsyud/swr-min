import { defineConfig } from "rollup";
import rollupTypescript from "@rollup/plugin-typescript"; //
import resolve from "@rollup/plugin-node-resolve"; // 告诉 Rollup 如何处理在代码中使用的导入语句（例如 import 和 require）
import commonjs from "@rollup/plugin-commonjs"; // commonjs 模块转成es6 模块
import babel from "@rollup/plugin-babel"; // es6 -> es5

// [!] (plugin rpt2) RollupError: Unexpected token (Note that you need plugins to import files that are not JavaScript)
const extensions = [".ts"];

// 后续打包扩展
const external = [];

export default defineConfig([
  // CommonJS
  {
    input: "src/index.ts",
    output: { file: "dist/index.cjs", format: "cjs", indent: false },
    external,
    plugins: [
      rollupTypescript(),
      commonjs(),
      resolve(),
      babel({
        extensions,
        exclude: "node_modules/**",
        babelHelpers: "bundled",
      }),
    ],
  },
  // ES
  {
    input: "src/index.ts",
    output: { file: "dist/index.js", format: "es", indent: false },
    external,
    plugins: [
      rollupTypescript(),
      commonjs(),
      resolve(),
      babel({
        extensions,
        exclude: "node_modules/**",
        babelHelpers: "bundled",
      }),
    ],
  },
  // ES for Browsers
  {
    input: "src/index.ts",
    output: { file: "dist/index.mjs", format: "es", indent: false },
    external,
    plugins: [
      rollupTypescript(),
      commonjs(),
      resolve(),
      babel({
        extensions,
        exclude: "node_modules/**",
        babelHelpers: "bundled",
      }),
    ],
  },
]);
