import type { Rule } from "eslint";

export function defineRule(name: string, create: Rule.RuleModule["create"]) {
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

const id = 0;

export function defineRuleListener(ruleListener: Rule.RuleListener) {
    const listener: Rule.RuleListener = {}
    for (const key of Object.keys(ruleListener)) {
        listener[key + `[type!=${id}]`] = ruleListener[key]
    }
    return listener
}
