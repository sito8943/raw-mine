import React from "react";

const Welcome = (props) => {
  const { start } = props;

  return (
    <div>
      <div className="home-form">
        <h1>RAW - Mines</h1>
        <button onClick={start}>Comenzar</button>
      </div>
    </div>
  );
};

export default Welcome;
