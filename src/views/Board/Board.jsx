import { useState, useEffect } from "react";

import useOnclickOutside from "react-cool-onclickoutside";

import dungeoneer from "dungeoneer";

// models
import Player from "../../models/player";
import Weapon, { WeaponsEnum } from "../../models/weapon";
import Drill, { DrillsEnum } from "../../models/drill";
import Bag, { BagsEnum } from "../../models/bag";

// style
import "./style.css";

// images
// minerals
import stone from "../../assets/images/ores/stone.png";
import coal from "../../assets/images/ores/coal.png";
import tin from "../../assets/images/ores/tin.png";
import copper from "../../assets/images/ores/copper.png";
import iron from "../../assets/images/ores/iron.png";
import tigereye from "../../assets/images/ores/tigereye.png";
import malachite from "../../assets/images/ores/malachite.png";
import amethyst from "../../assets/images/ores/amethyst.png";
import gold from "../../assets/images/ores/gold.png";
import quartz from "../../assets/images/ores/quartz.png";
import redjasper from "../../assets/images/ores/redjasper.png";
import calcite from "../../assets/images/ores/calcite.png";
import aventurine from "../../assets/images/ores/aventurine.png";
import obsidian from "../../assets/images/ores/obsidian.png";
import ruby from "../../assets/images/ores/ruby.png";
import sapphire from "../../assets/images/ores/sapphire.png";
import chalcedony from "../../assets/images/ores/chalcedony.png";
import diamond from "../../assets/images/ores/diamond.png";
import emerald from "../../assets/images/ores/emerald.png";
// enemies
import slime1 from "../../assets/images/enemies/slime1.png";
import slime2 from "../../assets/images/enemies/slime2.png";
import slime3 from "../../assets/images/enemies/slime3.png";
import slime4 from "../../assets/images/enemies/slime4.png";

// character default
import Default from "../../assets/images/character/default.png";

// utils
import { CreateEnemy, CreateMineral } from "../../utils/create";

// context
import { useAudioController } from "../../context/AudioController";
import { useAudioConfig } from "../../context/AudioConfig";
import { useSocket } from "../../context/SocketContext";

// layouts
import GameOver from "../../layouts/GameOver/GameOver";

// all images
// minerals
const mineralImages = [
  stone,
  coal,
  tin,
  copper,
  iron,
  tigereye,
  malachite,
  amethyst,
  gold,
  quartz,
  redjasper,
  calcite,
  aventurine,
  obsidian,
  ruby,
  sapphire,
  chalcedony,
  diamond,
  emerald,
];

// enemies
const enemyImages = [slime1, slime2, slime3, slime4];

