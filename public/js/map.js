"use strict";

const map = document.querySelector("#module");

map.addEventListener("mousemove", (e) => {
  map.style.backgroundPositionX = -e.offsetX + "px";
  map.style.backgroundPositionY = -e.offsetY + "px";
});

