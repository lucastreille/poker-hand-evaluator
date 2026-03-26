# Poker Hand Evaluator

## Objectif
Évaluer la meilleure main de poker Texas Hold'em à partir de 7 cartes, comparer plusieurs joueurs, gérer les égalités et retourner les 5 cartes choisies.

## Fonctionnalités
- évaluation des catégories :
  - high-card
  - one-pair
  - two-pairs
  - three-of-a-kind
  - straight
  - flush
  - full-house
  - four-of-a-kind
  - straight-flush
- comparaison de mains de même catégorie
- comparaison générale entre catégories
- sélection de la meilleure main de 5 cartes parmi 7
- détermination du ou des gagnants
- format final avec :
  - playerId
  - category
  - chosen5

## Approche
Le développement a été fait de manière incrémentale, guidé par les tests.
Chaque comportement important a été ajouté par petits pas :
1. modélisation des cartes
2. évaluation des mains sur 5 cartes
3. comparaison des mains
4. meilleure main parmi 7 cartes
5. gagnants et égalités
6. format final du résultat

## Choix de conception
- les rangs sont ordonnés numériquement pour simplifier les comparaisons
- les couleurs sont représentées en ASCII :
  - S = Spades
  - H = Hearts
  - D = Diamonds
  - C = Clubs
- `chosen5` est retourné dans l’ordre utile à la comparaison de la catégorie
  - par exemple :
    - one-pair : paire puis kickers
    - two-pairs : paire haute, paire basse, kicker
    - straight / straight-flush : carte la plus haute vers la plus basse
    - flush / high-card : cartes triées décroissantes

## Cas particuliers couverts
- straight basse avec As : A-2-3-4-5
- board plays
- carré sur le board avec kicker décisif
- flush avec plus de 5 cartes possibles

## Hypothèses sur les entrées
Les entrées sont supposées valides : aucune carte en double dans les 7 cartes d'un joueur, et les rangs/couleurs respectent le format attendu. Aucune validation explicite n'est effectuée.

## Lancer les tests
```bash
npm test