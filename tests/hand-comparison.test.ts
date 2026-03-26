import { describe, it, expect } from "vitest";
import { Card } from "../src/card";
import {
  evaluateOnePairHand,
  evaluateStraightHand,
  evaluateFlushHand,
  compareHands
} from "../src/hand";

describe("compareHands", () => {
  it("considère une suite plus forte qu'une paire", () => {
    const onePair = evaluateOnePairHand([
      new Card("A", "?"),
      new Card("A", "?"),
      new Card("K", "?"),
      new Card("T", "?"),
      new Card("3", "?")
    ]);

    const straight = evaluateStraightHand([
      new Card("A", "?"),
      new Card("K", "?"),
      new Card("Q", "?"),
      new Card("J", "?"),
      new Card("T", "?")
    ]);

    expect(compareHands(straight, onePair)).toBeGreaterThan(0);
  });

  it("considère une flush plus forte qu'une suite", () => {
    const straight = evaluateStraightHand([
      new Card("A", "?"),
      new Card("K", "?"),
      new Card("Q", "?"),
      new Card("J", "?"),
      new Card("T", "?")
    ]);

    const flush = evaluateFlushHand([
      new Card("A", "?"),
      new Card("K", "?"),
      new Card("T", "?"),
      new Card("8", "?"),
      new Card("3", "?")
    ]);

    expect(compareHands(flush, straight)).toBeGreaterThan(0);
  });
});
