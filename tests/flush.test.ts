import { describe, it, expect } from "vitest";
import { Card } from "../src/card";
import { evaluateFlushHand } from "../src/hand";

describe("evaluateFlushHand", () => {
  it("détecte une flush et trie les cartes", () => {
    const hand = evaluateFlushHand([
      new Card("K", "?"),
      new Card("3", "?"),
      new Card("A", "?"),
      new Card("8", "?"),
      new Card("T", "?")
    ]);

    expect(hand.category).toBe("flush");
    expect(hand.cards.map(card => card.rank)).toEqual(["A", "K", "T", "8", "3"]);
  });
});
