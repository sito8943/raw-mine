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
    }
  ) {
    const { name, life, weapon, armor, bag, drill } = options;
    this.name = name;
    this.life = { max: life.max, current: life.current };
    this.weapon = weapon === null ? new Weapon() : weapon;
    this.armor = armor === null ? new Armor() : armor;
    this.bag = bag === null ? new Bag() : bag;
    this.drill = drill === null ? new Drill(1) : drill;
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
}
