import { describe, it, expect } from "vitest";
import { Card } from "../src/card";
import { evaluateFullHouseHand, compareFullHouseHands } from "../src/hand";

describe("compareFullHouseHands", () => {
  it("compare d'abord le brelan", () => {
    const left = evaluateFullHouseHand([
      new Card("A", "?"),
      new Card("A", "?"),
      new Card("A", "?"),
      new Card("K", "?"),
      new Card("K", "?")
    ]);

    const right = evaluateFullHouseHand([
      new Card("K", "?"),
      new Card("K", "?"),
      new Card("K", "?"),
      new Card("Q", "?"),
      new Card("Q", "?")
    ]);

    expect(compareFullHouseHands(left, right)).toBeGreaterThan(0);
  });

  it("compare la paire si le brelan est égal", () => {
    const left = evaluateFullHouseHand([
      new Card("A", "?"),
      new Card("A", "?"),
      new Card("A", "?"),
      new Card("K", "?"),
      new Card("K", "?")
    ]);

    const right = evaluateFullHouseHand([
      new Card("A", "?"),
      new Card("A", "?"),
      new Card("A", "?"),
      new Card("Q", "?"),
      new Card("Q", "?")
    ]);

    expect(compareFullHouseHands(left, right)).toBeGreaterThan(0);
  });

  it("retourne 0 si les deux full house sont égaux", () => {
    const left = evaluateFullHouseHand([
      new Card("A", "?"),
      new Card("A", "?"),
      new Card("A", "?"),
      new Card("K", "?"),
      new Card("K", "?")
    ]);

    const right = evaluateFullHouseHand([
      new Card("A", "?"),
      new Card("A", "?"),
      new Card("A", "?"),
      new Card("K", "?"),
      new Card("K", "?")
    ]);

    expect(compareFullHouseHands(left, right)).toBe(0);
  });
});
