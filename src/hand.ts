import { Card, sortCardsByRankDesc, compareCardsByRank } from "./card";

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

export function compareHighCardHands(left: Hand, right: Hand): number {
  for (let index = 0; index < left.cards.length; index++) {
    const comparison = compareCardsByRank(left.cards[index], right.cards[index]);

    if (comparison !== 0) {
      return comparison;
    }
  }

  return 0;
}
