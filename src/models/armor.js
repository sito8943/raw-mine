export const ArmorsEnumType = {
  "Armadura de Cobre": 1,
};

export const ArmorsEnum = [
  { name: "Armadura de Cobre", defense: 1, req: [{ name: "Cobre", count: 5 }] },
  {
    name: "Armadura de Hierro",
    defense: 2,
    req: [{ name: "Hierro", count: 5 }],
  },
  {
    name: "Armadura de Aluminio",
    defense: 3,
    req: [{ name: "Aluminio", count: 5 }],
  },
  {
    name: "Muro de Cuarzo",
    defense: 5,
    req: [
      { name: "Cuarzo", count: 3 },
      { name: "Hierro", count: 3 },
    ],
  },
];

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
