export const EnemiesEnumType = {
  Slime: 1,
};

export const AllDead = (objects) => {
  for (let i = 0; i < objects.length; ++i)
    if (objects[i].IsAlive()) return false;
  return true;
};

export const EnemiesEnum = [
  {
    name: "Purple Slime",
    life: { max: 15 },
    damage: 3,
    type: 0,
  },
  {
    name: "Orange Slime",
    life: { max: 17 },
    damage: 5,
    type: 1,
  },
  {
    name: "Yellow Slime",
    life: { max: 19 },
    damage: 7,
    type: 2,
  },
  {
    name: "Blue Slime",
    life: { max: 22 },
    damage: 9,
    type: 3,
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
  constructor(
    options = { name: "", life: { max: 0 }, damage: 0, type: -1, x: -1, y: -1 }
  ) {
    const { name, life, damage, type, x, y } = options;
    this.name = name;
    this.life = { max: life.max, current: life.max };
    this.damage = damage;
    this.type = type;
    this.x = x;
    this.y = y;
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

  get Damage() {
    return this.damage;
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

  set Damage(newDamage) {
    this.damage = newDamage;
  }
}
