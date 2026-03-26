import { describe, it, expect } from "vitest";
import { Card } from "../src/card";
import { findBestHandFromSevenCards } from "../src/hand";

describe("findBestHandFromSevenCards", () => {
  it("retourne la meilleure main possible parmi 7 cartes", () => {
    const hand = findBestHandFromSevenCards([
      new Card("A", "S"),
      new Card("K", "S"),
      new Card("Q", "S"),
      new Card("J", "S"),
      new Card("T", "S"),
      new Card("2", "H"),
      new Card("3", "D")
    ]);

    expect(hand.category).toBe("straight-flush");
    expect(hand.cards.map(card => card.rank)).toEqual(["A", "K", "Q", "J", "T"]);
  });

  it("choisit une paire plutôt qu'une high-card", () => {
    const hand = findBestHandFromSevenCards([
      new Card("A", "S"),
      new Card("A", "H"),
      new Card("K", "C"),
      new Card("J", "D"),
      new Card("8", "C"),
      new Card("4", "D"),
      new Card("2", "H")
    ]);

    expect(hand.category).toBe("one-pair");
    expect(hand.cards.map(card => card.rank)).toEqual(["A", "A", "K", "J", "8"]);
  });
});
