export const WeaponseEnumType = {
  "Pistola de Cobre": 1,
};

export const WeaponsEnum = [
  { name: "Pistola de Cobre", ammo: -1, damage: 5 },
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
