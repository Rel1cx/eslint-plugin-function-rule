import type { Rule } from "eslint";

const id = 0;

export function defineRuleListener(ruleListener: Rule.RuleListener) {
    const listener: Rule.RuleListener = {}
    for (const key of Object.keys(ruleListener)) {
        listener[key + `[type!=${id}]`] = ruleListener[key]
    }
    return listener
}

export function functionRule(name: string, create: Rule.RuleModule["create"]) {
    return {
        rules: {
            [name]: {
                meta: {
                    fixable: "code",
                    hasSuggestions: true,
                },
                create
            }
        }
    } as const;
}
