import { Rank } from "./rank";
import { Suit } from "./suit";

export class Card {
  constructor(
    public rank: Rank,
    public suit: Suit
  ) {}
}
