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
  resolution = 10;
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
  fpsDisplay = document.querySelector(`#fps-display`);
  resolutionDisplay = document.querySelector(`#resolution-display`);
  resolutionDisplay.innerText = `Cell Resolution: [${resolution}px * ${resolution}px]`;
  tpsDisplay = document.querySelector(`#tps-display`);
  tpsDisplay.innerText = `Target Tick Rate: ${tickRate} tps`;

  playButton = document.querySelector(`#play-pause`);
  stepInput = document.querySelector(`#step-slider`);
  stepInput.value = stepAmount;

  resolutionInput = document.querySelector(`#resolution-slider`);
  resolutionInput.value = resolution;
  tpsInput = document.querySelector(`#tps-slider`);
  tpsInput.value = tickRate;
}

function playSketch() {
  running = true;
  playButton.innerHTML = `<span class='emoji'>&#x23EF</span> Pause Sketch`;
}

function pauseSketch() {
  running = false;
  playButton.innerHTML = `<span class='emoji'>&#x23EF</span> Play Sketch`;
}

function toggleSketch() {
  if (running) {
    pauseSketch();
  } else {
    playSketch();
  }
}

function stepSketch() {
  pauseSketch();
  frameRate(0);
  stepAmount = int(stepInput.value);
  for (let i = 0; i < stepAmount; i++) {
    grid = updateGrid();
  }
  genCount += stepAmount;
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

function updateSketchValues() {
  resolution = resolutionInput.value;
  resolutionDisplay.innerText = `Cell Resolution: [${resolution}px * ${resolution}px]`;
  tickRate = tpsInput.value;
  tpsDisplay.innerText = `Target Tick Rate: ${tickRate} tps`;
  clearSketch();
}
