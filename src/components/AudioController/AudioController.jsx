import React, { useEffect } from "react";

// context
import { useAudioConfig } from "../../context/AudioConfig";
import { useAudioController } from "../../context/AudioController";

// sfx
import shotAudio from "../../assets/audio/shot1.mp3";
import reloadAudio from "../../assets/audio/reloading.mp3";
import recharged from "../../assets/audio/recharged.mp3";

// controllers
const shot = new Audio(shotAudio);
const reload = new Audio(reloadAudio);
const reloaded = new Audio(recharged);

const AudioController = () => {
  const { audioConfigState } = useAudioConfig();
  const { audioControllerState, setAudioControllerState } =
    useAudioController();

  useEffect(() => {
    shot.load();
    if (audioConfigState.sfx) {
    }
  }, []);

  useEffect(() => {
    if (audioControllerState.shot !== false) {
      shot.currentTime = 0;
      shot.play();
    }
  }, [audioControllerState.shot]);

  useEffect(() => {
    if (audioControllerState.reloading) {
      reload.currentTime = 0;
      reload.play();
    }
  }, [audioControllerState.reloading]);

  useEffect(() => {
    if (audioControllerState.reloaded) {
      reloaded.currentTime = 0;
      reloaded.play();
    }
  }, [audioControllerState.reloaded]);

  return <></>;
};

export default AudioController;
