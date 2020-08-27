function mouseInCanvas() {
  if (-1 < mouseX && mouseX < width && -1 < mouseY && mouseY < height) {
    return true;
  } else {
    return false;
  }
}

function initializeBaseValues() {
  frameCount = 0;
  genCount = 0;
  maxSteps = 20;
  minSteps = 1;
  resolution = 5;
  running = false;
  stepAmount = 1;
  tickRate = 2;
}

function initializeUI() {
  document.querySelector(`main`).remove();

  app = createDiv(html);
  app.class(`flex-fix`);
  wrapper = document.querySelector(`#app-container`);
  canvas = createCanvas(wrapper.clientWidth, wrapper.clientHeight);
  canvas.parent(wrapper);

  genWrapper = document.querySelector(`#count`);
  sketchUIContainer = document.querySelector(`#sketchui`);

  let baseControls = createDiv();
  baseControls.id('base-controls');
  baseControls.parent(sketchUIContainer);
  playButton = createButton(`<span class='emoji'>&#x23EF</span> Play Sketch`);
  playButton.parent(baseControls);
  playButton.mousePressed(toggleSketch);
  stepDisplay = createP(`Steps to Take:`);
  stepDisplay.parent(baseControls);
  stepInput = createInput(stepAmount, `Number`);
  stepInput.parent(baseControls);
  stepInput.changed(updateStepAmount);
  stepButton = createButton(`<span class='emoji'>&#x23ED</span> Step Sketch`);
  stepButton.parent(baseControls);
  stepButton.mousePressed(stepSketch);
  clearButton = createButton(`Clear Sketch`);
  clearButton.parent(baseControls);
  clearButton.mousePressed(clearSketch);

  let advancedControls = createDiv();
  advancedControls.id('advanced-controls');
  advancedControls.parent(sketchUIContainer);
  // resolutionDisplay = createP(
  //   `Current Cell Resolution: [${resolution}px * ${resolution}px]`,
  // );
  // resolutionDisplay.parent(advancedControls);
  // resolutionInput = createInput(resolution, `Number`);
  // resolutionInput.parent(advancedControls);
  // resolutionInput.changed(updateResolution);
  // resolutionButton = createButton(`Reset Using New Cell Resolution`);
  // resolutionButton.parent(advancedControls);
  // resolutionButton.mousePressed(resetSketchWithNewResolution);
  randomButton = createButton(`Reset as Random Sketch`);
  randomButton.parent(advancedControls);
  randomButton.mousePressed(resetSketchAsRandomFill);
}

function playSketch() {
  running = true;
  playButton.html(`<span class='emoji'>&#x23EF</span> Pause Sketch`);
}

function pauseSketch() {
  running = false;
  playButton.html(`<span class='emoji'>&#x23EF</span> Play Sketch`);
}

function toggleSketch() {
  if (running) {
    pauseSketch();
  } else {
    playSketch();
  }
}

function stepSketch() {
  console.log(stepAmount);
  pauseSketch();
  frameRate(0);
  let steps = stepAmount;
  for (let i = 0; i < steps; i++) {
    grid = updateGrid();
  }
  genCount += steps;
  frameRate(60);
}

function clearSketch() {
  pauseSketch();
  columns = floor(width / resolution);
  rows = floor(height / resolution);
  canvas.position(
    floor(width / (columns * resolution) / 2),
    floor(height / (rows * resolution) / 2),
    `relative`,
  );
  grid = initializeGrid();
  genCount = 1;
}

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
}

// function resetSketchWithNewResolution() {
//   console.log(resolution);
//   resolutionDisplay.value(
//     `Current Cell Resolution: [${resolution}px * ${resolution}px]`,
//   );
//   clearSketch();
// }

function updateStepAmount() {
  if (0 < stepInput.value() && stepInput.value() < 50) {
    stepAmount = int(stepInput.value());
  } else if (stepInput.value() < 1) {
    stepInput.value(1);
    stepAmount = int(stepInput.value());
  } else if (50 < stepInput.value()) {
    stepInput.value(50);
    stepAmount = int(stepInput.value());
  }
}

function updateResolution() {
  if (0 < resolutionInput.value() && resolutionInput.value() < 25) {
    resolution = int(resolutionInput.value());
  } else if (resolutionInput.value() < 1) {
    resolutionInput.value(1);
    resolution = int(resolutionInput.value());
  } else if (25 < resolutionInput.value()) {
    resolutionInput.value(25);
    resolution = int(resolutionInput.value());
  }
}
