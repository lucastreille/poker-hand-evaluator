import { describe, it, expect } from "vitest";
import { Card } from "../src/card";
import { evaluateStraightHand } from "../src/hand";

describe("evaluateStraightHand - pas de wrap-around", () => {
  it("refuse Q-K-A-2-3 comme une suite valide", () => {
    expect(() =>
      evaluateStraightHand([
        new Card("Q", "?"),
        new Card("K", "?"),
        new Card("A", "?"),
        new Card("2", "?"),
        new Card("3", "?")
      ])
    ).toThrow();
  });
});
