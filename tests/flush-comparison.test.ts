import { describe, it, expect } from "vitest";
import { Card } from "../src/card";
import { evaluateFlushHand, compareFlushHands } from "../src/hand";

describe("compareFlushHands", () => {
  it("compare les flush carte par carte", () => {
    const left = evaluateFlushHand([
      new Card("A", "?"),
      new Card("K", "?"),
      new Card("T", "?"),
      new Card("8", "?"),
      new Card("3", "?")
    ]);

    const right = evaluateFlushHand([
      new Card("A", "?"),
      new Card("Q", "?"),
      new Card("T", "?"),
      new Card("8", "?"),
      new Card("3", "?")
    ]);

    expect(compareFlushHands(left, right)).toBeGreaterThan(0);
  });

  it("retourne 0 si les flush sont égales", () => {
    const left = evaluateFlushHand([
      new Card("A", "?"),
      new Card("K", "?"),
      new Card("T", "?"),
      new Card("8", "?"),
      new Card("3", "?")
    ]);

    const right = evaluateFlushHand([
      new Card("A", "?"),
      new Card("K", "?"),
      new Card("T", "?"),
      new Card("8", "?"),
      new Card("3", "?")
    ]);

    expect(compareFlushHands(left, right)).toBe(0);
  });
});
