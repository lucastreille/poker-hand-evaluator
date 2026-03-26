import { describe, it, expect } from "vitest";
import { Card } from "../src/card";
import { buildGameResult } from "../src/hand";

describe("buildGameResult", () => {
  it("retourne les gagnants avec leur catégorie et leurs 5 cartes choisies", () => {
    const result = buildGameResult([
      {
        playerId: "p1",
        cards: [
          new Card("A", "S"),
          new Card("K", "S"),
          new Card("Q", "S"),
          new Card("J", "S"),
          new Card("T", "S"),
          new Card("2", "H"),
          new Card("3", "D")
        ]
      },
      {
        playerId: "p2",
        cards: [
          new Card("A", "S"),
          new Card("A", "H"),
          new Card("K", "C"),
          new Card("J", "D"),
          new Card("8", "C"),
          new Card("4", "D"),
          new Card("2", "H")
        ]
      }
    ]);

    expect(result).toEqual([
      {
        playerId: "p1",
        category: "straight-flush",
        chosen5: ["AS", "KS", "QS", "JS", "TS"]
      }
    ]);
  });

  it("retourne plusieurs gagnants en cas d'égalité", () => {
    const result = buildGameResult([
      {
        playerId: "p1",
        cards: [
          new Card("A", "S"),
          new Card("A", "H"),
          new Card("K", "C"),
          new Card("J", "D"),
          new Card("8", "C"),
          new Card("4", "D"),
          new Card("2", "H")
        ]
      },
      {
        playerId: "p2",
        cards: [
          new Card("A", "D"),
          new Card("A", "C"),
          new Card("K", "S"),
          new Card("J", "H"),
          new Card("8", "D"),
          new Card("4", "S"),
          new Card("2", "C")
        ]
      }
    ]);

    expect(result).toEqual([
      {
        playerId: "p1",
        category: "one-pair",
        chosen5: ["AS", "AH", "KC", "JD", "8C"]
      },
      {
        playerId: "p2",
        category: "one-pair",
        chosen5: ["AD", "AC", "KS", "JH", "8D"]
      }
    ]);
  });
});
