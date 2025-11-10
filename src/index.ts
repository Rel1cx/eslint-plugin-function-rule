import type { Plugin } from "@eslint/core";
import type { Rule } from "eslint";

export function functionRule(create: Rule.RuleModule["create"]): Plugin {
  return {
    rules: {
      "function-rule": {
        meta: {
          fixable: "code",
          hasSuggestions: true,
        },
        create,
      },
    },
  } as const;
}

let id = 1;

export function defineRuleListener(ruleListener: Rule.RuleListener): Rule.RuleListener {
  const listener: Rule.RuleListener = {};
  for (const key of Object.keys(ruleListener)) {
    listener[" ".repeat(id++) + key] = ruleListener[key];
  }
  return listener;
}
