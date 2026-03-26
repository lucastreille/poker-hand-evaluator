import { Card, sortCardsByRankDesc } from "./card";

export type HandCategory = "high-card";

export type Hand = {
  category: HandCategory;
  cards: Card[];
};

export function evaluateHighCardHand(cards: Card[]): Hand {
  return {
    category: "high-card",
    cards: sortCardsByRankDesc(cards)
  };
}
