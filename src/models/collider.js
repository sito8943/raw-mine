export default class Collider {
  constructor(options = { name: "" }) {
    const { name } = options;
    this.name = name;
  }

  IsCollider() {
    return true;
  }

  IsAlive() {
    return true;
  }

  get Name() {
    return this.name;
  }

  set Name(newName) {
    this.name = newName;
  }
}
