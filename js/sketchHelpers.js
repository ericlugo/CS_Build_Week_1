function playSketch() {
  running = true;
  playButton.html(`&#x23EF Pause Sketch`);
}

function pauseSketch() {
  running = false;
  playButton.html(`&#x23EF Play Sketch`);
}

function toggleSketch() {
  if (running) {
    pauseSketch();
  } else {
    playSketch();
  }
}

function resetSketch() {
  columns = floor(width / resolution);
  rows = floor(height / resolution);
  canvas.position(
    floor(width / (columns * resolution) / 2),
    floor(height / (rows * resolution) / 2),
    `relative`,
  );
  grid = initializeGrid();
  generationCount = 1;
}
