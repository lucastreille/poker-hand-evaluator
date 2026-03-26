import { Card, sortCardsByRankDesc, compareCardsByRank } from "./card";
import { getRankValue } from "./rank";

export type HandCategory =
  | "high-card"
  | "one-pair"
  | "two-pairs"
  | "three-of-a-kind"
  | "straight"
  | "flush";

export type Hand = {
  category: HandCategory;
  cards: Card[];
};

function groupCardsByRank(cards: Card[]): Record<string, Card[]> {
  const groups: Record<string, Card[]> = {};

  for (const card of cards) {
    if (!groups[card.rank]) {
      groups[card.rank] = [];
    }

    groups[card.rank].push(card);
  }

  return groups;
}

function isWheelStraight(cards: Card[]): boolean {
  const ranks = cards.map(card => card.rank);
  return ["A", "5", "4", "3", "2"].every(rank => ranks.includes(rank));
}

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
  const groups = groupCardsByRank(sorted);

  const pair = Object.values(groups).find(group => group.length === 2);

  if (!pair) {
    throw new Error("no pair found");
  }

  const kickers = Object.values(groups)
    .filter(group => group.length === 1)
    .flat();

  return {
    category: "one-pair",
    cards: [...pair, ...sortCardsByRankDesc(kickers)]
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
  const groups = groupCardsByRank(sorted);

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
  if (highPair !== 0) {
    return highPair;
  }

  const lowPair = compareCardsByRank(left.cards[2], right.cards[2]);
  if (lowPair !== 0) {
    return lowPair;
  }

  return compareCardsByRank(left.cards[4], right.cards[4]);
}

export function evaluateThreeOfAKindHand(cards: Card[]): Hand {
  const sorted = sortCardsByRankDesc(cards);
  const groups = groupCardsByRank(sorted);

  const threeOfAKind = Object.values(groups).find(group => group.length === 3);

  if (!threeOfAKind) {
    throw new Error("three of a kind not found");
  }

  const kickers = Object.values(groups)
    .filter(group => group.length === 1)
    .flat();

  return {
    category: "three-of-a-kind",
    cards: [...threeOfAKind, ...sortCardsByRankDesc(kickers)]
  };
}

export function compareThreeOfAKindHands(left: Hand, right: Hand): number {
  const threeOfAKindComparison = compareCardsByRank(left.cards[0], right.cards[0]);
  if (threeOfAKindComparison !== 0) {
    return threeOfAKindComparison;
  }

  for (let index = 3; index < left.cards.length; index++) {
    const comparison = compareCardsByRank(left.cards[index], right.cards[index]);
    if (comparison !== 0) {
      return comparison;
    }
  }

  return 0;
}

export function evaluateStraightHand(cards: Card[]): Hand {
  const sorted = sortCardsByRankDesc(cards);

  if (isWheelStraight(sorted)) {
    const five = sorted.find(card => card.rank === "5");
    const four = sorted.find(card => card.rank === "4");
    const three = sorted.find(card => card.rank === "3");
    const two = sorted.find(card => card.rank === "2");
    const ace = sorted.find(card => card.rank === "A");

    if (!five || !four || !three || !two || !ace) {
      throw new Error("straight not found");
    }

    return {
      category: "straight",
      cards: [five, four, three, two, ace]
    };
  }

  for (let index = 0; index < sorted.length - 1; index++) {
    const currentValue = getRankValue(sorted[index].rank);
    const nextValue = getRankValue(sorted[index + 1].rank);

    if (currentValue - nextValue !== 1) {
      throw new Error("straight not found");
    }
  }

  return {
    category: "straight",
    cards: sorted
  };
}

export function compareStraightHands(left: Hand, right: Hand): number {
  return compareCardsByRank(left.cards[0], right.cards[0]);
}

export function evaluateFlushHand(cards: Card[]): Hand {
  const firstSuit = cards[0].suit;
  const isFlush = cards.every(card => card.suit === firstSuit);

  if (!isFlush) {
    throw new Error("flush not found");
  }

  return {
    category: "flush",
    cards: sortCardsByRankDesc(cards)
  };
}

export function compareFlushHands(left: Hand, right: Hand): number {
  for (let index = 0; index < left.cards.length; index++) {
    const comparison = compareCardsByRank(left.cards[index], right.cards[index]);

    if (comparison !== 0) {
      return comparison;
    }
  }

  return 0;
}
