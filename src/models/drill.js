export const DrillsEnumType = {
  "Taladro de Plástico": 1,
};

export const DrillsEnum = [{ name: "Taladro de Plástico" }];

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
