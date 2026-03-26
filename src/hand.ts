import { Card, sortCardsByRankDesc, compareCardsByRank } from "./card";
import { getRankValue } from "./rank";

export type HandCategory =
  | "high-card"
  | "one-pair"
  | "two-pairs"
  | "three-of-a-kind"
  | "straight"
  | "flush"
  | "full-house"
  | "four-of-a-kind"
  | "straight-flush";

export type Hand = {
  category: HandCategory;
  cards: Card[];
};

const handCategoryStrength: Record<HandCategory, number> = {
  "high-card": 1,
  "one-pair": 2,
  "two-pairs": 3,
  "three-of-a-kind": 4,
  "straight": 5,
  "flush": 6,
  "full-house": 7,
  "four-of-a-kind": 8,
  "straight-flush": 9
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
  return { category: "high-card", cards: sortCardsByRankDesc(cards) };
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

  const kickers = Object.values(groups).filter(group => group.length === 1).flat();

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

  const kicker = Object.values(groups).filter(group => group.length === 1).flat();

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

  const kickers = Object.values(groups).filter(group => group.length === 1).flat();

  return {
    category: "three-of-a-kind",
    cards: [...threeOfAKind, ...sortCardsByRankDesc(kickers)]
  };
}

export function compareThreeOfAKindHands(left: Hand, right: Hand): number {
  const threeComparison = compareCardsByRank(left.cards[0], right.cards[0]);
  if (threeComparison !== 0) {
    return threeComparison;
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

export function evaluateFullHouseHand(cards: Card[]): Hand {
  const sorted = sortCardsByRankDesc(cards);
  const groups = groupCardsByRank(sorted);

  const threeOfAKind = Object.values(groups).find(group => group.length === 3);
  const pair = Object.values(groups).find(group => group.length === 2);

  if (!threeOfAKind || !pair) {
    throw new Error("full house not found");
  }

  return {
    category: "full-house",
    cards: [...threeOfAKind, ...pair]
  };
}

export function compareFullHouseHands(left: Hand, right: Hand): number {
  const threeComparison = compareCardsByRank(left.cards[0], right.cards[0]);
  if (threeComparison !== 0) {
    return threeComparison;
  }

  return compareCardsByRank(left.cards[3], right.cards[3]);
}

export function evaluateFourOfAKindHand(cards: Card[]): Hand {
  const sorted = sortCardsByRankDesc(cards);
  const groups = groupCardsByRank(sorted);

  const fourOfAKind = Object.values(groups).find(group => group.length === 4);
  if (!fourOfAKind) {
    throw new Error("four of a kind not found");
  }

  const kicker = Object.values(groups).find(group => group.length === 1);
  if (!kicker) {
    throw new Error("kicker not found");
  }

  return {
    category: "four-of-a-kind",
    cards: [...fourOfAKind, ...kicker]
  };
}

export function compareFourOfAKindHands(left: Hand, right: Hand): number {
  const fourComparison = compareCardsByRank(left.cards[0], right.cards[0]);
  if (fourComparison !== 0) {
    return fourComparison;
  }

  return compareCardsByRank(left.cards[4], right.cards[4]);
}

export function evaluateStraightFlushHand(cards: Card[]): Hand {
  evaluateFlushHand(cards);
  const straight = evaluateStraightHand(cards);

  return {
    category: "straight-flush",
    cards: straight.cards
  };
}

export function compareStraightFlushHands(left: Hand, right: Hand): number {
  return compareStraightHands(left, right);
}

export function compareHands(left: Hand, right: Hand): number {
  const categoryComparison =
    handCategoryStrength[left.category] - handCategoryStrength[right.category];

  if (categoryComparison !== 0) {
    return categoryComparison;
  }

  switch (left.category) {
    case "high-card":
      return compareHighCardHands(left, right);
    case "one-pair":
      return compareOnePairHands(left, right);
    case "two-pairs":
      return compareTwoPairsHands(left, right);
    case "three-of-a-kind":
      return compareThreeOfAKindHands(left, right);
    case "straight":
      return compareStraightHands(left, right);
    case "flush":
      return compareFlushHands(left, right);
    case "full-house":
      return compareFullHouseHands(left, right);
    case "four-of-a-kind":
      return compareFourOfAKindHands(left, right);
    case "straight-flush":
      return compareStraightFlushHands(left, right);
  }
}

export function evaluateHand(cards: Card[]): Hand {
  try {
    return evaluateStraightFlushHand(cards);
  } catch {}

  try {
    return evaluateFourOfAKindHand(cards);
  } catch {}

  try {
    return evaluateFullHouseHand(cards);
  } catch {}

  try {
    return evaluateFlushHand(cards);
  } catch {}

  try {
    return evaluateStraightHand(cards);
  } catch {}

  try {
    return evaluateThreeOfAKindHand(cards);
  } catch {}

  try {
    return evaluateTwoPairsHand(cards);
  } catch {}

  try {
    return evaluateOnePairHand(cards);
  } catch {}

  return evaluateHighCardHand(cards);
}

function buildFiveCardCombinations(cards: Card[]): Card[][] {
  const combinations: Card[][] = [];

  for (let a = 0; a < cards.length - 4; a++) {
    for (let b = a + 1; b < cards.length - 3; b++) {
      for (let c = b + 1; c < cards.length - 2; c++) {
        for (let d = c + 1; d < cards.length - 1; d++) {
          for (let e = d + 1; e < cards.length; e++) {
            combinations.push([
              cards[a],
              cards[b],
              cards[c],
              cards[d],
              cards[e]
            ]);
          }
        }
      }
    }
  }

  return combinations;
}

export function findBestHandFromSevenCards(cards: Card[]): Hand {
  if (cards.length !== 7) {
    throw new Error("exactly 7 cards are required");
  }

  const combinations = buildFiveCardCombinations(cards);
  let bestHand = evaluateHand(combinations[0]);

  for (let index = 1; index < combinations.length; index++) {
    const currentHand = evaluateHand(combinations[index]);

    if (compareHands(currentHand, bestHand) > 0) {
      bestHand = currentHand;
    }
  }

  return bestHand;
}

export type PlayerCards = {
  playerId: string;
  cards: Card[];
};

export type Winner = {
  playerId: string;
  hand: Hand;
};

export function findWinners(players: PlayerCards[]): Winner[] {
  if (players.length === 0) {
    return [];
  }

  const evaluatedPlayers = players.map(player => ({
    playerId: player.playerId,
    hand: findBestHandFromSevenCards(player.cards)
  }));

  let bestWinner = evaluatedPlayers[0];

  for (let index = 1; index < evaluatedPlayers.length; index++) {
    const currentPlayer = evaluatedPlayers[index];

    if (compareHands(currentPlayer.hand, bestWinner.hand) > 0) {
      bestWinner = currentPlayer;
    }
  }

  return evaluatedPlayers.filter(player => compareHands(player.hand, bestWinner.hand) === 0);
}

export type GameResult = {
  playerId: string;
  category: HandCategory;
  chosen5: string[];
};

function formatCard(card: Card): string {
  return `${card.rank}${card.suit}`;
}

export function buildGameResult(players: PlayerCards[]): GameResult[] {
  const winners = findWinners(players);

  return winners.map(winner => ({
    playerId: winner.playerId,
    category: winner.hand.category,
    chosen5: winner.hand.cards.map(formatCard)
  }));
}
