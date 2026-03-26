import { describe, it, expect } from "vitest";
import { Card } from "../src/card";
import { evaluateFourOfAKindHand } from "../src/hand";

describe("evaluateFourOfAKindHand", () => {
  it("détecte un carré et retourne les cartes dans le bon ordre", () => {
    const hand = evaluateFourOfAKindHand([
      new Card("A", "?"),
      new Card("A", "?"),
      new Card("A", "?"),
      new Card("A", "?"),
      new Card("K", "?")
    ]);

    expect(hand.category).toBe("four-of-a-kind");
    expect(hand.cards.map(card => card.rank)).toEqual(["A", "A", "A", "A", "K"]);
  });
});
