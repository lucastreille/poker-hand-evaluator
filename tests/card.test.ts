import { describe, it, expect } from "vitest";
import { Card } from "../src/card";

describe("Card", () => {
  it("crée une carte valide avec rank et suit typés", () => {
    const card = new Card("K", "?");

    expect(card.rank).toBe("K");
    expect(card.suit).toBe("?");
  });
});
