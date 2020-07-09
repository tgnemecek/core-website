import React from "react";

export default function Placeholder({ text }) {
  const parentStyle = {
    backgroundColor: "#d1d1d1", // Light-grey
    height: "120px",
    borderRadius: "4px",
    padding: "25px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div style={parentStyle}>
      <div>[{text}]</div>
    </div>
  );
}
