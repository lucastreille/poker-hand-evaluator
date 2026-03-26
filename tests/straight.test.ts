import { describe, it, expect } from "vitest";
import { Card } from "../src/card";
import { evaluateStraightHand } from "../src/hand";

describe("evaluateStraightHand", () => {
  it("détecte une suite et retourne les cartes dans l'ordre décroissant", () => {
    const cards = [
      new Card("Q", "?"),
      new Card("A", "?"),
      new Card("K", "?"),
      new Card("J", "?"),
      new Card("T", "?")
    ];

    const hand = evaluateStraightHand(cards);

    expect(hand.category).toBe("straight");
    expect(hand.cards.map(card => card.rank)).toEqual(["A", "K", "Q", "J", "T"]);
  });
});
