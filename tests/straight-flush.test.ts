import { describe, it, expect } from "vitest";
import { Card } from "../src/card";
import { evaluateStraightFlushHand } from "../src/hand";

describe("evaluateStraightFlushHand", () => {
  it("détecte une straight flush", () => {
    const hand = evaluateStraightFlushHand([
      new Card("A", "?"),
      new Card("K", "?"),
      new Card("Q", "?"),
      new Card("J", "?"),
      new Card("T", "?")
    ]);

    expect(hand.category).toBe("straight-flush");
    expect(hand.cards.map(card => card.rank)).toEqual(["A", "K", "Q", "J", "T"]);
  });
});
