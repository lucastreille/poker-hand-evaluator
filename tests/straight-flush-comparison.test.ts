import { describe, it, expect } from "vitest";
import { Card } from "../src/card";
import { evaluateStraightFlushHand, compareStraightFlushHands } from "../src/hand";

describe("compareStraightFlushHands", () => {
  it("compare la carte la plus haute", () => {
    const left = evaluateStraightFlushHand([
      new Card("A", "?"),
      new Card("K", "?"),
      new Card("Q", "?"),
      new Card("J", "?"),
      new Card("T", "?")
    ]);

    const right = evaluateStraightFlushHand([
      new Card("K", "?"),
      new Card("Q", "?"),
      new Card("J", "?"),
      new Card("T", "?"),
      new Card("9", "?")
    ]);

    expect(compareStraightFlushHands(left, right)).toBeGreaterThan(0);
  });

  it("retourne 0 si elles sont égales", () => {
    const left = evaluateStraightFlushHand([
      new Card("A", "?"),
      new Card("K", "?"),
      new Card("Q", "?"),
      new Card("J", "?"),
      new Card("T", "?")
    ]);

    const right = evaluateStraightFlushHand([
      new Card("A", "?"),
      new Card("K", "?"),
      new Card("Q", "?"),
      new Card("J", "?"),
      new Card("T", "?")
    ]);

    expect(compareStraightFlushHands(left, right)).toBe(0);
  });
});
