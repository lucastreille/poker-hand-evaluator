import { describe, it, expect } from "vitest";
import { Card } from "../src/card";
import { findBestHandFromSevenCards, buildGameResult } from "../src/hand";

describe("exemples du sujet", () => {
  it("exemple A - suite basse avec As (roue)", () => {
    // Board: A♣ 2♦ 3♥ 4♠ 9♦ | Joueur: 5♣ K♦
    const hand = findBestHandFromSevenCards([
      new Card("A", "C"),
      new Card("2", "D"),
      new Card("3", "H"),
      new Card("4", "S"),
      new Card("9", "D"),
      new Card("5", "C"),
      new Card("K", "D")
    ]);

    expect(hand.category).toBe("straight");
    expect(hand.cards.map(c => c.rank)).toEqual(["5", "4", "3", "2", "A"]);
  });

  it("exemple B - suite haute avec As", () => {
    // Board: T♣ J♦ Q♥ K♠ 2♦ | Joueur: A♣ 3♦
    const hand = findBestHandFromSevenCards([
      new Card("T", "C"),
      new Card("J", "D"),
      new Card("Q", "H"),
      new Card("K", "S"),
      new Card("2", "D"),
      new Card("A", "C"),
      new Card("3", "D")
    ]);

    expect(hand.category).toBe("straight");
    expect(hand.cards.map(c => c.rank)).toEqual(["A", "K", "Q", "J", "T"]);
  });

  it("exemple C - flush avec plus de 5 cartes de même couleur", () => {
    // Board: A♥ J♥ 9♥ 4♥ 2♣ | Joueur: 6♥ K♦
    const hand = findBestHandFromSevenCards([
      new Card("A", "H"),
      new Card("J", "H"),
      new Card("9", "H"),
      new Card("4", "H"),
      new Card("2", "C"),
      new Card("6", "H"),
      new Card("K", "D")
    ]);

    expect(hand.category).toBe("flush");
    expect(hand.cards.map(c => c.rank + c.suit)).toEqual([
      "AH", "JH", "9H", "6H", "4H"
    ]);
  });

  it("exemple D - le board joue, égalité parfaite", () => {
    // Board: 5♣ 6♦ 7♥ 8♠ 9♦ | P1: A♣ A♦ | P2: K♣ Q♦
    const result = buildGameResult([
      {
        playerId: "p1",
        cards: [
          new Card("5", "C"),
          new Card("6", "D"),
          new Card("7", "H"),
          new Card("8", "S"),
          new Card("9", "D"),
          new Card("A", "C"),
          new Card("A", "D")
        ]
      },
      {
        playerId: "p2",
        cards: [
          new Card("5", "C"),
          new Card("6", "D"),
          new Card("7", "H"),
          new Card("8", "S"),
          new Card("9", "D"),
          new Card("K", "C"),
          new Card("Q", "D")
        ]
      }
    ]);

    expect(result).toHaveLength(2);
    expect(result[0].category).toBe("straight");
    expect(result[1].category).toBe("straight");
    expect(result[0].chosen5).toEqual(["9D", "8S", "7H", "6D", "5C"]);
    expect(result[1].chosen5).toEqual(["9D", "8S", "7H", "6D", "5C"]);
  });

  it("exemple E - carré sur le board, le kicker décide", () => {
    // Board: 7♣ 7♦ 7♥ 7♠ 2♦ | P1: A♣ K♣ | P2: Q♣ J♣
    const result = buildGameResult([
      {
        playerId: "p1",
        cards: [
          new Card("7", "C"),
          new Card("7", "D"),
          new Card("7", "H"),
          new Card("7", "S"),
          new Card("2", "D"),
          new Card("A", "C"),
          new Card("K", "C")
        ]
      },
      {
        playerId: "p2",
        cards: [
          new Card("7", "C"),
          new Card("7", "D"),
          new Card("7", "H"),
          new Card("7", "S"),
          new Card("2", "D"),
          new Card("Q", "C"),
          new Card("J", "C")
        ]
      }
    ]);

    expect(result).toHaveLength(1);
    expect(result[0].playerId).toBe("p1");
    expect(result[0].category).toBe("four-of-a-kind");
    expect(result[0].chosen5).toEqual(["7C", "7D", "7H", "7S", "AC"]);
  });
});
