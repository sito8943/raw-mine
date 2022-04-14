import React from "react";

const Home = (props) => {
  const { onStart } = props;

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "absolute",
        zIndex: 99,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "#222333",
          borderRadius: "15px",
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1 style={{ color: "aliceblue" }}>RAW - Mines</h1>
        <button onClick={onStart}>Comenzar</button>
      </div>
    </div>
  );
};

export default Home;
