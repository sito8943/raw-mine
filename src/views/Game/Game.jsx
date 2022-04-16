import { useEffect, useState, useRef } from "react";
import dungeoneer from "dungeoneer";

import * as PIXI from "pixi.js";

// context
import { useAudioController } from "../../context/AudioController";
import { useAudioConfig } from "../../context/AudioConfig";

// sprites
// import back from "../../assets/images/back.png";
import characterImg from "../../assets/images/character.png";
import spark from "../../assets/images/spark.gif";
import crate from "../../assets/images/crates.png";
import dirt from "../../assets/images/tiles/DirtGrassTilemap/Layer 1_sprite_6.png";

// utils
import app from "../../utils/app";
import CreateSpark from "../../utils/spark";

// models
import Weapon, { WeaponsEnum } from "../../models/weapon";
import Player from "../../models/player";
import Enemy, { EnemiesEnum } from "../../models/enemy";
import Collider from "../../models/collider";

// styles
import "./style.css";

let playerX = 0;
let playerY = 0;

// character
const character = new PIXI.Sprite.from(characterImg);
// test enemies
const enemy = new PIXI.Sprite.from(characterImg);
const enemy1 = new PIXI.Sprite.from(characterImg);
const enemy2 = new PIXI.Sprite.from(characterImg);

character.width = 25;
character.height = 25;
enemy.width = 60;
enemy.height = 60;
enemy1.width = 60;
enemy1.height = 60;
enemy2.width = 60;
enemy2.height = 60;

let sparks = [];
let sparkXs = [];
let sparkYs = [];
let sparkCount = 0;
// let sparkA = CreateSpark(spark, playerX, playerY);

// keys intervals
let iDown = null;
let iRight = null;
let iLeft = null;
let iUp = null;
// fire
let fDown = null;
let fRight = null;
let fLeft = null;
let fUp = null;

// fire intervals
let fires = [];

// all colliders
let allColliders = [
  new Player(
    {
      name: "Sito",
      life: { max: 15, current: 15 },
      weapon: new Weapon(WeaponsEnum[0]),
    },
    character
  ),
  new Enemy(EnemiesEnum[0], enemy),
  new Enemy(EnemiesEnum[0], enemy1),
  new Enemy(EnemiesEnum[0], enemy2),
];
let allWalls = [];

const player = allColliders[0];

let onReload = false;

const seed = new Date().getTime();

/*const DungeonA = {
  rooms: [],
  tiles: Array<[]>,
  seed: seed,
};*/

