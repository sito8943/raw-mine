export const DrillsEnumType = {
  "Taladro de Cobre": 1,
};

export const DrillsEnum = [
  { name: "Taladro de Cobre", damage: 5, req: [{ name: "Cobre", count: 3 }] },
];

export default class Drill {
  constructor(options = { name: "", damage: 0 }) {
    const { name, damage } = options;
    this.name = name;
    this.damage = damage;
  }

  get Name() {
    return this.name;
  }

  get Damage() {
    return this.damage;
  }

  set Name(newName) {
    this.name = newName;
  }

  set Damage(newDamage) {
    this.damage = newDamage;
  }
}
