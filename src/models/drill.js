export const DrillsEnumType = {
  "Taladro de Cobre": 1,
};

export const DrillsEnum = [
  { name: "Taladro de Cobre", req: [{ name: "Cobre", count: 3 }] },
];

export default class Drill {
  constructor(options = { name: "" }) {
    const { name } = options;
    this.name = name;
  }

  get Name() {
    return this.name;
  }

  set Name(newName) {
    this.name = newName;
  }
}
