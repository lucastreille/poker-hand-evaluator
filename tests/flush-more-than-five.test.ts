import { describe, it, expect } from "vitest";
import { Card } from "../src/card";
import { findBestHandFromSevenCards } from "../src/hand";

describe("flush avec plus de 5 cartes", () => {
  it("garde les 5 meilleures cartes de la flush", () => {
    const hand = findBestHandFromSevenCards([
      new Card("A", "S"),
      new Card("K", "S"),
      new Card("Q", "S"),
      new Card("J", "S"),
      new Card("9", "S"),
      new Card("8", "S"),
      new Card("2", "S")
    ]);

    expect(hand.category).toBe("flush");
    expect(hand.cards.map(c => c.rank)).toEqual(["A", "K", "Q", "J", "9"]);
  });
});
