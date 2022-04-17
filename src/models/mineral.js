export const MineralsEnum = [
  { name: "Piedra", life: 15 }, // trash
  { name: "Carbón", life: 15 }, // material
  { name: "Estaño", life: 15 }, // material
  { name: "Cobre", life: 15 }, // material
  { name: "Hierro", life: 15 }, // material
  { name: "Ojo de Tigre", life: 15 }, // to sell
  { name: "Malaquita", life: 15 }, // to sell
  { name: "Amatista", life: 15 }, // to sell
  { name: "Oro", life: 15 }, // material +damage / to sell
  { name: "Cuarzo", life: 15 }, // material
  { name: "Jaspe Rojo", life: 15 }, // maeterial +life
  { name: "Calcita", life: 15 }, // material
  { name: "Aventurina", life: 15 }, // material ++damage
  { name: "Obsidiana", life: 15 }, // material ++defense
  { name: "Ruby", life: 15 }, // material ++life
  { name: "Safiro", life: 15 }, // material +++damage
  { name: "Calcedonia", life: 15 }, // material +all
  { name: "Diamante", life: 15 }, // material ++life ++defense
  { name: "Esmeralda", life: 15 }, // material ++damage ++defense
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
  constructor(options = { name: "", life: 0 }, sprite) {
    const { name, life } = options;
    this.name = name;
    this.sprite = sprite;
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

  get Sprite() {
    return this.sprite;
  }

  set Name(newName) {
    this.name = newName;
  }

  set Sprite(newSprite) {
    this.sprite = newSprite;
  }

  set Life(newLife) {
    this.life = newLife;
  }
}
