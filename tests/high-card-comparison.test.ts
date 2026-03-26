import { describe, it, expect } from "vitest";
import { Card } from "../src/card";
import { evaluateHighCardHand, compareHighCardHands } from "../src/hand";

describe("compareHighCardHands", () => {
  it("retourne un nombre positif quand la première main est plus forte", () => {
    const left = evaluateHighCardHand([
      new Card("A", "?"),
      new Card("T", "?"),
      new Card("7", "?"),
      new Card("4", "?"),
      new Card("2", "?")
    ]);

    const right = evaluateHighCardHand([
      new Card("K", "?"),
      new Card("Q", "?"),
      new Card("J", "?"),
      new Card("9", "?"),
      new Card("3", "?")
    ]);

    expect(compareHighCardHands(left, right)).toBeGreaterThan(0);
  });

  it("retourne un nombre négatif quand la deuxième main est plus forte", () => {
    const left = evaluateHighCardHand([
      new Card("K", "?"),
      new Card("Q", "?"),
      new Card("J", "?"),
      new Card("9", "?"),
      new Card("3", "?")
    ]);

    const right = evaluateHighCardHand([
      new Card("A", "?"),
      new Card("T", "?"),
      new Card("7", "?"),
      new Card("4", "?"),
      new Card("2", "?")
    ]);

    expect(compareHighCardHands(left, right)).toBeLessThan(0);
  });

  it("retourne 0 quand les deux mains sont égales", () => {
    const left = evaluateHighCardHand([
      new Card("A", "?"),
      new Card("T", "?"),
      new Card("7", "?"),
      new Card("4", "?"),
      new Card("2", "?")
    ]);

    const right = evaluateHighCardHand([
      new Card("A", "?"),
      new Card("T", "?"),
      new Card("7", "?"),
      new Card("4", "?"),
      new Card("2", "?")
    ]);

    expect(compareHighCardHands(left, right)).toBe(0);
  });
});
