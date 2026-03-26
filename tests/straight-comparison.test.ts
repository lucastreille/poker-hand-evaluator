import { describe, it, expect } from "vitest";
import { Card } from "../src/card";
import { evaluateStraightHand, compareStraightHands } from "../src/hand";

describe("compareStraightHands", () => {
  it("compare la carte la plus haute de la suite", () => {
    const left = evaluateStraightHand([
      new Card("A", "?"),
      new Card("K", "?"),
      new Card("Q", "?"),
      new Card("J", "?"),
      new Card("T", "?")
    ]);

    const right = evaluateStraightHand([
      new Card("K", "?"),
      new Card("Q", "?"),
      new Card("J", "?"),
      new Card("T", "?"),
      new Card("9", "?")
    ]);

    expect(compareStraightHands(left, right)).toBeGreaterThan(0);
  });

  it("retourne 0 quand les deux suites sont égales", () => {
    const left = evaluateStraightHand([
      new Card("A", "?"),
      new Card("K", "?"),
      new Card("Q", "?"),
      new Card("J", "?"),
      new Card("T", "?")
    ]);

    const right = evaluateStraightHand([
      new Card("A", "?"),
      new Card("K", "?"),
      new Card("Q", "?"),
      new Card("J", "?"),
      new Card("T", "?")
    ]);

    expect(compareStraightHands(left, right)).toBe(0);
  });
});
