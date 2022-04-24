import * as PIXI from "pixi.js";

// enemies
import slime1 from "../assets/images/enemies/slime1.png";
import slime2 from "../assets/images/enemies/slime2.png";
import slime3 from "../assets/images/enemies/slime3.png";
import slime4 from "../assets/images/enemies/slime4.png";

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
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
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
        mineralS = "coal";
        break;
      }
      case 2: {
        mineralS = "tin";
        break;
      }
      case 3: {
        mineralS = "copper";
        break;
      }
      case 4: {
        mineralS = "iron";
        break;
      }
      case 5: {
        mineralS = "tigereye";
        break;
      }
      case 6: {
        mineralS = "malachite";
        break;
      }
      case 7: {
        mineralS = "amathyst";
        break;
      }
      case 8: {
        mineralS = "gold";
        break;
      }
      case 9: {
        mineralS = "quartz";
        break;
      }
      case 10: {
        mineralS = "red jasper";
        break;
      }
      case 11: {
        mineralS = "calcite";
        break;
      }
      case 12: {
        mineralS = "aventurine";
        break;
      }
      case 13: {
        mineralS = "obsidian";
        break;
      }
      case 14: {
        mineralS = "ruby";
        break;
      }
      case 15: {
        mineralS = "sapphire";
        break;
      }
      case 16: {
        mineralS = "chalcedony";
        break;
      }
      case 17: {
        mineralS = "diamond";
        break;
      }
      case 18: {
        mineralS = "emerald";
        break;
      }
      default: {
        mineralS = "stone";
        break;
      }
    }
    mineral = new Mineral({ ...MineralsEnum[rand], x, y });
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
      case 4: {
        slimeS = new PIXI.Sprite.from(slime4);
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
