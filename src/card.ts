import { Rank, getRankValue } from "./rank";
import { Suit } from "./suit";

export class Card {
  constructor(
    public rank: Rank,
    public suit: Suit
  ) {}
}

export function compareCardsByRank(left: Card, right: Card): number {
  return getRankValue(left.rank) - getRankValue(right.rank);
}

export function sortCardsByRankDesc(cards: Card[]): Card[] {
  return [...cards].sort((left, right) => compareCardsByRank(right, left));
}
