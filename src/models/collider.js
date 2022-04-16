export default class Collider {
  constructor(options = { name: "" }, sprite) {
    const { name } = options;
    this.name = name;
    this.sprite = sprite;
  }

  IsPlayer() {
    return false;
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

  get Sprite() {
    return this.sprite;
  }

  set Name(newName) {
    this.name = newName;
  }

  set Sprite(newSprite) {
    this.sprite = newSprite;
  }
}