const Game = () => {
  const ref = useRef(null);

  const { useConfigState, setAudioConfigState } = useAudioConfig();
  const { setAudioControllerState } = useAudioController();

  const [mousePosition, setMousePosition] = useState();
  const [w, setW] = useState(false);
  const [attackSpeed, setAttackSpeed] = useState(player.Weapon.Reload);

  useEffect(() => {
    if (onReload)
      setTimeout(() => {
        onReload = false;
        setAudioControllerState({ type: "reloaded" });
      }, [attackSpeed]);
  }, [onReload]);

  useEffect(() => {
    if (!w) clearInterval(iUp);
    else {
      clearInterval(iRight);
      clearInterval(iDown);
      clearInterval(iLeft);
      executeMoveUp();
    }
  }, [w]);

  const [a, setA] = useState(false);

  useEffect(() => {
    if (!a) clearInterval(iLeft);
    else {
      clearInterval(iRight);
      clearInterval(iDown);
      clearInterval(iUp);
      executeMoveLeft();
    }
  }, [a]);

  const [d, setD] = useState(false);

  useEffect(() => {
    if (!d) clearInterval(iRight);
    else {
      clearInterval(iUp);
      clearInterval(iDown);
      clearInterval(iLeft);
      executeMoveRight();
    }
  }, [d]);

  const [s, setS] = useState(false);

  useEffect(() => {
    if (!s) clearInterval(iDown);
    else {
      clearInterval(iRight);
      clearInterval(iUp);
      clearInterval(iLeft);
      executeMoveDown();
    }
  }, [s]);

  const [up, setUp] = useState(false);

  useEffect(() => {
    if (!up) clearInterval(fUp);
    else {
      executeFireUp();
      clearInterval(fRight);
      clearInterval(fDown);
      clearInterval(fLeft);
    }
  }, [up]);

  const [left, setLeft] = useState(false);

  useEffect(() => {
    if (!left) clearInterval(fLeft);
    else {
      executeFireLeft();
      clearInterval(fUp);
      clearInterval(fDown);
      clearInterval(fRight);
    }
  }, [left]);

  const [right, setRight] = useState(false);

  useEffect(() => {
    if (!right) clearInterval(fRight);
    else {
      executeFireRight();
      clearInterval(fLeft);
      clearInterval(fDown);
      clearInterval(fUp);
    }
  }, [right]);

  const [down, setDown] = useState(false);

  useEffect(() => {
    if (!down) clearInterval(fDown);
    else {
      executeFireDown();
      clearInterval(fRight);
      clearInterval(fUp);
      clearInterval(fLeft);
    }
  }, [down]);

  const onClick = (e) => {
    const { global, button } = e.data;
    // mouseX = global.x;
    // mouseY = global.y;
    if (button === 2) {
      // collect();
    } else {
      // fire();
    }
  };

  // fire execution
  const executeFireUp = () => {
    if (!onReload) {
      setAudioControllerState({ type: "shot" });
      onReload = true;
      sparkCount += 1;
      const newLength = sparkCount;
      sparks[newLength] = CreateSpark(spark, playerX, playerY);
      sparkXs[newLength] = playerX + 10;
      sparkYs[newLength] = playerY + 10;
      app.stage.addChild(sparks[newLength]);

      app.ticker.add((delta) => {
        sparks[newLength].x = sparkXs[newLength];
        sparks[newLength].y = sparkYs[newLength];
      });

      const index = fires.length;
      let newI = setInterval(() => {
        sparkYs[newLength] -= player.Weapon.Speed;
        if (
          sparkYs[newLength] < -10 ||
          projectileCollision(sparks[newLength])
        ) {
          clearInterval(fires[index]);
          app.stage.removeChild(sparks[newLength]);
        }
      }, 1);
      fires.push(newI);
    } else setAudioControllerState({ type: "reloading" });

    // reload and fire
    fUp = setInterval(() => {
      sparkCount += 1;
      setAudioControllerState({ type: "shot" });
      onReload = true;
      const newLength = sparkCount;
      sparks[newLength] = CreateSpark(spark, playerX, playerY);
      sparkXs[newLength] = playerX + 10;
      sparkYs[newLength] = playerY + 10;
      app.stage.addChild(sparks[newLength]);

      app.ticker.add((delta) => {
        sparks[newLength].x = sparkXs[newLength];
        sparks[newLength].y = sparkYs[newLength];
      });
      const index = fires.length;
      let newI = setInterval(() => {
        sparkYs[newLength] -= player.Weapon.Speed;
        if (
          sparkYs[newLength] < -10 ||
          projectileCollision(sparks[newLength])
        ) {
          clearInterval(fires[index]);
          app.stage.removeChild(sparks[newLength]);
        }
      }, 1);
      fires.push(newI);
    }, player.Weapon.Reload);
  };

  const executeFireRight = () => {
    if (!onReload) {
      setAudioControllerState({ type: "shot" });
      onReload = true;
      sparkCount += 1;
      const newLength = sparkCount;
      sparks[newLength] = CreateSpark(spark, playerX, playerY);
      sparkXs[newLength] = playerX + 10;
      sparkYs[newLength] = playerY + 10;
      app.stage.addChild(sparks[newLength]);

      app.ticker.add((delta) => {
        sparks[newLength].x = sparkXs[newLength];
        sparks[newLength].y = sparkYs[newLength];
      });

      const index = fires.length;
      let newI = setInterval(() => {
        sparkXs[newLength] += player.Weapon.Speed;
        if (
          sparkXs[newLength] > app.screen.width ||
          projectileCollision(sparks[newLength])
        ) {
          clearInterval(fires[index]);
          app.stage.removeChild(sparks[newLength]);
        }
      }, 1);
      fires.push(newI);
    } else setAudioControllerState({ type: "reloading" });

    // reload and fire
    fRight = setInterval(() => {
      sparkCount += 1;
      setAudioControllerState({ type: "shot" });
      const newLength = sparkCount;
      sparks[newLength] = CreateSpark(spark, playerX, playerY);
      sparkXs[newLength] = playerX + 10;
      sparkYs[newLength] = playerY + 10;
      app.stage.addChild(sparks[newLength]);

      app.ticker.add((delta) => {
        sparks[newLength].x = sparkXs[newLength];
        sparks[newLength].y = sparkYs[newLength];
      });
      const index = fires.length;
      let newI = setInterval(() => {
        sparkXs[newLength] += player.Weapon.Speed;
        if (
          sparkXs[newLength] > app.screen.width ||
          projectileCollision(sparks[newLength])
        ) {
          clearInterval(fires[index]);
          app.stage.removeChild(sparks[newLength]);
        }
      }, 1);
      fires.push(newI);
    }, player.Weapon.Reload);
  };

  const executeFireDown = () => {
    if (!onReload) {
      setAudioControllerState({ type: "shot" });
      onReload = true;
      sparkCount += 1;
      const newLength = sparkCount;
      sparks[newLength] = CreateSpark(spark, playerX, playerY);
      sparkXs[newLength] = playerX + 10;
      sparkYs[newLength] = playerY + 10;
      app.stage.addChild(sparks[newLength]);

      app.ticker.add((delta) => {
        sparks[newLength].x = sparkXs[newLength];
        sparks[newLength].y = sparkYs[newLength];
      });

      const index = fires.length;
      let newI = setInterval(() => {
        sparkYs[newLength] += player.Weapon.Speed;
        if (
          sparkYs[newLength] > app.screen.height ||
          projectileCollision(sparks[newLength])
        ) {
          clearInterval(fires[index]);
          app.stage.removeChild(sparks[newLength]);
        }
      }, 1);
      fires.push(newI);
    } else setAudioControllerState({ type: "reloading" });

    // reload and fire
    fDown = setInterval(() => {
      sparkCount += 1;
      setAudioControllerState({ type: "shot" });
      const newLength = sparkCount;
      sparks[newLength] = CreateSpark(spark, playerX, playerY);
      sparkXs[newLength] = playerX + 10;
      sparkYs[newLength] = playerY + 10;
      app.stage.addChild(sparks[newLength]);

      app.ticker.add((delta) => {
        sparks[newLength].x = sparkXs[newLength];
        sparks[newLength].y = sparkYs[newLength];
      });
      const index = fires.length;
      let newI = setInterval(() => {
        sparkYs[newLength] += player.Weapon.Speed;
        if (
          sparkYs[newLength] < -10 ||
          projectileCollision(sparks[newLength])
        ) {
          clearInterval(fires[index]);
          app.stage.removeChild(sparks[newLength]);
        }
      }, 1);
      fires.push(newI);
    }, player.Weapon.Reload);
  };

  const executeFireLeft = () => {
    if (!onReload) {
      setAudioControllerState({ type: "shot" });
      onReload = true;
      sparkCount += 1;
      const newLength = sparkCount;
      sparks[newLength] = CreateSpark(spark, playerX, playerY);
      sparkXs[newLength] = playerX + 10;
      sparkYs[newLength] = playerY + 10;
      app.stage.addChild(sparks[newLength]);

      app.ticker.add((delta) => {
        sparks[newLength].x = sparkXs[newLength];
        sparks[newLength].y = sparkYs[newLength];
      });

      const index = fires.length;
      let newI = setInterval(() => {
        sparkXs[newLength] -= player.Weapon.Speed;
        if (
          sparkXs[newLength] < -10 ||
          projectileCollision(sparks[newLength])
        ) {
          clearInterval(fires[index]);
          app.stage.removeChild(sparks[newLength]);
        }
      }, 1);
      fires.push(newI);
    } else setAudioControllerState({ type: "reloading" });

    // reload and fire
    fLeft = setInterval(() => {
      sparkCount += 1;
      setAudioControllerState({ type: "shot" });
      const newLength = sparkCount;
      sparks[newLength] = CreateSpark(spark, playerX, playerY);
      sparkXs[newLength] = playerX + 10;
      sparkYs[newLength] = playerY + 10;
      app.stage.addChild(sparks[newLength]);

      app.ticker.add((delta) => {
        sparks[newLength].x = sparkXs[newLength];
        sparks[newLength].y = sparkYs[newLength];
      });
      const index = fires.length;
      let newI = setInterval(() => {
        sparkXs[newLength] -= player.Weapon.Speed;
        if (
          sparkXs[newLength] < -10 ||
          projectileCollision(sparks[newLength])
        ) {
          clearInterval(fires[index]);
          app.stage.removeChild(sparks[newLength]);
        }
      }, 1);
      fires.push(newI);
    }, player.Weapon.Reload);
  };

  // move execution
  const executeMoveUp = () => {
    if (playerY >= 5 && !colliderCollision(player.Sprite)) {
      iUp = setInterval(() => {
        if (playerY >= 5 && !colliderCollision(player.Sprite)) playerY -= 1;
        else {
          playerY += 5;
        }
      }, 10);
    } else playerY += 7;
  };
  const executeMoveLeft = () => {
    if (playerX >= 5 && !colliderCollision(player.Sprite)) {
      iLeft = setInterval(() => {
        if (playerX >= 5 && !colliderCollision(player.Sprite)) playerX -= 1;
        else playerX += 5;
      }, 10);
    } else playerX += 7;
  };
  const executeMoveRight = () => {
    if (playerX <= app.screen.width && !colliderCollision(player.Sprite)) {
      iRight = setInterval(() => {
        if (playerX <= app.screen.width && !colliderCollision(player.Sprite))
          playerX += 1;
        else playerX -= 5;
      }, 10);
    } else playerX -= 7;
  };
  const executeMoveDown = () => {
    if (playerY <= app.screen.height && !colliderCollision(player.Sprite)) {
      iDown = setInterval(() => {
        if (playerY <= app.screen.height && !colliderCollision(player.Sprite))
          playerY += 1;
        else playerY -= 5;
      }, 10);
    } else playerY -= 7;
  };

  useEffect(() => {
    // initialization

    document.body.onkeydown = keyPress;
    document.body.onkeyup = keyRelease;
    // On first render add app to DOM
    ref.current.appendChild(app.view);
    // Start the PixiJS app
    app.start();

    // dungeon
    const dungeon = dungeoneer.build({
      width: app.screen.width,
      height: app.screen.height,
      seed,
    });
    // app.stage.addChild(sprite);
    const tiles = dungeon.tiles;
    console.log(tiles);
    for (let i = 0; i < 20; ++i) {
      for (let j = 0; j < 20; ++j) {
        if (tiles[i][j].type === "wall" || tiles[i][j].type === "door") {
          const wall = new PIXI.Sprite.from(dirt);
          wall.width = 35;
          wall.height = 35;
          wall.x = tiles[i][j].x * 35;
          wall.y = tiles[i][j].y * 35;
          app.stage.addChild(wall);
        } else {
          const wall = new PIXI.Sprite.from(crate);
          wall.width = 35;
          wall.height = 35;
          wall.x = tiles[i][j].x * 35;
          wall.y = tiles[i][j].y * 35;
          app.stage.addChild(wall);
          allColliders.push(new Collider({ name: "wall" }, wall));
          allWalls.push(new Collider({ name: "wall" }, wall));
        }
      }
    }

    // test enemies
    app.stage.addChild(enemy);
    app.stage.addChild(enemy1);
    app.stage.addChild(enemy2);

    playerX = app.screen.width / 2;
    playerY = app.screen.height / 2;

    character.x = playerX;
    character.y = playerY;

    enemy.x = 200;
    enemy.y = 200;
    enemy1.x = 400;
    enemy1.y = 400;
    enemy2.x = 600;
    enemy2.y = 400;

    app.ticker.add((delta) => {
      character.x = playerX;
      character.y = playerY;
    });

    app.stage.addChild(character);

    return () => {
      // On unload stop the application
      app.stop();
    };
  }, []);

  const keyRelease = (e) => {
    const { key } = e;
    switch (key) {
      case "w":
      case "W":
        return setW(false);
      case "d":
      case "D":
        return setD(false);
      case "s":
      case "S":
        return setS(false);
      case "a":
      case "A":
        return setA(false);
      case "ArrowUp":
        return setUp(false);
      case "ArrowRight":
        return setRight(false);
      case "ArrowDown":
        return setDown(false);
      case "ArrowLeft":
        return setLeft(false);
      default:
        break;
    }
  };

  const keyPress = (e) => {
    const { key } = e;
    switch (key) {
      case "w":
      case "W":
        setW(true);
        break;
      case "d":
      case "D":
        setD(true);
        break;
      case "s":
      case "S":
        setS(true);
        break;
      case "a":
      case "A":
        setA(true);
        break;
      case "ArrowUp":
        return setUp(true);
      case "ArrowRight":
        return setRight(true);
      case "ArrowDown":
        return setDown(true);
      case "ArrowLeft":
        return setLeft(true);
      default:
        break;
    }
  };

  const handleDirection = (e) => {
    const { id } = e.target;
    switch (id) {
      case "fup":
        return setUp(true);
      case "fright":
        return setRight(true);
      case "fleft":
        return setLeft(true);
      case "fdown":
        return setDown(true);
      case "up":
        return setW(true);
      case "right":
        return setD(true);
      case "down":
        return setS(true);
      default: //left
        return setA(true);
    }
  };

  const handleRelease = (e) => {
    const { id } = e.target;
    switch (id) {
      case "fup":
        return executeFireUp();
      case "fright":
        return executeFireRight();
      case "fleft":
        return executeFireLeft();
      case "fdown":
        return executeFireDown();
      case "up":
        playerY -= 1;
        break;
      case "right":
        playerX += 1;
        break;
      case "down":
        playerY += 1;
        break;
      default: //left
        playerX -= 1;
    }
  };

  const colliderCollision = (sprite) => {
    for (let i = 0; i < allWalls.length; ++i) {
      const currentSprite = allWalls[i].Sprite;
      let xss = false;
      // going by left || going by right
      if (
        (sprite.x + sprite.width >= currentSprite.x + 2 &&
          sprite.x + sprite.width <= currentSprite.x + currentSprite.width) ||
        (sprite.x >= currentSprite.x &&
          sprite.x <= currentSprite.x + currentSprite.width - 2)
      ) {
        xss = true;
      }

      if (xss) {
        // down collision || up collision
        if (
          (sprite.y >= currentSprite.y &&
            sprite.y <= currentSprite.y + currentSprite.height - 2) ||
          (sprite.y + sprite.height >= currentSprite.y + 2 &&
            sprite.y + sprite.height <= currentSprite.y + currentSprite.height)
        ) {
          return true;
        }
      }
    }
  };

  const projectileCollision = (sprite) => {
    for (let i = 0; i < allColliders.length; ++i) {
      if (allColliders[i].IsPlayer() || !allColliders[i].IsAlive()) continue;
      const currentSprite = allColliders[i].Sprite;
      let xss = false;
      // going by left || going by right
      if (
        (sprite.x + sprite.width >= currentSprite.x &&
          sprite.x + sprite.width <= currentSprite.x + currentSprite.width) ||
        (sprite.x >= currentSprite.x &&
          sprite.x <= currentSprite.x + currentSprite.width)
      ) {
        xss = true;
      }

      if (xss) {
        // down collision || up collision
        if (
          (sprite.y >= currentSprite.y &&
            sprite.y <= currentSprite.y + currentSprite.height) ||
          (sprite.y + sprite.height >= currentSprite.y &&
            sprite.y + sprite.height <= currentSprite.y + currentSprite.height)
        ) {
          if (!allColliders[i].IsCollider()) {
            setAudioControllerState({ type: "enemyHit" });
            if (allColliders[i].TakeDamage(player.Weapon.Damage))
              app.stage.removeChild(currentSprite);
          } else {
            setAudioControllerState({ type: "wallHit" });
          }
          return true;
        }
      }
    }
  };

  return (
    <div ref={ref}>
      <div className="keys">
        <div className="wContainer">
          <button
            id="up"
            className={w ? "active" : ""}
            onMouseDown={handleDirection}
            onMouseUp={handleRelease}
          >
            W
          </button>
        </div>
        <div className="adContainer">
          <button
            id="left"
            className={a ? "active" : ""}
            onClick={handleDirection}
          >
            A
          </button>
          <button
            id="right"
            className={d ? "active" : ""}
            onClick={handleDirection}
          >
            D
          </button>
        </div>
        <div className="wContainer">
          <button
            id="down"
            className={s ? "active" : ""}
            onClick={handleDirection}
          >
            S
          </button>
        </div>
      </div>
      <div className="arrows">
        <div className="wContainer">
          <button
            id="fup"
            className={`arrow ${up ? "active" : ""}`}
            onClick={handleDirection}
          >
            ↑
          </button>
        </div>
        <div className="adContainer">
          <button
            id="fleft"
            className={`arrow ${left ? "active" : ""}`}
            onClick={handleDirection}
          >
            ←
          </button>
          <button
            id="fright"
            className={`arrow ${right ? "active" : ""}`}
            onClick={handleDirection}
          >
            →
          </button>
        </div>
        <div className="wContainer">
          <button
            id="fdown"
            className={`arrow ${down ? "active" : ""}`}
            onClick={handleDirection}
          >
            ↓
          </button>
        </div>
      </div>
    </div>
  );
};

export default Game;
