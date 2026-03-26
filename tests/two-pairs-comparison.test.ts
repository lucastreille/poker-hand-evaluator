import { describe, it, expect } from "vitest";
import { Card } from "../src/card";
import { evaluateTwoPairsHand, compareTwoPairsHands } from "../src/hand";

describe("compareTwoPairsHands", () => {
  it("retourne un nombre positif quand la paire la plus haute est supérieure", () => {
    const left = evaluateTwoPairsHand([
      new Card("A", "?"),
      new Card("A", "?"),
      new Card("K", "?"),
      new Card("K", "?"),
      new Card("3", "?")
    ]);

    const right = evaluateTwoPairsHand([
      new Card("K", "?"),
      new Card("K", "?"),
      new Card("Q", "?"),
      new Card("Q", "?"),
      new Card("9", "?")
    ]);

    expect(compareTwoPairsHands(left, right)).toBeGreaterThan(0);
  });
});
