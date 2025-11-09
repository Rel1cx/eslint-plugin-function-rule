import type { RuleVisitor, RuleDefinition } from "@eslint/core"

const id = 0;

export function defineRuleVisitor(ruleVisitor: RuleVisitor) {
    const visitor: RuleVisitor = {}
    for (const key of Object.keys(ruleVisitor)) {
        visitor[key + `[type!=${id}]`] = ruleVisitor[key]
    }
    return visitor
}

export default function functionRule(create: RuleDefinition["create"]) {
    return {
        rules: {
            "function-rule": {
                meta: {
                    fixable: "code",
                    hasSuggestions: true,
                },
                create
            }
        }
    } as const;
}
