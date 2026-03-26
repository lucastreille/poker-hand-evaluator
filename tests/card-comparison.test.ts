import { describe, it, expect } from "vitest";
import { Card } from "../src/card";
import { compareCardsByRank } from "../src/card";

describe("compareCardsByRank", () => {
  it("compare deux cartes selon leur rank", () => {
    const ace = new Card("A", "?");
    const king = new Card("K", "?");
    const otherKing = new Card("K", "?");

    expect(compareCardsByRank(ace, king)).toBeGreaterThan(0);
    expect(compareCardsByRank(king, ace)).toBeLessThan(0);
    expect(compareCardsByRank(king, otherKing)).toBe(0);
  });
});
