import arcjet, { shield, detectBot, tokenBucket } from "@arcjet/node";

export const aj = arcjet({
  key: "ajkey_01jnm7zdy7f3tbneefksv3abt3",

  characteristics: ["ip.src"], // Track requests by IP

  rules: [
    shield({ mode: "LIVE" }),
    // Create a bot detection rule
    detectBot({
      mode: "LIVE", 
      allow: [
        "CATEGORY:SEARCH_ENGINE",
      ],
    }),

    // Create a token bucket rate limit. Other algorithms are supported.

    tokenBucket({
      mode: "LIVE",

      refillRate: 5, // Refill 5 tokens per interval

      interval: 10, // Refill every 10 seconds

      capacity: 10, // Bucket capacity of 10 tokens
    }),
  ],
});

export function isSpoofed(result) {
  return (
    result.state !== "DRY_RUN" &&
    result.reason.isBot() &&
    result.reason.isSpoofed()
  );
}
