import * as PIXI from "pixi.js";

// ores
import stone from "../assets/images/ores/stone.png";
import carbon from "../assets/images/ores/carbon.png";
import copper from "../assets/images/ores/copper.png";
import iron from "../assets/images/ores/iron.png";
import gold from "../assets/images/ores/gold.png";
import ruby from "../assets/images/ores/ruby.png";
import zaphire from "../assets/images/ores/zaphire.png";
import diamond from "../assets/images/ores/diamond.png";
import esmerald from "../assets/images/ores/esmerald.png";

// enemies
import slime1 from "../assets/images/enemies/slime1.png";
import slime2 from "../assets/images/enemies/slime2.png";
import slime3 from "../assets/images/enemies/slime3.png";

// models
import Mineral, { MineralsEnum } from "../models/mineral";
import Enemy, { EnemiesEnum } from "../models/enemy";

// minerals
let distribution = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
];

// enemy distribution
let eDistribution = [
  [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
];

export const CreateMineral = (x, y) => {
  let rand = Math.floor(Math.random() * (distribution.length - 1));
  let rand1 = Math.floor(Math.random() * (distribution[rand].length - 1));
  // create mineral
  let mineralS = null;
  let mineral = null;

  if (distribution[rand][rand1] === 1) {
    switch (rand) {
      case 1: {
        mineralS = new PIXI.Sprite.from(carbon);
        break;
      }
      case 2: {
        mineralS = new PIXI.Sprite.from(copper);
        break;
      }
      case 3: {
        mineralS = new PIXI.Sprite.from(iron);
        break;
      }
      case 4: {
        mineralS = new PIXI.Sprite.from(gold);
        break;
      }
      case 5: {
        mineralS = new PIXI.Sprite.from(ruby);
        break;
      }
      case 6: {
        mineralS = new PIXI.Sprite.from(zaphire);
        break;
      }
      case 7: {
        mineralS = new PIXI.Sprite.from(diamond);
        break;
      }
      case 8: {
        mineralS = new PIXI.Sprite.from(esmerald);
        break;
      }
      default: {
        mineralS = new PIXI.Sprite.from(stone);
        break;
      }
    }
    mineral = new Mineral(MineralsEnum[rand], mineralS);
    mineralS.width = 27;
    mineralS.height = 27;
    mineralS.x = x;
    mineralS.y = y;
    mineralS.z = 99;
    return mineral;
  }
  return null;
};

export const CreateEnemy = (x, y) => {
  // generation enemy
  let rand = Math.floor(Math.random() * (eDistribution.length - 1));
  let rand1 = Math.floor(Math.random() * (eDistribution[rand].length - 1));
  if (eDistribution[rand][rand1] === 1) {
    // create mineral
    let slimeS = null;
    let slime = null;
    switch (rand) {
      case 1: {
        slimeS = new PIXI.Sprite.from(slime2);
        break;
      }
      case 2: {
        slimeS = new PIXI.Sprite.from(slime3);
        break;
      }
      default: {
        slimeS = new PIXI.Sprite.from(slime1);
        break;
      }
    }
    slime = new Enemy(EnemiesEnum[rand], slimeS);
    slimeS.width = 25;
    slimeS.height = 25;
    slimeS.x = x + 5;
    slimeS.y = y + 5;
    slimeS.z = 99;
    return slime;
  }
  return null;
};
