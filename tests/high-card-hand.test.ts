import { describe, it, expect } from "vitest";
import { Card } from "../src/card";
import { evaluateHighCardHand } from "../src/hand";

describe("evaluateHighCardHand", () => {
  it("value une main high card en triant les cartes par ordre décroissant", () => {
    const cards = [
      new Card("4", "?"),
      new Card("A", "?"),
      new Card("T", "?"),
      new Card("7", "?"),
      new Card("2", "?")
    ];

    const hand = evaluateHighCardHand(cards);

    expect(hand.category).toBe("high-card");
    expect(hand.cards.map(card => card.rank)).toEqual(["A", "T", "7", "4", "2"]);
  });
});
