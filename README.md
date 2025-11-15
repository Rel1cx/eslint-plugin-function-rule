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
import { functionRule } from "eslint-plugin-function-rule";

export default defineConfig(
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
        };
      }),
    },
  },
);
```

## Or import function rules from modules

```js
// no-null.ts

import type { Rule } from "eslint";

export function noNull(options?: { enableAutoFix?: boolean; enableSuggest?: boolean }) {
  const { enableAutoFix = false, enableSuggest = false } = options ?? {};
  return (context: Rule.RuleContext): Rule.RuleListener => {
    return {
      Literal(node) {
        if (node.raw !== "null") return;
        function fix(fixer: Rule.RuleFixer) {
          return fixer.replaceText(node, "undefined");
        }
        context.report({
          node: node.parent,
          message: "Avoid using 'null'; Use 'undefined' instead.",
          ...enableAutoFix ? { fix } : {},
          ...enableSuggest ? { suggest: [{ fix, desc: "Replace with 'undefined'." }] } : {},
        });
      },
    };
  };
}
```

```js
// eslint.config.ts

import { functionRule } from "eslint-plugin-function-rule";
import { defineConfig } from "eslint/config";
import { noNull } from "./no-null.ts";

export default defineConfig(
  {
    files: ["**/*.ts"],
    rules: {
      "function-rule/function-rule": "error",
    },
    plugins: {
      "function-rule": functionRule(noNull({ enableAutoFix: true })),
    },
  },
);
```

## Define multiple function rules with custom prefix

```js
// eslint.config.ts

import { functionRule } from "eslint-plugin-function-rule";
import { defineConfig } from "eslint/config";

export default defineConfig(
  {
    files: ["**/*.ts"],
    rules: {
      "custom-1/function-rule": 1,
      "custom-2/function-rule": 2,
    },
    plugins: {
      "custom-1": functionRule((context) => {
        return {/* your won rule logic */};
      }),
      "custom-2": functionRule((context) => {
        return {/* your won rule logic */};
      }),
    },
  },
);
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

This project is and will continue to maintain that 90% of the code is written by humans.
