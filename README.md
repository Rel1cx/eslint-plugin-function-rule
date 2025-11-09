ESLint plugin to write custom rules with JavaScript functions.

> [!WARNING]
> This package is a work in progress and is not yet ready for production use.

## Index

- [Index](#index)
- [Installation](#installation)
- [Write function rules inline](#write-function-rules-inline)
- [Or import function rules from modules](#or-import-function-rules-from-modules)
- [Define multiple function rules with custom prefix](#define-multiple-function-rules-with-custom-prefix)

## Installation

```sh
# npm
npm install --save-dev eslint-plugin-function-rule
```

## Write function rules inline

```js
// eslint.config.ts

import eslintJs from "@eslint/js";
import type { Rule } from "eslint";
import { defineRule } from "eslint-plugin-function-rule";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig(
  {
    files: ["**/*.ts", "**/*.tsx"],
    extends: [
      eslintJs.configs.recommended,
      tseslint.configs.recommended,
    ],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ["**/*.ts"],
    rules: {
      "function-rule/function-rule": "error",
    },
    plugins: {
      "function-rule": defineRule((context) => {
        return {
          DebuggerStatement(node) {
            context.report({
              node,
              message: "Remove 'debugger' from code.",

              fix(fixer) {
                return fixer.remove(node);
              },
            });
          },
        } satisfies Rule.RuleListener;
      }),
    },
  },
);
```

## Or import function rules from modules

```js
// noDebugger.ts

import type { Rule } from "eslint";
import { defineRuleListener } from "eslint-plugin-function-rule";

// Define and document function rule options
export interface noDebuggerOptions {}

// Define and document function rule
export function noDebugger(options?: noDebuggerOptions) {
    return (context: Rule.RuleContext) => defineRuleListener({
        DebuggerStatement(node) {
            context.report({
                node,
                message: "Remove 'debugger' from code.",

                fix(fixer) {
                    return fixer.remove(node);
                },
            });
        },
    });
}
```

```js
// eslint.config.ts

// ...
import { defineRule } from "eslint-plugin-function-rule";
import { noDebugger } from "./noDebugger.ts";

export default defineConfig(
  // ...
  {
    files: ["**/*.ts"],
    rules: {
      "function-rule/function-rule": "error",
    },
    plugins: {
      "function-rule": defineRule(noDebugger({ /* pass rule options */ })),
    },
  },
);
```

## Define multiple function rules with custom prefix

```js
// eslint.config.ts

// ...
import { defineRule } from "eslint-plugin-function-rule";

export default defineConfig(
  // ...
  {
    files: ["**/*.ts"],
    rules: {
      "custom-1/function-rule": 1,
      "custom-2/function-rule": 2,
    },
    plugins: {
      "custom-1": defineRule((context) => {
        return { /* your won rule logic */ }
      }),
      "custom-2": defineRule((context) => {
        return { /* your won rule logic */ }
      }),
    },
  },
);
```
