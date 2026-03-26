import { describe, it, expect } from "vitest";
import { Card } from "../src/card";
import { evaluateThreeOfAKindHand } from "../src/hand";

describe("evaluateThreeOfAKindHand", () => {
  it("détecte un brelan et retourne les cartes dans le bon ordre", () => {
    const cards = [
      new Card("A", "?"),
      new Card("K", "?"),
      new Card("A", "?"),
      new Card("3", "?"),
      new Card("A", "?")
    ];

    const hand = evaluateThreeOfAKindHand(cards);

    expect(hand.category).toBe("three-of-a-kind");
    expect(hand.cards.map(card => card.rank)).toEqual(["A", "A", "A", "K", "3"]);
  });
});
