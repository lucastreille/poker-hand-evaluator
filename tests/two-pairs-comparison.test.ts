import { describe, it, expect } from "vitest";
import { Card } from "../src/card";
import { evaluateTwoPairsHand, compareTwoPairsHands } from "../src/hand";

describe("compareTwoPairsHands", () => {
  it("retourne 0 si egalite parfaite", () => {
    const left = evaluateTwoPairsHand([
      new Card("A", "?"),
      new Card("A", "?"),
      new Card("K", "?"),
      new Card("K", "?"),
      new Card("3", "?")
    ]);

    const right = evaluateTwoPairsHand([
      new Card("A", "?"),
      new Card("A", "?"),
      new Card("K", "?"),
      new Card("K", "?"),
      new Card("3", "?")
    ]);

    expect(compareTwoPairsHands(left, right)).toBe(0);
  });

  it("la paire haute decide", () => {
    const left = evaluateTwoPairsHand([
      new Card("A", "?"),
      new Card("A", "?"),
      new Card("3", "?"),
      new Card("3", "?"),
      new Card("2", "?")
    ]);

    const right = evaluateTwoPairsHand([
      new Card("K", "?"),
      new Card("K", "?"),
      new Card("Q", "?"),
      new Card("Q", "?"),
      new Card("J", "?")
    ]);

    expect(compareTwoPairsHands(left, right)).toBeGreaterThan(0);
  });

  it("la paire basse decide si la paire haute est egale", () => {
    const left = evaluateTwoPairsHand([
      new Card("A", "?"),
      new Card("A", "?"),
      new Card("K", "?"),
      new Card("K", "?"),
      new Card("2", "?")
    ]);

    const right = evaluateTwoPairsHand([
      new Card("A", "?"),
      new Card("A", "?"),
      new Card("Q", "?"),
      new Card("Q", "?"),
      new Card("J", "?")
    ]);

    expect(compareTwoPairsHands(left, right)).toBeGreaterThan(0);
  });

  it("le kicker decide si les deux paires sont egales", () => {
    const left = evaluateTwoPairsHand([
      new Card("A", "?"),
      new Card("A", "?"),
      new Card("K", "?"),
      new Card("K", "?"),
      new Card("Q", "?")
    ]);

    const right = evaluateTwoPairsHand([
      new Card("A", "?"),
      new Card("A", "?"),
      new Card("K", "?"),
      new Card("K", "?"),
      new Card("J", "?")
    ]);

    expect(compareTwoPairsHands(left, right)).toBeGreaterThan(0);
  });
});
