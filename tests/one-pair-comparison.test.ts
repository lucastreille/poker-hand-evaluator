import { describe, it, expect } from "vitest";
import { Card } from "../src/card";
import { evaluateOnePairHand, compareOnePairHands } from "../src/hand";

describe("compareOnePairHands", () => {
  it("retourne un nombre positif quand la première paire est plus forte", () => {
    const left = evaluateOnePairHand([
      new Card("A", "?"),
      new Card("A", "?"),
      new Card("K", "?"),
      new Card("T", "?"),
      new Card("3", "?")
    ]);

    const right = evaluateOnePairHand([
      new Card("K", "?"),
      new Card("K", "?"),
      new Card("Q", "?"),
      new Card("J", "?"),
      new Card("9", "?")
    ]);

    expect(compareOnePairHands(left, right)).toBeGreaterThan(0);
  });

  it("compare les kickers si les paires sont égales", () => {
    const left = evaluateOnePairHand([
      new Card("A", "?"),
      new Card("A", "?"),
      new Card("K", "?"),
      new Card("T", "?"),
      new Card("3", "?")
    ]);

    const right = evaluateOnePairHand([
      new Card("A", "?"),
      new Card("A", "?"),
      new Card("Q", "?"),
      new Card("J", "?"),
      new Card("9", "?")
    ]);

    expect(compareOnePairHands(left, right)).toBeGreaterThan(0);
  });

  it("retourne 0 quand les deux mains sont égales", () => {
    const left = evaluateOnePairHand([
      new Card("A", "?"),
      new Card("A", "?"),
      new Card("K", "?"),
      new Card("T", "?"),
      new Card("3", "?")
    ]);

    const right = evaluateOnePairHand([
      new Card("A", "?"),
      new Card("A", "?"),
      new Card("K", "?"),
      new Card("T", "?"),
      new Card("3", "?")
    ]);

    expect(compareOnePairHands(left, right)).toBe(0);
  });
});
