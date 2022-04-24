import React, { useEffect } from "react";

// context
import { useAudioConfig } from "../../context/AudioConfig";
import { useAudioController } from "../../context/AudioController";

// sfx
import shotAudio from "../../assets/audio/shot1.mp3";
import reloadAudio from "../../assets/audio/reloading.mp3";
import recharged from "../../assets/audio/recharged.mp3";
import wallhit from "../../assets/audio/wallhit.mp3";
import enemyhit from "../../assets/audio/enemyhit.mp3";
import drill2 from "../../assets/audio/drill2.mp3";
import playerDamage from "../../assets/audio/playerdamage.mp3";
import deadPlayer from "../../assets/audio/dead.mp3";

// controllers
const shot = new Audio(shotAudio);
shot.volume = 0.2;
const reload = new Audio(reloadAudio);
const wallHit = new Audio(wallhit);
wallHit.volume = 0.2;
const reloaded = new Audio(recharged);
reloaded.volume = 0.2;
const enemyHit = new Audio(enemyhit);
const drill = new Audio(drill2);
const damage = new Audio(playerDamage);
const dead = new Audio(deadPlayer);
drill.volume = 0.2;
const AudioController = () => {
  const { audioConfigState } = useAudioConfig();
  const { audioControllerState, setAudioControllerState } =
    useAudioController();

  useEffect(() => {
    shot.load();
    reload.load();
    wallHit.load();
    enemyHit.load();
    drill.load();
    damage.load();
    dead.load();
    if (audioConfigState.sfx) {
    }
  }, []);

  useEffect(() => {
    if (audioControllerState.dead !== false) {
      dead.currentTime = 0;
      dead.play();
    }
  }, [audioControllerState.dead]);

  useEffect(() => {
    if (audioControllerState.damage !== false) {
      damage.currentTime = 0;
      damage.play();
    }
  }, [audioControllerState.damage]);

  useEffect(() => {
    if (audioControllerState.drill !== false) {
      drill.currentTime = 0;
      drill.play();
    }
  }, [audioControllerState.drill]);

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

  useEffect(() => {
    if (audioControllerState.enemyHit) {
      enemyHit.currentTime = 0;
      enemyHit.play();
    }
  }, [audioControllerState.enemyHit]);

  useEffect(() => {
    if (audioControllerState.wallHit) {
      wallHit.currentTime = 0;
      wallHit.play();
    }
  }, [audioControllerState.wallHit]);

  return <></>;
};

export default AudioController;
