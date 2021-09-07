// models/resource.js
const db = require("../db"); //
const getLineLayer = async function () {
  let lines = await (db.line.findAll());
  for (let keyA in lines) {
    lines[keyA].towers = [];
    let towers = [], lineTower = JSON.parse(lines[keyA].tower);
    for (let keyB in lineTower) {
      const tower = await db.tower.findAll({
        where: {
          id: lineTower[keyB]
        }
      })
      towers.push({ longitude: tower[0].longitude, latitude: tower[0].latitude })
    }
    lines[keyA].towers = towers;
  }
  if (lines.towers) {
    return lines;
  }
};
module.exports = {
  getLineLayer
};