/* ////////////////////////  VARIABLE INSTANTIATION  //////////////////////// */
let app,
  canvas,
  columns,
  currentFPS,
  tpsInput,
  tpsDisplay,
  frameCount,
  genCount,
  genWrapper,
  grid,
  maxSteps,
  minSteps,
  playButton,
  randomButton,
  resolution,
  resolutionButton,
  resolutionDisplay,
  resolutionInput,
  rows,
  stepInput,
  tempGrid,
  tickRate,
  wrapper;

let html = `
  <header class="container">
      <div class="width-container">
        <h1>conway's game of life</h1>
        <label class="switch">
          <input type="checkbox" onchange="toggleTheme()" id="slider" />
          <span class="slider"></span>
        </label>
      </div>
    </header>
    <main>
      <article>
        <div id="sketch-info">
          <p>Generation: <span id="count">NONE</span></p>
          <p id="fps-display">FPS: [framerate]</p>
          <p id="resolution-display">Cell Resolution: [${resolution}px * ${resolution}px]</p>
          <p id="tps-display">Target Tick Rate: ${tickRate} tps</p>
        </div>
        <section id="app-container"></section>
        <div id="sketchui">
          <div id="base-controls">
            <button id="play-pause" onclick="toggleSketch()"><span class='emoji'>&#x23EF</span> Play Sketch</button>
            <label for="stepSlider">Steps:</label>
            <input id="step-slider" type="range" name="stepSlider" min="1" max="50">
            <button id="step-sketch" onclick="stepSketch()"><span class='emoji'>&#x23ED</span> Step Sketch</button>
            <button id="clear-sketch" onclick="clearSketch()">Clear Sketch</button>
          </div>
          <hr />
          <div id="preset-controls">
            <p>Presets:</p>
            <button onclick="resetSketchAsRandomFill()">Random Sketch</button>
            <button onclick="presetBlock()">Block</button>
            <button onclick="presetBeehive()">Beehive</button>
            <button onclick="presetLoaf()">Loaf</button>
            <button onclick="presetBoat()">Boat</button>
            <button onclick="presetTub()">Tub</button>
            <button onclick="presetBlinker()">Blinker</button>
            <button onclick="presetToad()">Toad</button>
            <button onclick="presetBeacon()">Beacon</button>
            <button onclick="presetPulsar()">Pulsar</button>
            <button onclick="presetBoom()">Boom</button>
            <button onclick="presetPentadecathlon()">Pentadecathlon</button>
          </div>
          <hr />
          <div id="advanced-controls">
            <p>Tweaks:</p>
            <label for="resolutionSlider">Resolution:</label>
            <input id="resolution-slider" type="range" name="resolutionSlider" min="1" max="20">
            <label for="tpsSlider">Target Tick Rate:</label>
            <input id="tps-slider" type="range" name="tpsSlider" min="1" max="30">
            <button onclick="updateSketchValues()">Update Sketch Values</button>
          </div>
        </div>
        <hr />
        <p>
          Welcome to John Conway's "Game of Life"! This is a computer science classic from 1970, a
          program that simulates a <em>cellular automaton</em> (plural <em>automata</em>). It has
          connections to all kinds of different aspects of computer science and nature.
        </p>
        <p>
          This "game" was devised using a carefully thought out set of criteria that go as follow:
        <ul>
          <li>There should be no explosive growth.</li>
          <li>There should exist small initial patterns with chaotic, unpredictable outcomes.</li>
          <li>There should be potential for von Neumann universal constructors.</li>
          <li>The rules should be as simple as possible, whilst adhering to the above constraints.</li>
        </ul>
        </p>
        <p>
          The rules can be summed up as follows:
        <ul>
          <li>Any live cell with two or three live neighbors survives to the next generation.</li>
          <li>Any dead cell with three live neighbors becomes a live cell in the next generation.</li>
          <li>All other live cells are dead in the next generation</li>
          <li>All other dead cells remain dead in the next generation</li>
        </ul>
        </p>
      </article>
    </main>
    <footer class="container">
      <div class="width-container">
        <p>
          Sample built with &#128151; by
          <a href="https://ericlugo.dev/">Eric SarragaLugo</a>
        </p>
      </div>
    </footer>
  `;

/* ////////////  SETUP, DRAW LOOP, & AUXILLARY SKETCH FUNCTIONS  //////////// */
function setup() {
  initializeBaseValues();
  initializeUI();
  loadTheme();
  clearSketch();
  frameRate(30);
}

function draw() {
  genWrapper.innerText = int(genCount);
  if (!frameCount % 60) {
    fpsDisplay.innerText = `FPS: ${floor(frameRate())}`;
  }
  clear();
  noStroke();
  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows; y++) {
      grid[x][y].display();
    }
  }
  if (mouseInCanvas) {
    fill(200);
    let [column, row] = getGridCoordinates();
    square(column * resolution, row * resolution, resolution);
  }
  if (running && frameCount === 0) {
    grid = updateGrid();
    genCount += 1;
  }
  frameCount = (frameCount + 1) % floor(30 / tickRate);
}

function mousePressed() {
  if (!running && mouseInCanvas()) {
    let [column, row] = getGridCoordinates();
    grid[column][row].toggleState();
  }
}
