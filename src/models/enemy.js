export default class Enemy {
  constructor(options = { name: "", life: { max: 0, current: 0 } }) {
    const { name, life } = options;
    this.name = name;
    this.life = { max: life.max, current: life.current };
  }

  get Name() {
    return this.name;
  }

  get Life() {
    return this.life;
  }

  set Life(newLife) {
    this.life = newLife;
  }

  set Name(newName) {
    this.name = newName;
  }
}
