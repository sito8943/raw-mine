export const MineralsEnum = [
  { name: "Piedra", life: 15, type: 0 }, // trash
  { name: "Carbón", life: 17, type: 1 }, // material
  { name: "Estaño", life: 17, type: 2 }, // material
  { name: "Cobre", life: 20, type: 3 }, // material
  { name: "Hierro", life: 25, type: 4 }, // material
  { name: "Ojo de Tigre", life: 5, type: 5 }, // to sell
  { name: "Malaquita", life: 5, type: 6 }, // to sell
  { name: "Amatista", life: 5, type: 7 }, // to sell
  { name: "Oro", life: 17, type: 8 }, // material +damage / to sell
  { name: "Cuarzo", life: 40, type: 9 }, // material
  { name: "Jaspe Rojo", life: 5, type: 10 }, // material +life
  { name: "Calcita", life: 25, type: 11 }, // material
  { name: "Aventurina", life: 25, type: 12 }, // material ++damage
  { name: "Obsidiana", life: 70, type: 13 }, // material ++defense
  { name: "Ruby", life: 35, type: 14 }, // material ++life
  { name: "Safiro", life: 35, type: 15 }, // material +++damage
  { name: "Calcedonia", life: 35, type: 16 }, // material +all
  { name: "Diamante", life: 50, type: 17 }, // material ++life ++defense
  { name: "Esmeralda", life: 15, type: 18 }, // material ++damage ++defense
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
  constructor(options = { name: "", life: 0, x: -1, y: -1, type: 0 }) {
    const { name, life, x, y, type } = options;
    this.name = name;
    this.x = x;
    this.y = y;
    this.type = type;
    this.life = { max: life, current: life };
  }

  get Name() {
    return this.name;
  }

  TakeDamage(damage) {
    this.life.current -= damage;
    if (this.life.current <= 0) return true;
    return false;
  }

  IsAlive() {
    if (this.life.current > 0) return true;
    return false;
  }

  get Life() {
    return this.life;
  }

  set Name(newName) {
    this.name = newName;
  }

  set Life(newLife) {
    this.life = newLife;
  }
}
