import { describe, it, expect } from "vitest";
import { Card } from "../src/card";

describe("Card", () => {
  it("crée une carte avec un rank et un suit", () => {
    const card = new Card("A", "?");

    expect(card.rank).toBe("A");
    expect(card.suit).toBe("?");
  });
});
