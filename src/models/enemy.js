export const EnemiesEnumType = {
  Slime: 1,
};

export const EnemiesEnum = [
  {
    name: "Slime",
    life: { max: 15 },
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
