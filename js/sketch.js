/* ////////////////////////  VARIABLE INSTANTIATION  //////////////////////// */
let app,
  appContent,
  canvas,
  canvasContainer,
  columns,
  generationContainer,
  generationCount,
  grid,
  playButton,
  rate,
  resolution,
  restartButton,
  rows,
  tempGrid;

appContent = `
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
generationCount = 0;
rate = 2;
resolution = 5;
running = false;

/* ////////////////////////  SETUP & LOOP FUNCTIONS  //////////////////////// */
function setup() {
  // add elements to DOM and instantiate canvas
  document.querySelector(`main`).remove();
  app = createDiv(appContent).class(`flex-fix`);
  canvasContainer = document.querySelector(`#app-container`);
  generationContainer = document.querySelector(`#count`);
  canvas = createCanvas(
    canvasContainer.clientWidth,
    canvasContainer.clientHeight,
  ).parent(canvasContainer);
  sketchUIContainer = document.querySelector(`#sketchui`);
  restartButton = createButton(`Restart Sketch`).parent(sketchUIContainer);
  restartButton.mousePressed(resetSketch);
  playButton = createButton(`Play Sketch`).parent(sketchUIContainer);
  playButton.mousePressed(toggleSketch);

  // set grid dimensions, center canvas grid within parent, initialize grid, and start animation
  resetSketch();
  toggleSketch();

  // call theme loader to check local storage and update as needed
  loadTheme();
}

function draw() {
  generationContainer.innerText = int(generationCount);
  clear();
  noStroke();
  frameRate(rate);
  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows; y++) {
      grid[x][y].display();
    }
  }
  if (running) {
    grid = updateGrid();
    generationCount += 1;
  }
}
