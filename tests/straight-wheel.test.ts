import { describe, it, expect } from "vitest";
import { Card } from "../src/card";
import { evaluateStraightHand, compareStraightHands } from "../src/hand";

describe("evaluateStraightHand - roue", () => {
  it("détecte la suite basse A-2-3-4-5", () => {
    const hand = evaluateStraightHand([
      new Card("A", "?"),
      new Card("5", "?"),
      new Card("4", "?"),
      new Card("3", "?"),
      new Card("2", "?")
    ]);

    expect(hand.category).toBe("straight");
    expect(hand.cards.map(card => card.rank)).toEqual(["5", "4", "3", "2", "A"]);
  });

  it("considère la roue plus faible qu'une suite au 6", () => {
    const wheel = evaluateStraightHand([
      new Card("A", "?"),
      new Card("5", "?"),
      new Card("4", "?"),
      new Card("3", "?"),
      new Card("2", "?")
    ]);

    const sixHigh = evaluateStraightHand([
      new Card("6", "?"),
      new Card("5", "?"),
      new Card("4", "?"),
      new Card("3", "?"),
      new Card("2", "?")
    ]);

    expect(compareStraightHands(wheel, sixHigh)).toBeLessThan(0);
  });
});
