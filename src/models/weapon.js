export const WeaponseEnumType = {
  "Pistola de Cobre": 1,
};

export const WeaponsEnum = [
  {
    name: "Pistola de Cobre",
    ammo: -1,
    damage: 3,
    reload: 1000,
    speed: 3,
    req: [{ name: "Cobre", count: 3 }],
  },
  {
    name: "Pistola de Hierro",
    ammo: 15 * 5,
    damage: 6,
    reload: 1000,
    speed: 4,
    req: [{ name: "Hierro", count: 3 }],
  },
  {
    name: "Pistola de Aluminio",
    ammo: 17 * 4,
    damage: 9,
    reload: 1000,
    speed: 5,
    req: [{ name: "Alumino", count: 3 }],
  },
  {
    name: "Cañón dorado",
    ammo: 1 * 10,
    damage: 15,
    reload: 2000,
    speed: 1,
    req: [
      { name: "Oro", count: 3 },
      { name: "Hierro", count: 1 },
    ],
  },
];

export default class Weapon {
  constructor(options = { damage: 0, ammo: 0, name: "", reload: 0, speed: 0 }) {
    const { damage, ammo, name, reload, speed } = options;
    this.damage = damage;
    this.ammo = ammo;
    this.name = name;
    this.reload = reload;
    this.speed = speed;
  }

  get Damage() {
    return this.damage;
  }

  get Ammo() {
    return this.ammo;
  }

  get Name() {
    return this.name;
  }

  get Reload() {
    return this.reload;
  }

  get Speed() {
    return this.speed;
  }

  set Damage(newDamage) {
    this.damage = newDamage;
  }

  set Ammo(newAmmo) {
    this.ammo = newAmmo;
  }

  set Name(newName) {
    this.name = newName;
  }

  set Reload(newReload) {
    this.reload = newReload;
  }
  set Speed(newSpeed) {
    this.reload = newSpeed;
  }
}
