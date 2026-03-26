import { describe, it, expect } from "vitest";
import { Card } from "../src/card";
import { findWinners } from "../src/hand";

describe("findWinners", () => {
  it("retourne le joueur gagnant", () => {
    const winners = findWinners([
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

    expect(winners.map(winner => winner.playerId)).toEqual(["p1"]);
    expect(winners[0].hand.category).toBe("straight-flush");
  });

  it("retourne plusieurs gagnants en cas d'égalité", () => {
    const winners = findWinners([
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

    expect(winners.map(winner => winner.playerId)).toEqual(["p1", "p2"]);
    expect(winners[0].hand.category).toBe("one-pair");
    expect(winners[1].hand.category).toBe("one-pair");
  });
});
