ESLint plugin to write custom rules with JavaScript functions.

> [!WARNING]
> This package is a work in progress and is not yet ready for production use.

## Index

- [Index](#index)
- [Installation](#installation)
- [Write function rules inline](#write-function-rules-inline)
- [Or import function rules from modules](#or-import-function-rules-from-modules)
- [Define multiple function rules with custom prefix](#define-multiple-function-rules-with-custom-prefix)
- [License](#license)

## Installation

```sh
# npm
npm install --save-dev eslint-plugin-function-rule
```

## Write function rules inline

```js
// eslint.config.ts

import type { Rule } from "eslint";
import { defineConfig } from "eslint/config";
import { defineRule } from "eslint-plugin-function-rule";

export default defineConfig(
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
        };
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
    return (context: Rule.RuleContext): Rule.RuleListener => ({
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

import { defineRule } from "eslint-plugin-function-rule";
import { defineConfig } from "eslint/config";
import { noDebugger } from "./noDebugger.ts";

export default defineConfig(
  {
    files: ["**/*.ts"],
    rules: {
      "function-rule/function-rule": "error",
    },
    plugins: {
      "function-rule": defineRule(noDebugger({/* pass rule options */})),
    },
  },
);
```

## Define multiple function rules with custom prefix

```js
// eslint.config.ts

import { defineRule } from "eslint-plugin-function-rule";
import { defineConfig } from "eslint/config";

export default defineConfig(
  {
    files: ["**/*.ts"],
    rules: {
      "custom-1/function-rule": 1,
      "custom-2/function-rule": 2,
    },
    plugins: {
      "custom-1": defineRule((context) => {
        return {/* your won rule logic */};
      }),
      "custom-2": defineRule((context) => {
        return {/* your won rule logic */};
      }),
    },
  },
);
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

This project is and will continue to maintain that 90% of the code is written by humans.