const Board = () => {
  const refClick = useOnclickOutside(() => {
    setShowBag(false);
  });

  const [playerExist, setPlayerExist] = useState(false);
  const [playerName, setPlayerName] = useState("");

  const fPlayerExist = () => {
    setPlayerSprite(`https://robohash.org/${playerName}.png`);
    setPlayerExist(true);
  };

  const { socketState } = useSocket();

  useEffect(() => {
    if (socketState.socket) {
      socketState.socket.on("exist", fPlayerExist);
      const user = localStorage.getItem("player");
      if (user !== null) {
        setPlayerName(user);

        socketState.socket.emit("load", {
          player: user,
        });
      }
    }
  }, [socketState.socket]);

  const { useConfigState, setAudioConfigState } = useAudioConfig();
  const { setAudioControllerState } = useAudioController();

  // world data
  const [field, setField] = useState([]);
  const [minerals, setMinerals] = useState([]);
  const [enemies, setEnemies] = useState([]);

  const rows = () => {
    const final = [];
    for (let i = 0; i < window.innerHeight / 30; i += 1) final.push(i);
    return final;
  };

  const columns = () => {
    const final = [];
    for (let i = 0; i < window.innerWidth / 30; i += 1) final.push(i);
    return final;
  };

  // player data
  const [showBag, setShowBag] = useState(false);
  const [dead, setDead] = useState(false);
  const [player, setPlayer] = useState(null);
  const [x, setX] = useState(1);
  const [y, setY] = useState(1);

  useEffect(() => {
    onEnemyPosition();
  }, [x, y]);

  const onEnemyPosition = () => {
    if (thereIsAEnemy(y, x)) {
      playSound("damage");
      const enemy = getEnemy(y, x);
      if (player.TakeDamage(enemy.damage)) {
        playSound("dead");
        setDead(true);
      }
    }
  };

  const [w, setW] = useState(false);

  useEffect(() => {
    if (w && !dead) {
      if (y > 0 && field[y - 1][x] !== "wall") {
        setY(y - 1);
      }
    }
  }, [w]);

  const [d, setD] = useState(false);

  useEffect(() => {
    if (d && !dead) {
      if (x < field[0].length && field[y][x + 1] !== "wall") {
        setX(x + 1);
      }
    }
  }, [d]);

  const [s, setS] = useState(false);

  useEffect(() => {
    if (s && !dead) {
      if (y < field.length && field[y + 1][x] !== "wall") {
        setY(y + 1);
      }
    }
  }, [s]);

  const [a, setA] = useState(false);

  useEffect(() => {
    if (a && !dead) {
      if (x > 0 && field[y][x - 1] !== "wall") {
        setX(x - 1);
      }
    }
  }, [a]);

  const handleMove = (e) => {
    if (!dead) {
      const { id } = e.target;
      switch (id) {
        case "bW":
          return setW(true);
        case "bD":
          return setD(true);
        case "bS":
          return setS(true);
        default: // a
          return setA(true);
      }
    }
  };

  const handleRelease = (e) => {
    const { id } = e.target;
    switch (id) {
      case "bW":
        return setW(false);
      case "bD":
        return setD(false);
      case "bS":
        return setS(false);
      default: // a
        return setA(false);
    }
  };

  const playSound = (sound) => {
    setAudioControllerState({ type: sound });
  };

  const [playerSprite, setPlayerSprite] = useState("");

  const keyPress = (e) => {
    if (!dead) {
      const { code } = e;
      switch (code) {
        case "KeyW":
          return setW(true);
        case "KeyD":
          return setD(true);
        case "KeyS":
          return setS(true);
        case "KeyA":
          return setA(true);
        default:
          break;
      }
    }
  };

  const keyRelease = (e) => {
    const { code } = e;
    switch (code) {
      case "KeyW":
        return setW(false);
      case "KeyD":
        return setD(false);
      case "KeyS":
        return setS(false);
      case "KeyA":
        return setA(false);

      default: // drill
        break;
    }
  };

  useEffect(() => {
    document.body.onkeydown = keyPress;
    document.body.onkeyup = keyRelease;
    // init
    setPlayer(
      new Player({
        name: "Sito",
        life: { max: 15, current: 15 },
        weapon: new Weapon(WeaponsEnum[0]),
        drill: new Drill(DrillsEnum[0]),
        bag: new Bag(BagsEnum[0]),
      })
    );
    const logicMatrix = [];
    const logicEnemies = [];
    const logicMinerals = [];
    for (let i = 0; i < window.innerHeight / 30; i += 1) {
      const row = [];
      for (let j = 0; j < window.innerWidth / 30; j += 1) row.push("");
      logicMatrix.push(row);
    }

    const seed = new Date().getTime();
    // dungeon
    const dungeon = dungeoneer.build({
      width: window.innerWidth / 30,
      height: window.innerHeight / 30,
      seed,
    });

    dungeon.tiles.forEach((item) => {
      item.forEach((jtem) => {
        if (jtem.type === "wall" || jtem.type === "door") {
          console.log(jtem.y, jtem.x);
          logicMatrix[jtem.y][jtem.x] = "grass";
          const mineral = CreateMineral(jtem.x, jtem.y);
          const enemy = CreateEnemy(jtem.x, jtem.y);
          if (mineral !== null) logicMinerals.push(mineral);
          if (enemy !== null) logicEnemies.push(enemy);
        } else {
          logicMatrix[jtem.y][jtem.x] = "wall";
        }
      });
    });

    setEnemies(logicEnemies);
    setMinerals(logicMinerals);
    setField(logicMatrix);
    setPlayerSprite(Default);
    playSound("start");
  }, []);

  const thereIsAMineral = (y, x) => {
    for (let i = 0; i < minerals.length; i += 1)
      if (minerals[i].x === x && minerals[i].y === y) {
        return true;
      }
    return false;
  };

  const thereIsAEnemy = (y, x) => {
    for (let i = 0; i < enemies.length; i += 1)
      if (enemies[i].x === x && enemies[i].y === y) {
        return true;
      }
    return false;
  };

  const getMineral = (y, x) => {
    for (let i = 0; i < minerals.length; i += 1)
      if (minerals[i].x === x && minerals[i].y === y) {
        return minerals[i];
      }
    return -1;
  };

  const getEnemy = (y, x) => {
    for (let i = 0; i < enemies.length; i += 1)
      if (enemies[i].x === x && enemies[i].y === y) {
        return enemies[i];
      }
    return -1;
  };

  const executeDrill = () => {
    if (!dead) {
      if (thereIsAMineral(y, x)) {
        playSound("drill");
        const mineral = getMineral(y, x);
        if (mineral.TakeDamage(player.Drill.Damage)) {
          mineral.x = -1;
          mineral.y = -1;
          player.Bag.AddMineral(mineral);
        }
      }
    }
  };

  return (
    <div className="board">
      <div
        style={{
          position: "absolute",
        }}
        className={!showBag ? "arrow" : "bag"}
        ref={refClick}
      >
        <button
          style={{ display: showBag ? "none" : "initial" }}
          onClick={(e) => {
            e.target.blur();
            setShowBag(!showBag);
          }}
        >
          💼
        </button>
        <div
          style={{
            opacity: showBag ? 1 : 0,
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div>
            {player &&
              Object.values(player.Bag.Objects).map((item, i) => (
                <div key={i}>
                  {item.count} x {item.name}
                </div>
              ))}
          </div>
        </div>
      </div>
      <div
        className="bag"
        style={{
          position: "absolute",
          right: "10px",
          opacity: 1,
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {player && (
            <span>
              {player.Life.current} / {player.Life.max}
            </span>
          )}

          <span style={{ marginLeft: "5px", marginBottom: "5px" }}>🤖</span>
        </div>
      </div>
      <div className="move-keys">
        <div>
          <button
            className={w && "active"}
            id="bW"
            onMouseDown={handleMove}
            onMouseUp={handleRelease}
          >
            W
          </button>
        </div>
        <div>
          <button
            className={a && "active"}
            id="bA"
            onMouseDown={handleMove}
            onMouseUp={handleRelease}
          >
            A
          </button>
          <button
            className={d && "active"}
            id="bD"
            onMouseDown={handleMove}
            onMouseUp={handleRelease}
          >
            D
          </button>
        </div>
        <div>
          <button
            className={s && "active"}
            id="bS"
            onMouseDown={handleMove}
            onMouseUp={handleRelease}
          >
            S
          </button>
        </div>
      </div>
      <div className="drill">
        <button onMouseDown={executeDrill}>🔨</button>
      </div>
      {dead && <GameOver />}
      {field.length &&
        rows().map((item, i) => {
          return (
            <div key={`row${i}`} className="row">
              {columns().map((jtem, j) => {
                return (
                  <div key={`cell${i}${j}`} className={`cell ${field[i][j]}`}>
                    <span>
                      {i === y && j === x && (
                        <img
                          className="player"
                          src={playerSprite}
                          alt="player-sprite"
                        />
                      )}
                    </span>
                    {thereIsAMineral(i, j) && (
                      <img
                        className="mineral"
                        src={mineralImages[getMineral(i, j).type]}
                        alt="mineral"
                      />
                    )}
                    {thereIsAEnemy(i, j) && (
                      <img
                        className="mineral"
                        src={enemyImages[getEnemy(i, j).type]}
                        alt="mineral"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
    </div>
  );
};

export default Board;
