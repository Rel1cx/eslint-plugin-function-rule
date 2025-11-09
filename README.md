# eslint-plugin-function-rule

ESLint plugin to write custom rules with JavaScript functions.

> [!WARNING]
> This package is a work in progress and is not yet ready for production use.

## Installation

```sh
# npm
npm install --save-dev eslint-plugin-function-rule
```

## Configure ESLint

### Write function rules inline

```js
// eslint.config.ts

import eslintJs from "@eslint/js";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import functionRule from "eslint-plugin-function-rule";
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
      "function-rule": functionRule((context) => {
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
        } satisfies RuleListener;
      }),
    },
  },
);
```

### Import function rules from modules

```js
// noDebugger.ts

// Define and document function rule options
export interface noDebuggerOptions {
  /**
   * @deprecated Use bar instead
   */
  foo: string
  bar: string
}

// Define and document function rule
/**
 * Remove debugger from code
 *
 * @param options The rule options
 * @returns RuleFunction
 */
export function noDebugger(options?: noDebuggerOptions): RuleDefinition["create"] {
  return (context) => {
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
    } satisfies RuleListener;
  };
}
```

```js
// Import and use function rule

// ...
import { noDebugger } from "./noDebugger.ts";

const noDebuggerRule = noDebugger({ bar: "pass rule options" });

export default defineConfig(
  // ...
  {
    files: ["**/*.ts"],
    rules: {
      "function-rule/function-rule": "error",
    },
    plugins: {
      "function-rule": functionRule((context) => {
        noDebuggerRule(context);
      }),
    },
  },
);
```
