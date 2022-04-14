export default class Mineral {
  constructor(options = { name: "" }) {
    const { name } = options;
    this.name = name;
  }

  get Name() {
    return this.name;
  }

  set Name(newName) {
    this.name = newName;
  }
}
