import { describe, it, expect } from "vitest";
import { Card } from "../src/card";
import { evaluateTwoPairsHand } from "../src/hand";

describe("evaluateTwoPairsHand", () => {
  it("détecte deux paires et retourne les cartes dans le bon ordre", () => {
    const cards = [
      new Card("K", "?"),
      new Card("A", "?"),
      new Card("K", "?"),
      new Card("3", "?"),
      new Card("A", "?")
    ];

    const hand = evaluateTwoPairsHand(cards);

    expect(hand.category).toBe("two-pairs");
    expect(hand.cards.map(card => card.rank)).toEqual(["A", "A", "K", "K", "3"]);
  });
});
