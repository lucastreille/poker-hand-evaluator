import { describe, it, expect } from "vitest";
import { Card } from "../src/card";
import { evaluateFullHouseHand } from "../src/hand";

describe("evaluateFullHouseHand", () => {
  it("détecte un full house et retourne les cartes dans le bon ordre", () => {
    const hand = evaluateFullHouseHand([
      new Card("A", "?"),
      new Card("A", "?"),
      new Card("A", "?"),
      new Card("K", "?"),
      new Card("K", "?")
    ]);

    expect(hand.category).toBe("full-house");
    expect(hand.cards.map(card => card.rank)).toEqual(["A", "A", "A", "K", "K"]);
  });
});
