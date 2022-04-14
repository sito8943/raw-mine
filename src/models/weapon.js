export const WeaponseEnumType = {
  "Pistola de Cobre": 1,
};

export const WeaponsEnum = [
  {
    name: "Pistola de Cobre",
    ammo: -1,
    damage: 3,
    req: [{ name: "Cobre", count: 3 }],
  },
  {
    name: "Pistola de Hierro",
    ammo: 15 * 5,
    damage: 6,
    req: [{ name: "Hierro", count: 3 }],
  },
  {
    name: "Pistola de Aluminio",
    ammo: 17 * 4,
    damage: 9,
    req: [{ name: "Alumino", count: 3 }],
  },
  {
    name: "Cañón dorado",
    ammo: 1 * 10,
    damage: 15,
    req: [
      { name: "Oro", count: 3 },
      { name: "Hierro", count: 1 },
    ],
  },
];

export default class Weapon {
  constructor(options = { damage: 0, ammo: 0, name: "" }) {
    const { damage, ammo, name } = options;
    this.damage = damage;
    this.ammo = ammo;
    this.name = name;
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

  set Damage(newDamage) {
    this.damage = newDamage;
  }

  set Ammo(newAmmo) {
    this.ammo = newAmmo;
  }

  set Name(newName) {
    this.name = newName;
  }
}
