import { describe, it, expect } from "vitest";
import { Card } from "../src/card";
import { evaluateOnePairHand } from "../src/hand";

describe("evaluateOnePairHand", () => {
  it("détecte une paire et retourne les cartes correctement ordonnées", () => {
    const cards = [
      new Card("A", "?"),
      new Card("A", "?"),
      new Card("K", "?"),
      new Card("T", "?"),
      new Card("3", "?")
    ];

    const hand = evaluateOnePairHand(cards);

    expect(hand.category).toBe("one-pair");
    expect(hand.cards.map(c => c.rank)).toEqual(["A", "A", "K", "T", "3"]);
  });
});
