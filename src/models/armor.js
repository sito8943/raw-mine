export default class Armor {
  constructor(options = { defense: 0 }) {
    const { defense } = options;
    this.defense = defense;
  }

  get Defense() {
    return this.defense;
  }

  set Defense(newDefense) {
    this.defense = newDefense;
  }
}
