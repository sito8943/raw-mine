import React, { useState, useEffect } from "react";

import axios from "axios";

import { getAuth } from "../../auth/auth";
import config from "../../config";

// style
import "../../views/Home/style.css";

// texts
import texts from "../../lang/texts.json";

// context
import { useAudioController } from "../../context/AudioController";
import { useSocket } from "../../context/SocketContext";

// character default
import Default from "../../assets/images/character/default.png";

const CharacterCreation = (props) => {
  const { setAudioControllerState } = useAudioController();
  const { socketState } = useSocket();
  const { start, lang } = props;

  const [name, setName] = useState("");
  const [error, setError] = useState(false);

  const validateName = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/validate?name=${name}`
      );
      const data = await response.data;
      if (data) if (data.result === "valid") return true;
      return false;
    } catch (e) {
      console.log(e);
    }
  };

  const handleInputs = (e) => {
    const { id, value } = e.target;
    switch (id) {
      default:
        return setName(value);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    if (await validateName()) {
      setAudioControllerState({ type: "click" });
      start(name);
    }
    setError(true);
  };

  return (
    <div>
      <div className="home-form">
        <h1>{texts[lang].creation.title}</h1>
        <form onSubmit={submit} className="flex-center">
          <img
            className="player-portrait"
            src={
              socketState.state ? `https://robohash.org/${name}.png` : Default
            }
            alt="player-robot"
          />
          <div className="creation-form">
            <label htmlFor="name">{texts[lang].creation.label}</label>
            <input value={name} onChange={handleInputs} id="name" />
            <label style={{ opacity: error ? 1 : 0 }} htmlFor="name">
              {texts[lang].creation.error}
            </label>
          </div>
        </form>
        <button type="submit" onClick={submit}>
          {texts[lang].creation.submit}
        </button>
      </div>
    </div>
  );
};

export default CharacterCreation;
