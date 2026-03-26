import { describe, it, expect } from "vitest";
import { Card } from "../src/card";
import { evaluateThreeOfAKindHand, compareThreeOfAKindHands } from "../src/hand";

describe("compareThreeOfAKindHands", () => {
  it("compare d'abord la valeur du brelan", () => {
    const left = evaluateThreeOfAKindHand([
      new Card("A", "?"),
      new Card("A", "?"),
      new Card("A", "?"),
      new Card("K", "?"),
      new Card("3", "?")
    ]);

    const right = evaluateThreeOfAKindHand([
      new Card("K", "?"),
      new Card("K", "?"),
      new Card("K", "?"),
      new Card("Q", "?"),
      new Card("9", "?")
    ]);

    expect(compareThreeOfAKindHands(left, right)).toBeGreaterThan(0);
  });

  it("compare les kickers si les brelans sont égaux", () => {
    const left = evaluateThreeOfAKindHand([
      new Card("A", "?"),
      new Card("A", "?"),
      new Card("A", "?"),
      new Card("K", "?"),
      new Card("3", "?")
    ]);

    const right = evaluateThreeOfAKindHand([
      new Card("A", "?"),
      new Card("A", "?"),
      new Card("A", "?"),
      new Card("Q", "?"),
      new Card("9", "?")
    ]);

    expect(compareThreeOfAKindHands(left, right)).toBeGreaterThan(0);
  });

  it("retourne 0 quand les deux mains sont égales", () => {
    const left = evaluateThreeOfAKindHand([
      new Card("A", "?"),
      new Card("A", "?"),
      new Card("A", "?"),
      new Card("K", "?"),
      new Card("3", "?")
    ]);

    const right = evaluateThreeOfAKindHand([
      new Card("A", "?"),
      new Card("A", "?"),
      new Card("A", "?"),
      new Card("K", "?"),
      new Card("3", "?")
    ]);

    expect(compareThreeOfAKindHands(left, right)).toBe(0);
  });
});
