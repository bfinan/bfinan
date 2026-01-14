"use client";

import React from "react";

export default function UnderConstructionGif() {
  // Randomly select a number between 1 and 8
  const randomNum = Math.floor(Math.random() * 8) + 1;
  const gifPath = `/uncon0${randomNum}.gif`;

  return (
    <img
      src={gifPath}
      alt="Under construction"
      className="inline-block"
    />
  );
}


