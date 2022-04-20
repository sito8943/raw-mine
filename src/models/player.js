import Weapon from "./weapon";
import Armor from "./armor";
import Bag from "./bag";
import Drill from "./drill";

export default class Player {
  constructor(
    options = {
      name: "",
      life: { max: 0, current: 0 },
      weapon: null,
      armor: null,
      bag: null,
      drill: null,
    },
    sprite
  ) {
    const { name, life, weapon, armor, bag, drill } = options;
    this.name = name;
    this.life = { max: life.max, current: life.current };
    this.weapon = weapon === null ? new Weapon() : weapon;
    this.armor = armor === null ? new Armor() : armor;
    this.bag = bag === null ? new Bag() : bag;
    this.drill = drill === null ? new Drill(1) : drill;
    this.sprite = sprite;
  }

  TakeDamage(damage) {
    this.life.current -= damage;
    if (this.life.current <= 0) return true;
    return false;
  }

  IsCollider() {
    return false;
  }

  IsPlayer() {
    return true;
  }

  IsAlive() {
    if (this.life.current > 0) return true;
    return false;
  }

  get Name() {
    return this.name;
  }

  get Life() {
    return this.life;
  }

  get Weapon() {
    return this.weapon;
  }

  get Armor() {
    return this.armor;
  }

  get Bag() {
    return this.bag;
  }

  get Drill() {
    return this.drill;
  }

  get Sprite() {
    return this.sprite;
  }

  set Name(newName) {
    this.name = newName;
  }

  set Life(newLife) {
    this.life = newLife;
  }

  set Weapon(newWeapon) {
    this.weapon = newWeapon;
  }

  set Armor(newArmor) {
    this.armor = newArmor;
  }

  set Bag(newBag) {
    this.bag = newBag;
  }

  set Drill(newDrill) {
    this.drill = newDrill;
  }

  set Sprite(newSprite) {
    this.sprite = newSprite;
  }
}
