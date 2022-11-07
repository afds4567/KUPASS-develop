import React from "react";

export default function MobileLayout(props) {
  return (
    <div
      style={{
        backgroundColor: "#F5F7FA",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          maxWidth: "1170px",
          margin: "auto",
          height: "100%",
        }}
      >
        <div>{props.children}</div>
      </div>
    </div>
  );
}
