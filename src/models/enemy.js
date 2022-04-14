export const EnemiesEnumType = {
  Slime: 1,
};

export const EnemiesEnum = [
  {
    name: "Slime de cueva",
    life: { max: 15 },
    damage: 3,
  },
  {
    name: "Planta carnivora",
    life: { max: 15 },
    damage: 3,
  },
  {
    name: "Hongo aturdidor",
    life: { max: 15 },
    damage: 3,
  },
  {
    name: "Araña gigante",
    life: { max: 15 },
    damage: 3,
  },
  {
    name: "Escarabajo pistolero",
    life: { max: 15 },
    damage: 3,
  },
  {
    name: "Murciélago gigante",
    life: { max: 15 },
    damage: 3,
  },
  {
    name: "Goblin",
    life: { max: 15 },
    damage: 3,
  },
  {
    name: "Troll",
    life: { max: 15 },
    damage: 3,
  },
  {
    name: "Minero enano",
    life: { max: 15 },
    damage: 3,
  },
  {
    name: "Gólem",
    life: { max: 15 },
    damage: 3,
  },
  {
    name: "Dragón",
    life: { max: 15 },
    damage: 3,
  },
];

export default class Enemy {
  constructor(options = { name: "", life: { max: 0, current: 0 }, damage: 0 }) {
    const { name, life, damage } = options;
    this.name = name;
    this.life = { max: life.max, current: life.current };
    this.damage = damage;
  }

  get Name() {
    return this.name;
  }

  get Life() {
    return this.life;
  }

  set Life(newLife) {
    this.life = newLife;
  }

  set Name(newName) {
    this.name = newName;
  }
}
