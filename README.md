# projet-codeclicker

Les idle games sont un genre de jeu vidéo ayant une mécanique de jeu simple et répétitive. Le concept est souvent simple, et des actions simples comme du clic permettent de débloquer de la ressource pour améliorer son rendement. Le jeu dispose souvent d’un principe d’incrémentation, et débloque la possibilité de débloquer de la ressource sans action de la part du joueur. Cette mécanique de jeu entraîne une progression importante des ressources, permettant d’obtenir des améliorations pour créer plus de ressource, et ainsi de suite. Ce genre, apparu au début des années 2000, s'est popularisé avec le succès de Cookie Clicker en 2013 et s'est largement répandu au sein des jeux sur navigateur.

L’objectif ici est de recréer un idle clicker classique sur le thème du développement. L’idée est de reprendre le format d’un débutant dans le monde du dev afin de reprendre plus ou moins le parcours de notre formation.

## Membres de l'équipe

- Emma : Product Owner & Scrum Master
- Léo : Content manager et développeur fullstack
- Pierre : Git officer et développeur fullstack
- Charles : Lead dev Front
- Julien : Lead dev back

## Documentations

### Documentation de l'API

Après avoir lancé le serveur, la documentation de l'API est disponible sur /api-docs.

### Objet type d'une sauvegarde

```js
const saveObject = {
  player: {
    username: "x",
    email: "a@a.com",
    click_counter: 12345,
    exp: 123456789,
    click_value: 2,
    passive_value: 3,
    updated_at: "TIME",
    last_challenge_id: 1,
    player_has_upgrade: [
      {
        id: 1,
        level: 2,
        base_cost: 3.5,
        flat_bonus: 1,
        is_active: true,
        next_cost: 3.5,
      },
      {
        id: 2,
        level: 3,
        flat_bonus: 2,
        is_active: false,
        base_cost: 3.5,
      },
    ],
  },
};
```

## Objet type d'un challenge

```js
const challenge = {
  id: 1,
  title: "Ta première fonction",
  description: "description",
  instruction: "instructions",
  precode: "precode",
  keyword: ["n", "return", "+"],
  test: [
    {
      output: 10,
      input: [4, 6],
    },
    {
      output: 6,
      input: [3, 3],
    },
    {
      output: 9,

      input: [1, 8],
    },
  ],
};
```

## Objet intermédiaire d'un challenge

```js
const challenge = {
  id: 1,
  title: "Ta première fonction",
  description: "description",
  instruction: "instructions",
  precode: "precode",
  keyword: ["n", "return", "+"],
  test: [
    {
      output: "10",
      type: "number",
      input: [
        {
          input: "4",
          type: "number",
        },
        {
          input: "6",
          type: "number",
        },
      ],
    },
    {
      output: "6",
      type: "number",
      input: [
        {
          input: "3",
          type: "number",
        },
        {
          input: "6",
          type: "number",
        },
      ],
    },
    {
      output: "9",
      type: "number",
      input: [
        {
          input: "1",
          type: "number",
        },
        {
          input: "8",
          type: "number",
        },
      ],
    },
  ],
};
```

## La logique derrière les mathématiques

During the conception phase, we planned out an estimate of how long we wished our game to last our players. Considering the scale of the project and the number of upgrades available (active and passive), we wanted to strike a decent balance of playability so that a player stays stimulated during the gameplay while also getting a decent playtime (hours ideally). To achieve this, we looked at key values we wanted to attain : namely an estimate of the number of upgrades bought in a given time frame while playing, an order of magnitude for the maximum value of experience attainable with maximum upgrades, as well as a cost increment between upgrade tiers that makes sense and doesn't look weird to the player.

To achieve this we created a formulae to express the time it takes the player to buy the nth upgrade of a specific tier, as well as the total experience gained after buying the nth upgrade, assuming having only one tier of upgrades. From this foundation we made a small script iterating for a given amount of time to estimate how many upgrades a player can buy in a given timeframe if they focused only on that upgrade.

From that point, trying different initial income and cost values for that first upgrade was easy. We aimed at being able to buy around 10 to 20 levels per minute of the current tier the player is at. Being able to afford something that feels valuable often keeps the player interested in the game longer.

The cost factor that is defined in our helper.js file is what we can tweak to make the game slower or faster assuming we do not change the base_cost of upgrades.
The base cost of the first upgrade is 10, and the base cost of the following upgrade is always 16 times the cost of the previous upgrade. The income per second or per click is always one tenth the base cost of an upgrade.

We settled on these numbers because they made sense progression-wise and were fitting in a coding themed game. We chose a factor of 16 instead of something like 2 which would have also made sense thematically because we wanted to reach numbers around the quintillion and more often seen in the clicker genre and this was the best number to get there with our fixed number of tiers while keeping the amount of levels purchased per upgrade reasonable.

One of the limitations of our project is the immediate obsolescence of previous upgrade tiers as one unlocks the next. This is something that could be changed with more time to work on content that would alter the values of the previous tiers, like modifiers.
