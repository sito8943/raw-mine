export const EnemiesEnumType = {
  Slime: 1,
};

export const EnemiesEnum = [
  {
    name: "Green slime",
    life: { max: 15 },
    damage: 3,
  },
  {
    name: "Blue slime",
    life: { max: 17 },
    damage: 5,
  },
  {
    name: "Red slime",
    life: { max: 19 },
    damage: 7,
  },
  {
    name: "Black slime",
    life: { max: 22 },
    damage: 9,
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
    name: "Escarabajo Molesto",
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
  constructor(options = { name: "", life: { max: 0 }, damage: 0 }, sprite) {
    const { name, life, damage } = options;
    this.name = name;
    this.life = { max: life.max, current: life.max };
    this.damage = damage;
    this.sprite = sprite;
  }

  TakeDamage(damage) {
    this.life.current -= damage;
    if (this.life.current <= 0) return true;
    return false;
  }

  IsCollider() {
    return false;
  }

  IsPlayer() {
    return false;
  }

  IsAlive() {
    if (this.life.current > 0) return true;
    return false;
  }

  get Name() {
    return this.name;
  }

  get Life() {
    return this.life;
  }

  get Sprite() {
    return this.sprite;
  }

  set Life(newLife) {
    this.life = newLife;
  }

  set Name(newName) {
    this.name = newName;
  }

  set Sprite(newSprite) {
    this.sprite = newSprite;
  }
}
