import React, { useState } from "react";

// style
import "../../views/Home/style.css";

const CharacterCreation = (props) => {
  const { start } = props;

  const [name, setName] = useState("");

  const handleInputs = (e) => {
    const { id, value } = e.target;
    switch (id) {
      default:
        return setName(value);
    }
  };

  return (
    <div>
      <div className="home-form">
        <h1>Crea tu minero</h1>
        <form onSubmit={start}>
          <div className="creation-form">
            <label htmlFor="name">Introduce tu nombre:</label>
            <input value={name} onChange={handleInputs} id="name" />
          </div>
        </form>
        <button type="submit">Comenzar</button>
      </div>
    </div>
  );
};

export default CharacterCreation;
