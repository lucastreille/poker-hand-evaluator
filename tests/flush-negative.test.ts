import { describe, it, expect } from "vitest";
import { Card } from "../src/card";
import { evaluateFlushHand } from "../src/hand";

describe("evaluateFlushHand", () => {
  it("lève une erreur si les couleurs sont différentes", () => {
    expect(() =>
      evaluateFlushHand([
        new Card("A", "S"),
        new Card("J", "H"),
        new Card("8", "C"),
        new Card("4", "D"),
        new Card("2", "H")
      ])
    ).toThrow("flush not found");
  });
});
