import { Card, sortCardsByRankDesc, compareCardsByRank } from "./card";

export type HandCategory = "high-card" | "one-pair";

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

export function evaluateOnePairHand(cards: Card[]): Hand {
  const sorted = sortCardsByRankDesc(cards);

  const groups: Record<string, Card[]> = {};

  for (const card of sorted) {
    if (!groups[card.rank]) {
      groups[card.rank] = [];
    }

    groups[card.rank].push(card);
  }

  const pair = Object.values(groups).find(group => group.length === 2);

  if (!pair) {
    throw new Error("no pair found");
  }

  const kickers = Object.values(groups)
    .filter(group => group.length === 1)
    .flat();

  const sortedKickers = sortCardsByRankDesc(kickers);

  return {
    category: "one-pair",
    cards: [...pair, ...sortedKickers]
  };
}
