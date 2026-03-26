import { describe, it, expect } from "vitest";
import { Card } from "../src/card";
import { buildGameResult } from "../src/hand";

describe("board plays", () => {
  it("retourne la même meilleure main pour plusieurs joueurs si le board joue", () => {
    const result = buildGameResult([
      {
        playerId: "p1",
        cards: [
          new Card("2", "H"),
          new Card("3", "C"),
          new Card("K", "S"),
          new Card("K", "H"),
          new Card("Q", "D"),
          new Card("Q", "C"),
          new Card("J", "S")
        ]
      },
      {
        playerId: "p2",
        cards: [
          new Card("4", "H"),
          new Card("5", "C"),
          new Card("K", "S"),
          new Card("K", "H"),
          new Card("Q", "D"),
          new Card("Q", "C"),
          new Card("J", "S")
        ]
      }
    ]);

    expect(result).toEqual([
      {
        playerId: "p1",
        category: "two-pairs",
        chosen5: ["KS", "KH", "QD", "QC", "JS"]
      },
      {
        playerId: "p2",
        category: "two-pairs",
        chosen5: ["KS", "KH", "QD", "QC", "JS"]
      }
    ]);
  });
});
