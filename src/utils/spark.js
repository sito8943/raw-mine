import * as PIXI from "pixi.js";

const CreateSpark = (sprite, x, y) => {
  const newSprite = new PIXI.Sprite.from(sprite);
  newSprite.width = 10;
  newSprite.height = 10;
  return newSprite;
};

export default CreateSpark;
