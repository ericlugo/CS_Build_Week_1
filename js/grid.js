function initializeGrid() {
  let arr = instantiateEmptyGrid();
  fillEmptyGrid(arr);
  return arr;
}

function instantiateEmptyGrid() {
  let arr = new Array(columns);
  for (let x = 0; x < columns; x++) {
    arr[x] = new Array(rows);
  }
  return arr;
}

function fillEmptyGrid(arr) {
  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows; y++) {
      arr[x][y] = new GridCell(x, y, resolution);
      let val = floor(random(2));
      arr[x][y].setState(Boolean(val));
    }
  }
}

function countNeighbors(x, y) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      sum += grid[(x + i + columns) % columns][(y + j + rows) % rows].state;
    }
  }
  sum -= grid[x][y].state;
  return sum;
}

function updateGrid() {
  let arr = initializeGrid();
  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows; y++) {
      let neighbors = countNeighbors(x, y);
      let state = grid[x][y].getState();
      if (state === false && neighbors === 3) {
        arr[x][y].setState(true);
      } else if (state === true && (neighbors < 2 || neighbors > 3)) {
        arr[x][y].setState(false);
      } else {
        arr[x][y].setState(grid[x][y].getState());
      }
    }
  }
  return arr;
}
