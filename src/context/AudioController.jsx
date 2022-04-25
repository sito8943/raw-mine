import * as React from "react";

const AudioController = React.createContext();

const audioControllerReducer = (audioControllerState, action) => {
  switch (action.type) {
    case "ambient": {
      let newAmbient = 0;
      if (audioControllerState.ambient === 1) newAmbient = 2;
      else newAmbient = 1;
      return {
        ...audioControllerState,
        ambient: newAmbient,
      };
    }
    case "dead": {
      let newDead = 0;
      if (audioControllerState.dead === 1) newDead = 2;
      else newDead = 1;
      return {
        ...audioControllerState,
        dead: newDead,
      };
    }

    case "click": {
      let newClick = 0;
      if (audioControllerState.click === 1) newClick = 2;
      else newClick = 1;
      return {
        ...audioControllerState,
        click: newClick,
      };
    }
    case "damage": {
      let newDamage = 0;
      if (audioControllerState.damage === 1) newDamage = 2;
      else newDamage = 1;
      return {
        ...audioControllerState,
        damage: newDamage,
      };
    }
    case "drill": {
      let newDrill = 0;
      if (audioControllerState.drill === 1) newDrill = 2;
      else newDrill = 1;
      return {
        ...audioControllerState,
        drill: newDrill,
      };
    }
    case "wallHit": {
      let newWallHit = 0;
      if (audioControllerState.shot === 1) newWallHit = 2;
      else newWallHit = 1;
      return {
        ...audioControllerState,
        wallHit: newWallHit,
      };
    }
    case "enemyHit": {
      let newEnemyHit = 0;
      if (audioControllerState.shot === 1) newEnemyHit = 2;
      else newEnemyHit = 1;
      return {
        ...audioControllerState,
        enemyHit: newEnemyHit,
      };
    }
    case "reloading": {
      let newReloading = 0;
      if (audioControllerState.shot === 1) newReloading = 2;
      else newReloading = 1;
      return {
        ...audioControllerState,
        reloading: newReloading,
      };
    }
    case "reloaded": {
      let newReloaded = 0;
      if (audioControllerState.reloaded === 1) newReloaded = 2;
      else newReloaded = 1;
      return {
        ...audioControllerState,
        reloaded: newReloaded,
      };
    }
    case "start":
      let newStart = 0;
      if (audioControllerState.start === 1) newStart = 2;
      else newStart = 1;
      return {
        ...audioControllerState,
        start: newStart,
      };
    case "shot": {
      let newShot = 0;
      if (audioControllerState.shot === 1) newShot = 2;
      else newShot = 1;
      return {
        ...audioControllerState,
        shot: newShot,
      };
    }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const AudioControllerProvider = ({ children }) => {
  const [audioControllerState, setAudioControllerState] = React.useReducer(
    audioControllerReducer,
    {
      drill: false,
      enemyHit: false,
      reloading: false,
      reloaded: false,
      start: false,
      shot: false,
      damage: false,
      dead: false,
      click: false,
    }
  );

  const value = { audioControllerState, setAudioControllerState };
  return (
    <AudioController.Provider value={value}>
      {children}
    </AudioController.Provider>
  );
};

//hooks
const useAudioController = () => {
  const audioController = React.useContext(AudioController);
  if (audioController === undefined)
    throw new Error("useAudioController must be used within a Provider");
  return audioController;
};

export { AudioControllerProvider, useAudioController };
