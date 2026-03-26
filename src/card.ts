import { Rank } from "./rank";
import { Suit } from "./suit";
import { getRankValue } from "./rank";

export class Card {
  constructor(
    public rank: Rank,
    public suit: Suit
  ) {}
}

export function compareCardsByRank(left: Card, right: Card): number {
  return getRankValue(left.rank) - getRankValue(right.rank);
}
