import { describe, it, expect } from "vitest";
import { Card } from "../src/card";
import { evaluateTwoPairsHand, compareTwoPairsHands } from "../src/hand";

describe("compareTwoPairsHands", () => {
  it("retourne 0 si égalité parfaite", () => {
    const left = evaluateTwoPairsHand([
      new Card("A", "?"),
      new Card("A", "?"),
      new Card("K", "?"),
      new Card("K", "?"),
      new Card("3", "?")
    ]);

    const right = evaluateTwoPairsHand([
      new Card("A", "?"),
      new Card("A", "?"),
      new Card("K", "?"),
      new Card("K", "?"),
      new Card("3", "?")
    ]);

    expect(compareTwoPairsHands(left, right)).toBe(0);
  });
});
