export const MineralsEnum = [
  { name: "Piedra" }, // trash
  { name: "Carbón" }, // material
  { name: "Estaño" }, // material
  { name: "Cobre" }, // material
  { name: "Hierro" }, // material
  { name: "Ojo de Tigre" }, // to sell
  { name: "Malaquita" }, // to sell
  { name: "Amatista" }, // to sell
  { name: "Oro" }, // material +damage / to sell
  { name: "Cuarzo" }, // material
  { name: "Jaspe Rojo" }, // maeterial +life
  { name: "Calcita" }, // material
  { name: "Aventurina" }, // material ++damage
  { name: "Obsidiana" }, // material ++defense
  { name: "Ruby" }, // material ++life
  { name: "Safiro" }, // material +++damage
  { name: "Calcedonia" }, // material +all
  { name: "Diamante" }, // material ++life ++defense
  { name: "Esmeralda" }, // material ++damage ++defense
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
