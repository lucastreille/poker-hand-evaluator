import { describe, it, expect } from "vitest";
import { Card } from "../src/card";
import { evaluateTwoPairsHand, compareTwoPairsHands } from "../src/hand";

describe("compareTwoPairsHands", () => {
  it("compare la paire haute", () => {
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

  it("compare la deuxième paire si la première est égale", () => {
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
      new Card("Q", "?"),
      new Card("Q", "?"),
      new Card("9", "?")
    ]);

    expect(compareTwoPairsHands(left, right)).toBeGreaterThan(0);
  });
});
