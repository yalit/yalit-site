import React from "react";

export function Image({ src, alt, legend = "" }) {
  return (
    <>
      <img src={src} alt={alt} />
      <p style={{ textAlign: "center", marginTop: "-25px", color: "#777" }}>
        {legend}
      </p>
    </>
  );
}
