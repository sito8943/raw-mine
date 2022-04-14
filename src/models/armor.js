export const ArmorsEnumType = {
  "Armadura de Plástica": 1,
};

export const ArmorsEnum = [{ name: "Armadura de Plástica", defense: 1 }];

export default class Armor {
  constructor(options = { name: "", defense: 0 }) {
    const { name, defense } = options;
    this.name = name;
    this.defense = defense;
  }

  get Name() {
    return this.name;
  }

  get Defense() {
    return this.defense;
  }

  set Defense(newDefense) {
    this.defense = newDefense;
  }

  set Name(newName) {
    this.name = newName;
  }
}
