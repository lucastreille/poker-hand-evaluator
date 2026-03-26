import { describe, it, expect } from "vitest";
import { Card } from "../src/card";
import { evaluateFourOfAKindHand, compareFourOfAKindHands } from "../src/hand";

describe("compareFourOfAKindHands", () => {
  it("compare d'abord le carré", () => {
    const left = evaluateFourOfAKindHand([
      new Card("A", "?"),
      new Card("A", "?"),
      new Card("A", "?"),
      new Card("A", "?"),
      new Card("K", "?")
    ]);

    const right = evaluateFourOfAKindHand([
      new Card("K", "?"),
      new Card("K", "?"),
      new Card("K", "?"),
      new Card("K", "?"),
      new Card("Q", "?")
    ]);

    expect(compareFourOfAKindHands(left, right)).toBeGreaterThan(0);
  });

  it("compare le kicker si le carré est égal", () => {
    const left = evaluateFourOfAKindHand([
      new Card("A", "?"),
      new Card("A", "?"),
      new Card("A", "?"),
      new Card("A", "?"),
      new Card("K", "?")
    ]);

    const right = evaluateFourOfAKindHand([
      new Card("A", "?"),
      new Card("A", "?"),
      new Card("A", "?"),
      new Card("A", "?"),
      new Card("Q", "?")
    ]);

    expect(compareFourOfAKindHands(left, right)).toBeGreaterThan(0);
  });

  it("retourne 0 si les deux carrés sont égaux", () => {
    const left = evaluateFourOfAKindHand([
      new Card("A", "?"),
      new Card("A", "?"),
      new Card("A", "?"),
      new Card("A", "?"),
      new Card("K", "?")
    ]);

    const right = evaluateFourOfAKindHand([
      new Card("A", "?"),
      new Card("A", "?"),
      new Card("A", "?"),
      new Card("A", "?"),
      new Card("K", "?")
    ]);

    expect(compareFourOfAKindHands(left, right)).toBe(0);
  });
});
