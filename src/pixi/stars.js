import stars from "../assets/images/star.png";

// Get the texture for rope.
const starTexture = PIXI.Texture.from("stars");

const starAmount = 1000;
let cameraZ = 0;
const fov = 20;
const baseSpeed = 0.025;
let speed = 0;
let warpSpeed = 0;
const starStretch = 5;
const starBaseSize = 0.05;

// Create the stars
const stars = [];
for (let i = 0; i < starAmount; i++) {
  const star = {
    sprite: new PIXI.Sprite(starTexture),
    z: 0,
    x: 0,
    y: 0,
  };
  star.sprite.anchor.x = 0.5;
  star.sprite.anchor.y = 0.7;
  randomizeStar(star, true);
  app.stage.addChild(star.sprite);
  stars.push(star);
}

function randomizeStar(star, initial) {
  star.z = initial
    ? Math.random() * 2000
    : cameraZ + Math.random() * 1000 + 2000;

  // Calculate star positions with radial random coordinate so no star hits the camera.
  const deg = Math.random() * Math.PI * 2;
  const distance = Math.random() * 50 + 1;
  star.x = Math.cos(deg) * distance;
  star.y = Math.sin(deg) * distance;
}

// Change flight speed every 5 seconds
setInterval(() => {
  warpSpeed = warpSpeed > 0 ? 0 : 1;
}, 5000);
