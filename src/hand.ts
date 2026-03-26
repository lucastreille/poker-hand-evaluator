import { Card, sortCardsByRankDesc, compareCardsByRank } from "./card";

export type HandCategory = "high-card" | "one-pair" | "two-pairs";

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

export function compareOnePairHands(left: Hand, right: Hand): number {
  const pairComparison = compareCardsByRank(left.cards[0], right.cards[0]);

  if (pairComparison !== 0) {
    return pairComparison;
  }

  for (let index = 2; index < left.cards.length; index++) {
    const comparison = compareCardsByRank(left.cards[index], right.cards[index]);

    if (comparison !== 0) {
      return comparison;
    }
  }

  return 0;
}

export function evaluateTwoPairsHand(cards: Card[]): Hand {
  const sorted = sortCardsByRankDesc(cards);
  const groups: Record<string, Card[]> = {};

  for (const card of sorted) {
    if (!groups[card.rank]) {
      groups[card.rank] = [];
    }

    groups[card.rank].push(card);
  }

  const pairs = Object.values(groups)
    .filter(group => group.length === 2)
    .sort((left, right) => compareCardsByRank(right[0], left[0]));

  if (pairs.length !== 2) {
    throw new Error("two pairs not found");
  }

  const kicker = Object.values(groups)
    .filter(group => group.length === 1)
    .flat();

  return {
    category: "two-pairs",
    cards: [...pairs[0], ...pairs[1], ...kicker]
  };
}

export function compareTwoPairsHands(left: Hand, right: Hand): number {
  const highPair = compareCardsByRank(left.cards[0], right.cards[0]);
  if (highPair !== 0) return highPair;

  const lowPair = compareCardsByRank(left.cards[2], right.cards[2]);
  if (lowPair !== 0) return lowPair;

  return compareCardsByRank(left.cards[4], right.cards[4]);
}