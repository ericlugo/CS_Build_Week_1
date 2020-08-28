function resetSketchAsRandomFill() {
  pauseSketch();
  columns = floor(width / resolution);
  rows = floor(height / resolution);
  canvas.position(
    floor(width / (columns * resolution) / 2),
    floor(height / (rows * resolution) / 2),
    `relative`,
  );
  grid = initializeRandomGrid();
  genCount = 1;
  playSketch();
}

function updateValues(res, tr) {
  resolution = res;
  resolutionInput.value = resolution;
  resolutionDisplay.innerText = `Cell Resolution: [${resolution}px * ${resolution}px]`;
  tickRate = tr;
  tpsInput.value = tickRate;
  tpsDisplay.innerText = `Target Tick Rate: ${tickRate} tps`;
  clearSketch();
}

// grid[][].setState(true);

function presetBlock() {
  updateValues(20, 10);
  grid[1][1].setState(true);
  grid[2][1].setState(true);
  grid[1][2].setState(true);
  grid[2][2].setState(true);
}

function presetBeehive() {
  updateValues(20, 10);
  grid[2][1].setState(true);
  grid[3][1].setState(true);
  grid[1][2].setState(true);
  grid[4][2].setState(true);
  grid[2][3].setState(true);
  grid[3][3].setState(true);
}

function presetLoaf() {
  updateValues(20, 10);
  grid[2][1].setState(true);
  grid[3][1].setState(true);
  grid[1][2].setState(true);
  grid[4][2].setState(true);
  grid[2][3].setState(true);
  grid[4][3].setState(true);
  grid[3][4].setState(true);
}

function presetBoat() {
  updateValues(20, 10);
  grid[1][1].setState(true);
  grid[2][1].setState(true);
  grid[1][2].setState(true);
  grid[3][2].setState(true);
  grid[2][3].setState(true);
}

function presetTub() {
  updateValues(20, 10);
  grid[2][1].setState(true);
  grid[1][2].setState(true);
  grid[3][2].setState(true);
  grid[2][3].setState(true);
}

function presetBlinker() {
  updateValues(20, 5);
  grid[2][1].setState(true);
  grid[2][2].setState(true);
  grid[2][3].setState(true);
}

function presetToad() {
  updateValues(20, 5);
  grid[3][1].setState(true);
  grid[1][2].setState(true);
  grid[4][2].setState(true);
  grid[1][3].setState(true);
  grid[4][3].setState(true);
  grid[2][4].setState(true);
}

function presetBeacon() {
  updateValues(20, 5);
  grid[1][1].setState(true);
  grid[2][1].setState(true);
  grid[1][2].setState(true);
  grid[4][3].setState(true);
  grid[3][4].setState(true);
  grid[4][4].setState(true);
}

function presetPulsar() {
  updateValues(20, 5);
  grid[3][1].setState(true);
  grid[4][1].setState(true);
  grid[5][1].setState(true);
  grid[9][1].setState(true);
  grid[10][1].setState(true);
  grid[11][1].setState(true);
  grid[1][3].setState(true);
  grid[6][3].setState(true);
  grid[8][3].setState(true);
  grid[13][3].setState(true);
  grid[1][4].setState(true);
  grid[6][4].setState(true);
  grid[8][4].setState(true);
  grid[13][4].setState(true);
  grid[1][5].setState(true);
  grid[6][5].setState(true);
  grid[8][5].setState(true);
  grid[13][5].setState(true);
  grid[3][6].setState(true);
  grid[4][6].setState(true);
  grid[5][6].setState(true);
  grid[9][6].setState(true);
  grid[10][6].setState(true);
  grid[11][6].setState(true);
  grid[3][8].setState(true);
  grid[4][8].setState(true);
  grid[5][8].setState(true);
  grid[9][8].setState(true);
  grid[10][8].setState(true);
  grid[11][8].setState(true);
  grid[1][9].setState(true);
  grid[6][9].setState(true);
  grid[8][9].setState(true);
  grid[13][9].setState(true);
  grid[1][10].setState(true);
  grid[6][10].setState(true);
  grid[8][10].setState(true);
  grid[13][10].setState(true);
  grid[1][11].setState(true);
  grid[6][11].setState(true);
  grid[8][11].setState(true);
  grid[13][11].setState(true);
  grid[3][13].setState(true);
  grid[4][13].setState(true);
  grid[5][13].setState(true);
  grid[9][13].setState(true);
  grid[10][13].setState(true);
  grid[11][13].setState(true);
}

function presetBoom() {
  updateValues(20, 5);
  grid[5][4].setState(true);
  grid[4][5].setState(true);
  grid[5][5].setState(true);
  grid[6][5].setState(true);
}

function presetPentadecathlon() {
  updateValues(20, 5);
  grid[5][1].setState(true);
  grid[5][2].setState(true);
  grid[4][3].setState(true);
  grid[5][3].setState(true);
  grid[6][3].setState(true);

  grid[4][6].setState(true);
  grid[5][6].setState(true);
  grid[6][6].setState(true);
  grid[5][7].setState(true);
  grid[5][8].setState(true);

  grid[5][9].setState(true);
  grid[5][10].setState(true);
  grid[4][11].setState(true);
  grid[5][11].setState(true);
  grid[6][11].setState(true);

  grid[4][14].setState(true);
  grid[5][14].setState(true);
  grid[6][14].setState(true);
  grid[5][15].setState(true);
  grid[5][16].setState(true);
}

function presetGlider() {
  updateValues(20, 10);
}

function presetLWSS() {
  updateValues(20, 10);
}

function presetMWSS() {
  updateValues(20, 10);
}

function presetHWSS() {
  updateValues(20, 10);
}

function presetGGG() {
  updateValues(20, 10);
}
