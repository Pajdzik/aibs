import { Config, Effect } from "effect";

const loadConfig = Effect.gen(function* () {
    const openApiKey = yield* Config.redacted("AIBS_OPEN_AI_KEY");

    return {
        apiKey: openApiKey,
    };
});

export { loadConfig };