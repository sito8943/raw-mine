import * as React from "react";

const AudioController = React.createContext();

const audioControllerReducer = (audioControllerState, action) => {
  console.log(action);
  switch (action.type) {
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
      if (audioControllerState.shot === 1) newReloaded = 2;
      else newReloaded = 1;
      return {
        ...audioControllerState,
        reloaded: newReloaded,
      };
    }
    case "start":
      return {
        ...audioControllerState,
        start: true,
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
      enemyHit: false,
      reloading: false,
      reloaded: false,
      start: false,
      shot: false,
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
