/* ////////////////////////  VARIABLE INSTANTIATION  //////////////////////// */
let app,
  canvas,
  clearButton,
  columns,
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
  stepAmount,
  stepButton,
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
        <section id="app-container"></section>
        <p>Generation: <span id="count">NONE</span></p>
        <div id="sketchui"></div>
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
}

function draw() {
  genWrapper.innerText = int(genCount);
  clear();
  noStroke();
  frameRate(60);
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
  frameCount = (frameCount + 1) % floor(60 / tickRate);
}

function mousePressed() {
  if (!running && mouseInCanvas()) {
    let [column, row] = getGridCoordinates();
    grid[column][row].toggleState();
  }
}
