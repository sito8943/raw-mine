export const MineralsEnum = {
  "Ojo de Tigre": 1,
  Cuarzo: 2,
  "Jaspe Rojo": 3,
  Calcita: 4,
  Aventurina: 5,
  Obsidiana: 6,
  Ruby: 7,
  Ágata: 8,
  Malaquita: 9,
  Amatista: 10,
};

export default class Mineral {
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
