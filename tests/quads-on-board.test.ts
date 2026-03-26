import { describe, it, expect } from "vitest";
import { Card } from "../src/card";
import { buildGameResult } from "../src/hand";

describe("quads on board", () => {
  it("départage les joueurs avec le kicker quand le carré est sur le board", () => {
    const result = buildGameResult([
      {
        playerId: "p1",
        cards: [
          new Card("Q", "H"),
          new Card("3", "C"),
          new Card("A", "S"),
          new Card("A", "H"),
          new Card("A", "D"),
          new Card("A", "C"),
          new Card("2", "S")
        ]
      },
      {
        playerId: "p2",
        cards: [
          new Card("J", "H"),
          new Card("4", "C"),
          new Card("A", "S"),
          new Card("A", "H"),
          new Card("A", "D"),
          new Card("A", "C"),
          new Card("2", "S")
        ]
      }
    ]);

    expect(result).toEqual([
      {
        playerId: "p1",
        category: "four-of-a-kind",
        chosen5: ["AS", "AH", "AD", "AC", "QH"]
      }
    ]);
  });
});
