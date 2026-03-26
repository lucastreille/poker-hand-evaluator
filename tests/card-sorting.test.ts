import { describe, it, expect } from "vitest";
import { Card, sortCardsByRankDesc } from "../src/card";

describe("sortCardsByRankDesc", () => {
  it("trie les cartes du rang le plus fort au plus faible", () => {
    const cards = [
      new Card("4", "?"),
      new Card("A", "?"),
      new Card("T", "?"),
      new Card("7", "?")
    ];

    const sorted = sortCardsByRankDesc(cards);

    expect(sorted.map(card => card.rank)).toEqual(["A", "T", "7", "4"]);
  });
});
