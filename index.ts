import type { RuleDefinition } from "@eslint/core"

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
