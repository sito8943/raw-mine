export const MineralsEnum = [
  { name: "Piedra" },
  { name: "Carbón" },
  { name: "Cobre" },
  { name: "Estaño" },
  { name: "Hierro" },
  { name: "Ojo de Tigre" },
  { name: "Oro" },
  { name: "Cuarzo" },
  { name: "Jaspe Rojo" },
  { name: "Calcita" },
  { name: "Aventurina" },
  { name: "Obsidiana" },
  { name: "Ruby" },
  { name: "Safiro" },
  { name: "Ágata" },
  { name: "Malaquita" },
  { name: "Amatista" },
  { name: "Diamante" },
  { name: "Esmeralda" },
];

export const MineralsEnumType = {
  Piedra: 1,
  Carbón: 2,
  Cobre: 3,
  Estaño: 4,
  Hierro: 5,
  "Ojo de Tigre": 6,
  Oro: 7,
  Cuarzo: 8,
  "Jaspe Rojo": 9,
  Calcita: 10,
  Aventurina: 11,
  Obsidiana: 12,
  Ruby: 13,
  Safiro: 14,
  Ágata: 15,
  Malaquita: 16,
  Amatista: 17,
  Diamante: 18,
  Esmeralda: 19,
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
