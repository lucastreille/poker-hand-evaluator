import { describe, it, expect } from "vitest";
import { Card } from "../src/card";
import { evaluateHand } from "../src/hand";

describe("evaluateHand", () => {
  it("retourne straight-flush si la main correspond", () => {
    const hand = evaluateHand([
      new Card("A", "S"),
      new Card("K", "S"),
      new Card("Q", "S"),
      new Card("J", "S"),
      new Card("T", "S")
    ]);

    expect(hand.category).toBe("straight-flush");
  });

  it("retourne full-house si la main correspond", () => {
    const hand = evaluateHand([
      new Card("A", "S"),
      new Card("A", "H"),
      new Card("A", "C"),
      new Card("K", "D"),
      new Card("K", "C")
    ]);

    expect(hand.category).toBe("full-house");
  });

  it("retourne high-card si aucune autre catégorie ne correspond", () => {
    const hand = evaluateHand([
      new Card("A", "S"),
      new Card("J", "H"),
      new Card("8", "C"),
      new Card("4", "D"),
      new Card("2", "H")
    ]);

    expect(hand.category).toBe("high-card");
  });
});
