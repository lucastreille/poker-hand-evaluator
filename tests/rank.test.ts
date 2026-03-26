import { describe, it, expect } from "vitest";
import { getRankValue } from "../src/rank";

describe("getRankValue", () => {
  it("retourne une valeur numérique pour un rank", () => {
    expect(getRankValue("2")).toBe(2);
    expect(getRankValue("T")).toBe(10);
    expect(getRankValue("A")).toBe(14);
  });
});
